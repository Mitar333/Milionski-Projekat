const Employee = require('../models/employeeSchema');
const Salon = require('../models/salonSchema');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { catchAsync, AppError } = require('../utils/errorHandler'); // Destrukturiraj direktno

exports.getEmployeesBySalon = catchAsync(async (req, res, next) => {
    const { salonId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(salonId)) {
        return next(new AppError('Invalidan ID salona.', 400));
    }

    const employees = await Employee.find({ salonId }).select('-password');

    if (employees.length === 0) {
        return next(new AppError('Nema pronađenih zaposlenih za ovaj salon.', 404));
    }

    res.status(200).json(employees);
});

exports.addEmployee = catchAsync(async (req, res, next) => {
    const { salonId, name, bio, phone, email, password, /*schedule, neka se radni dani dodaju samo funkcijom za to*/ servicesOffered } = req.body;

    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
        return next(new AppError('Zaposleni sa ovim emailom već postoji.', 400));
    }

    if (password.length < 6) {
        return next(new AppError('Lozinka mora imati najmanje 6 karaktera.', 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);


    const newEmployee = new Employee({
        salonId,
        name,
        bio,
        phone,
        email,
        password: hashedPassword,
        schedule,
        servicesOffered
    });

    const employee = await newEmployee.save();

    const employeeResponse = employee.toObject();
    delete employeeResponse.password;

    res.status(201).json(employeeResponse);
});

exports.updateEmployee = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const updateData = { ...req.body }; // Kreiraj kopiju da ne mijenjaš direktno req.body
    delete updateData.schedule //radni dani radnika se dodaju funkcijom za to
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new AppError('Invalidan ID zaposlenog.', 400));
    }

    if (updateData.password) {
        if (updateData.password.length < 6) {
            return next(new AppError('Lozinka mora imati najmanje 6 karaktera.', 400));
        }
        updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    if (updateData.salonId) {
        return next(new AppError('Nije dozvoljeno mijenjati ID salona zaposlenog preko ove operacije.', 400));
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).select('-password');

    if (!updatedEmployee) {
        return next(new AppError('Zaposleni nije pronađen.', 404));
    }

    res.status(200).json(updatedEmployee);
});

exports.deleteEmployee = catchAsync(async (req, res, next) => {
    const employeeId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(employeeId)) {
        return next(new AppError('Invalidan ID zaposlenog.', 400));
    }

    const employee = await Employee.findByIdAndDelete(employeeId);
    if (!employee) {
        return next(new AppError('Zaposleni nije pronađen.', 404));
    }

    res.status(204).json(null);
});

exports.addEmployeeSchedule = catchAsync(async (req, res, next) => { 
    const { id } = req.params;
    const { workingDay } = req.body;//format yyyy/mm/dd

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new AppError('Invalidan ID zaposlenog.', 400));
    }

    if (!workingDay) {
        return next(new AppError('Datum kada radnik radi je obavezan.', 400));
    }
    const employee=await Employee.findById(id)
    if(!employee){return next(new AppError("neispravan ID zaposlenog",400))}

    let newWorkingDay=convertIntoDate(workingDay,next)
    let danUSedmici=newWorkingDay.getDay()

    let salonId=employee.salonId
    let salon=await Salon.findById(salonId)
    if(!salon){return next(new AppError("neispravan ID salona, nebi trebalo se desiti",400))}
    const daniUSedmici=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"]
    const dan=daniUSedmici[danUSedmici]
    let salonWorkingHours=salon.workingHours[dan]
    if(!salonWorkingHours){return new AppError(`salon nema definisano radno vrijeme tog dana (mozda dodati automatsko ispravljanje)${dan}`,400)}
    if(!salonWorkingHours.isOpen){
        return next(new AppError("Salon je zatvoren tog dana",400))
    }
    let otvara_se=salonWorkingHours.start
    let zatvara_se=salonWorkingHours.end
    let otvaraH=otvara_se.getUTCHours()
    let otvaraM=otvara_se.getUTCMinutes()
    let zatvaraH=zatvara_se.getUTCHours()
    let zatvaraM=zatvara_se.getUTCMinutes()
    let start=new Date(newWorkingDay)
    start.setUTCHours(otvaraH,otvaraM,0,0)
    let end=new Date(newWorkingDay)
    end.setUTCHours(zatvaraH,zatvaraM,0,0)

    let newWorkingDayy={
        startTime:start,
        endTime:end,
        isWorking:true,
        dayOfWeek:danUSedmici
    }



    const updatedEmployee = await Employee.findByIdAndUpdate(
        id,
        { $addToSet: { schedule: newWorkingDayy } },
        { new: true, runValidators: true }
    ).select('-password');

    if (!updatedEmployee) {
        return next(new AppError('Zaposleni nije pronađen.', 404));
    }

    res.status(200).json({
        message: 'Datum kada radnik radi uspješno dodan.',
        schedule: updatedEmployee.schedule
    });
});

const regex2=/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/
const convertIntoDate=(date,next)=>{
    if(!regex2.test(date)){return next(AppError("Nepravilan format datuma",400))}
    let[y,m,d]=date.split("-").map(Number)
    m=m-1
    return new Date(Date.UTC(y,m,d,0,0,0,1))//neka 1ms cisto da sam siguran da je novi dan
}



exports.editEmployeeSchedule = catchAsync(async (req, res, next) => {
const { id,scheduleId } = req.params;
const {updateData}=req.body
if(!mongoose.Types.ObjectId.isValid(id)||!mongoose.Types.ObjectId.isValid(scheduleId)){
    return next(new AppError("Nepravilan Id",400))
}
const employee=await Employee.findById(id)
if(!employee){return next(new AppError("nevazeci Id zaposlenog",400))}
const schedule=employee.schedule.find(sch=>{
    return sch._id.toString()===scheduleId
})
if(!schedule){
    return next(new AppError("nevazeci Id radnog dana",400))}

if ('startTime' in updateData) {
    schedule.startTime = updateData.startTime;
}
if ('endTime' in updateData) {
    schedule.endTime = updateData.endTime;
}

// Zatim obradi isWorking i njegovu zavisnost
if ('isWorking' in updateData) {
    // Ažuriraj isWorking
    schedule.isWorking = updateData.isWorking;

    // Ako je isWorking sada true, proveravamo da li su vremena definisana
    if (schedule.isWorking === true) {
        // Moraš proveriti da li su startTime I endTime poslati u istom zahtevu
        // (tj. da li su bili u updateData)
        if (!('startTime' in updateData) || !('endTime' in updateData)) {
            return next(new AppError("Ako je status rada 'aktivan', moraju se definisati i početno i krajnje vreme rada.", 400));
        }
    } else { // schedule.isWorking === false
        // Opcionalno: ako je radnik neaktivan, možda želiš da obrišeš vremena ili ih postaviš na null
         schedule.startTime = null;
         schedule.endTime = null;
    }
}



await employee.save()
res.status(200).json({
        message: 'Radni da uspjesno azuriran',
        schedule: schedule
    });
})
