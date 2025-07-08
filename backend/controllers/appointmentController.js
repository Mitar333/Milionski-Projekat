const Appointment = require('../models/appointmentSchema');
const User = require('../models/userSchema');
const Service = require('../models/serviceSchema');
const Employee = require('../models/employeeSchema');
const Salon = require('../models/salonSchema');
const mongoose = require('mongoose');
const { catchAsync, AppError } = require('./../utils/errorHandler');
const date_fns=require('date-fns');

exports.createAppointment = catchAsync(async (req, res, next) => {
   const { salonId, userId, employeeId,serviceId, startTime, endTime, status,notes,isReminderSent } = req.body;

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

    const newAppointment = new Appointment({
        salonId,
        userId,
        employeeId,
        serviceId,
        startTime,
        endTime,
        status,
        notes,
        isReminderSent
    });

    const appointment = await newAppointment.save();

    res.status(201).json(appointment);


})



// ...
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
// exports.getAvailableTimes = catchAsync(async (req, res, next) => {
// //nadji salon
// const { id } = req.params;
// const salon=await Salon.findById(id)
// //nadji radnika
// const employeeId=req.body.employeeId
// const employee= await Employee.findById(employeeId)
// //nadji datum
// const datum=req.body.datum
// //nadji radno vrijeme
// const radnoVrijeme=salon.workingHours
// const radnikRV=employee.schedule
// const godisnji=employee.vacationDates
// //nadji zauzete termine
// //const zauzetiTermini=await Appointment.find(salonId,employeeId,status= 'confirmed'|| 'pending')
// const occupiedAppointments = await Appointment.find({ salonId, employeeId, status: { $in: ['confirmed', 'pending'] },
// // status je niz u $in // Dodaj logiku za trazeni datum. Npr., termini ciji je endTime posle pocetka trazenog dana 
// // // i ciji je startTime pre kraja trazenog dana. // startDateOfDay: new Date('2025-07-08T00:00:00.000Z') 
// // // endDateOfDay: new Date('2025-07-08T23:59:59.999Z') // startTime: { $lt: endDateOfDay }, 
// // // endTime: { $gt: startDateOfDay } });
// //provjeri godisnji
// //posalji nazad one sto su ostali
// })//implementiracu poslije






//(salonId,userId,employeeId,serviceId,startTime,endTime,status,notes,isReminderSent)


// getAvailableTimes api/salons/:salonId/appointments/available

// createAppointment api/appointments

// getSalonAppointments  api/salons/:salonId/appointments?status=&date=

// getEmployeeAppointments api/employees/:employeeId/appointments?status=&date=

// getUserAppointments api/users/:userId/appointments?status=&date=

// updateAppointmentStatus api/appointments/:id/status

// cancelAppointment api/appointments/:id/cancel