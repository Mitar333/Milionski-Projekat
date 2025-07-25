const Employee = require('../models/employeeSchema');
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
    const { salonId, name, bio, phone, email, password, schedule, servicesOffered } = req.body;

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
//RADIO MI COPILOT
exports.addEmployeeVacationDate = catchAsync(async (req, res, next) => { // Preimenovano u addEmployeeVacationDate za jasnocu
    const { id } = req.params;
    const { vacationDate } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new AppError('Invalidan ID zaposlenog.', 400));
    }

    if (!vacationDate) {
        return next(new AppError('Datum godišnjeg odmora je obavezan.', 400));
    }

    const parsedVacationDate = new Date(vacationDate);
    if (isNaN(parsedVacationDate.getTime())) {
        return next(new AppError('Neispravan format datuma godišnjeg odmora.', 400));
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
        id,
        { $addToSet: { vacationDates: parsedVacationDate } },
        { new: true, runValidators: true }
    ).select('-password');

    if (!updatedEmployee) {
        return next(new AppError('Zaposleni nije pronađen.', 404));
    }

    res.status(200).json({
        message: 'Datum godišnjeg odmora uspješno dodan.',
        vacationDates: updatedEmployee.vacationDates
    });
});