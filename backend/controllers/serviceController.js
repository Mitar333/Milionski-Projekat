const Owner = require('../models/ownerSchema');
const Salon = require('../models/salonSchema');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const catchAsync=require("./../utils/errorHandler").catchAsync
const AppError=require("./../utils/errorHandler").AppError



exports.getServicesBySalon=catchAsync(async(req,res,next)=>{})
exports.addService=catchAsync(async(req,res,next)=>{})
exports.updateService=catchAsync(async(req,res,next)=>{})
exports.deleteService=catchAsync(async(req,res,next)=>{})






// getServicesBySalon api/salons/:salonId/services

// addService api/services

// updateService api/services/:id

// deleteService api/services/:id