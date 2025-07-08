const Service = require('../models/serviceSchema');
const mongoose = require('mongoose');
const { catchAsync, AppError } = require('./../utils/errorHandler');

exports.getServicesBySalon = catchAsync(async (req, res, next) => {
    const { salonId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(salonId)) {
        return next(new AppError('Invalidan ID salona.', 400));
    }

    const services = await Service.find({ salonId });

    if (services.length === 0) {
        return next(new AppError('Nema pronađenih usluga za ovaj salon.', 404));
    }

    res.status(200).json(services);
});

exports.addService = catchAsync(async (req, res, next) => {
    const { salonId, name, durationMinutes, price, description, isActive } = req.body;

    const existingService = await Service.findOne({ salonId, name });
    if (existingService) {
        return next(new AppError('Usluga sa ovim imenom već postoji u ovom salonu.', 400));
    }

    const newService = new Service({
        salonId,
        name,
        durationMinutes,
        price,
        description,
        isActive
    });

    const service = await newService.save();

    res.status(201).json(service);
});

exports.updateService = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new AppError('Invalidan ID usluge.', 400));
    }

    if (updateData.salonId) {
        return next(new AppError('Nije dozvoljeno mijenjati ID salona usluge preko ove operacije.', 400));
    }

    const updatedService = await Service.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

    if (!updatedService) {
        return next(new AppError('Usluga nije pronađena.', 404));
    }

    res.status(200).json(updatedService);
});

exports.deleteService = catchAsync(async (req, res, next) => {
    const serviceId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(serviceId)) {
        return next(new AppError('Invalidan ID usluge.', 400));
    }

    const service = await Service.findByIdAndDelete(serviceId);
    if (!service) {
        return next(new AppError('Usluga nije pronađena.', 404));
    }

    res.status(204).json(null);
});