const Appointment = require('../models/appointmentSchema');
const User = require('../models/userSchema');
const Service = require('../models/serviceSchema');
const Employee = require('../models/employeeSchema');
const Salon = require('../models/salonSchema');
const mongoose = require('mongoose');
const { catchAsync, AppError } = require('./../utils/errorHandler');
const {
    startOfDay, endOfDay, // Za pocetak i kraj dana
    addMinutes, addHours, // Za dodavanje vremena
    isWithinInterval,     // Za provjeru preklapanja intervala
    isSameDay, isBefore, isAfter, // Za poredenje datuma
    format, parseISO, // Za formatiranje i parsiranje datuma
    nextFriday,isEqual
} = require('date-fns');
const regex=/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
const regex2=/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/
const convertAppointmentHoursToDate=(str,date,next)=>{
    if(!str){return next(new AppError("obavezno upisati vrijeme",400))}
    if(!regex.test(str)){return next(new AppError("Nepravilan format vremena",400))}
    if(!date){return next(new AppError("obavezno upisati datum",400))}
    if(!regex2.test(date)){return next(new AppError("Nepravilan format datuma",400))}
    let [hour,min]=str.split(":").map(Number)
    let[y,m,d]=date.split("-").map(Number)
    m=m-1
    return new Date(Date.UTC(y,m,d,hour,min,0,0))
}

exports.createAppointment = catchAsync(async (req, res, next) => {
   const { salonId, userId, employeeId,serviceId, startTime, endTime, status,notes,date } = req.body;

    if (!mongoose.Types.ObjectId.isValid(salonId)||!mongoose.Types.ObjectId.isValid(userId)||!mongoose.Types.ObjectId.isValid(employeeId)||!mongoose.Types.ObjectId.isValid(serviceId)) {
        return next(new AppError('Invalidan ID', 400));
    }
    //
    if(!Salon.findById(salonId)||!User.findById(userId)||!Employee.findById(employeeId)||!Service.findById(serviceId))
    {
      return next(new AppError('nepostojeci ID', 400));  
    }

    if(startTime >= endTime || new Date(startTime)>=new Date(endTime)){
        return next(new AppError('Nepravilno upisano vrijeme termin/prvo zavrsi pa pocne', 400));
    }
    const conflictingAppointment = await Appointment.findOne({
        employeeId: employeeId,
        $or: [
            // Postojeći termin počinje unutar novog termina
            { startTime: { $lt: new Date(endTime) }, endTime: { $gt: new Date(startTime) } }
        ]
    });

    if (conflictingAppointment) {
        return next(new AppError('Odabrani termin se preklapa sa postojećim terminom za ovog zaposlenog.', 400));
    }
    let end=convertAppointmentHoursToDate(endTime,date,next)
    let start=convertAppointmentHoursToDate(endTime,date,next)
    const newAppointment = new Appointment({
        salonId,
        userId,
        employeeId,
        serviceId,
        startTime:start,
        endTime:end,
        status,
        notes,
        isReminderSent:false
    });

    const appointment = await newAppointment.save();

    res.status(201).json(appointment);


})

exports.getSalonAppointments = catchAsync(async (req, res, next) => {
    const { salonId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(salonId)) {
        return next(new AppError('Invalidan ID salona.', 400));
    }

    const appointments = await Appointment.find({ salonId })
        .populate('userId', 'name email')       // Popuni podatke o korisniku
        .populate('employeeId', 'name email')   // Popuni podatke o zaposlenom
        .populate('serviceId', 'name durationMinutes price'); // Popuni podatke o usluzi (ako je serviceId u Appointment shemi)

    if (appointments.length === 0) {
        // Ponovo razmisli o 200 OK sa [] umjesto 404 ako je salon validan ali nema termina.
        return next(new AppError('Nema pronađenih termina za ovaj salon.', 404));
    }

    res.status(200).json(appointments);
});

exports.getUserAppointments = catchAsync(async (req, res, next) => {
    const { userId } = req.params;
    // const { salonId } = req.query; // Mozda da client salje i salonId kao query parametar

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return next(new AppError('Invalidan ID korisnika.', 400));
    }

    let query = { userId };
    // if (salonId && mongoose.Types.ObjectId.isValid(salonId)) {
    //     query.salonId = salonId;
    // } else if (salonId) { // If salonId is provided but invalid
    //     return next(new AppError('Invalidan ID salona u upitu.', 400));
    // }

    const appointments = await Appointment.find(query)
        .populate('salonId', 'name address')      // Popuni podatke o salonu
        .populate('employeeId', 'name')           // Popuni podatke o zaposlenom
        .populate('serviceId', 'name');           // Popuni podatke o usluzi

    if (appointments.length === 0) {
        return next(new AppError('Nema pronađenih termina za ovog korisnika.', 404));
    }

    res.status(200).json(appointments);
});

exports.getEmployeeAppointments = catchAsync(async (req, res, next) => {
    const { employeeId } = req.params;
    // const { salonId } = req.query; // Mozda da owner salje i salonId kao query parametar

    if (!mongoose.Types.ObjectId.isValid(employeeId)) {
        return next(new AppError('Invalidan ID radnika.', 400));
    }

    let query = { employeeId };
    // if (salonId && mongoose.Types.ObjectId.isValid(salonId)) {
    //     query.salonId = salonId;
    // } else if (salonId) {
    //     return next(new AppError('Invalidan ID salona u upitu.', 400));
    // }

    const appointments = await Appointment.find(query)
        .populate('salonId', 'name address')
        .populate('userId', 'name phone')
        .populate('serviceId', 'name');

    if (appointments.length === 0) {
        return next(new AppError('Nema pronađenih termina za ovog radnika.', 404));
    }

    res.status(200).json(appointments);
});



exports.updateAppointmentStatus = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body; // Destrukturiraj status direktno

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new AppError('Invalidan ID termina.', 400));
    }

    // Dodatna validacija za status: Provjeriti da li je noviStatus validna vrijednost iz enum-a.
    // Ako imaš enum u shemi, runValidators: true će to provjeriti, ali explicitna provjera je dobra.
    // const validStatuses = ['pending', 'booked', 'cancelled', 'completed']; // Primjer
    // if (!validStatuses.includes(status)) {
    //     return next(new AppError('Neispravan status termina.', 400));
    // }

    const updatedAppointment = await Appointment.findByIdAndUpdate(id, { status }, { new: true, runValidators: true }); // Ažuriraj samo status

    if (!updatedAppointment) {
        return next(new AppError('Termin nije pronađen.', 404));
    }

    res.status(200).json(updatedAppointment);
});

exports.updateAppointment = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new AppError('Invalidan ID termina.', 400));
    }

    // Provjeri da li korisnik pokušava promijeniti kritične ID-eve
    if (updateData.salonId || updateData.userId || updateData.employeeId || updateData.serviceId) {
        return next(new AppError('Nije dozvoljeno mijenjati povezane ID-eve (salon, korisnik, radnik, usluga) preko ove operacije.', 400));
    }

    // Ako se ažuriraju startTime ili endTime, potrebno je ponovo provjeriti preklapanje!
    if (updateData.startTime || updateData.endTime) {
        // Ovdje bi trebalo ponoviti logiku provjere preklapanja,
        // s tim da se mora isključiti trenutni termin iz provjere.
        // Npr: const conflictingAppointment = await Appointment.findOne({ employeeId: updatedAppointment.employeeId, _id: { $ne: id }, ... })
        return next(new AppError('Za ažuriranje vremena termina koristite specifičnu rutu ili dodajte logiku provjere preklapanja.', 400)); // Ili implementirajte logiku
    }
    if((updateData.startTime||updateData.endTime)&&!updateData.date){
        delete updateData.startTime
        delete updateData.endTime
    }
    if(updateData.startTime){updateData.startTime=convertAppointmentHoursToDate(updateData.startTime,updateData.date,next)}
    if(updateData.endTime){updateData.endTime=convertAppointmentHoursToDate(updateData.endTime,updateData.date,next)}
// if(updateData.workingHours){updateData.workingHours=convertWorkingHoursToDate(workingHours,next)}//u bazu ne idu stringovi ali sa frontenda dolaze
    const updatedAppointment = await Appointment.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

    if (!updatedAppointment) {
        return next(new AppError('Termin nije pronađen.', 404));
    }

    res.status(200).json(updatedAppointment);
});


exports.cancelAppointment = catchAsync(async (req, res, next) => {//nema potrebe ako postoji updateAppointmentStatus
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new AppError('Invalidan ID termina.', 400));
    }

    const cancelledAppointment = await Appointment.findByIdAndUpdate(
        id,
        { status: 'cancelled' }, // Ažuriraj status na 'cancelled'
        { new: true, runValidators: true }
    );

    if (!cancelledAppointment) {
        return next(new AppError('Termin nije pronađen.', 404));
    }

    res.status(200).json(cancelledAppointment); // Ili 204 No Content
});


exports.getAvailableTimes = catchAsync(async (req, res, next) => {
 let {date}=req.body //yyyy/mm/dd
 let {salonId,employeeId,serviceId}=req.params
let fDate=convertAppointmentHoursToDate("00:00",date,next)
let pocetakDana=startOfDay(fDate)
let krajDana=endOfDay(fDate)
 //provjeriti req.params
     if (!mongoose.Types.ObjectId.isValid(salonId)) {
        return next(new AppError('Invalidan ID salona.', 400));
    }
    if (!mongoose.Types.ObjectId.isValid(employeeId)) {
        return next(new AppError('Invalidan ID radnika.', 400));
    }
    if (!mongoose.Types.ObjectId.isValid(serviceId)) {
        return next(new AppError('Invalidan ID usluge.', 400));
    }
    let salon=await Salon.findById(salonId)
    let employee=await Employee.findById(employeeId)
    let service=await Service.findById(serviceId)
    if(!salon){
        return next(new AppError('Nije moguce pronaci salon u db', 400));
    }
    if(!employee){
        return next(new AppError('Nije moguce pronaci radnika u db', 400));
    }
    if(!service){
        return next(new AppError('Nije moguce pronaci uslugu u db', 400));
    }
 
    
 //uzeti sve apointmentove tog datum tog salona i radnika

    let appointments=await Appointment.find({
        salonId:salonId,
        employeeId:employeeId,
        startTime:{$gt:pocetakDana,$lt:krajDana}
    })
  
 //vratiti ostatak scheadule-a razbijenog na trajanje usluge
let trajanje=service.durationMinutes
let scheadule=employee.schedule.find((sch)=>{return isSameDay(sch.startTime,fDate)})
if(!scheadule){
    return next(AppError("Upisani datum pada na dan kada radnik ne radi",400))
}
let pocetak=scheadule.startTime
let kraj=scheadule.endTime
let tabelaMogucihTermina=[]

let pocetak2=pocetak
while(isBefore(pocetak2,kraj)){
    let kraj2=addMinutes(pocetak2,trajanje)
    if(isBefore(kraj2,kraj)||isEqual(kraj2,kraj)){
        tabelaMogucihTermina.push({
            startTime:pocetak2,
            endTime:kraj2
})
    } 
pocetak2=kraj2
}


let slobodniTermini=tabelaMogucihTermina.filter((termin)=>{
    let daLiJeSlobodan=appointments.some((app)=>{
        return (isBefore(termin.startTime,app.endTime)&&isAfter(termin.endTime,app.startTime))
    })

    return !daLiJeSlobodan
})

//tabelaMogucihTermina
res.status(200).json(slobodniTermini);
});

    



