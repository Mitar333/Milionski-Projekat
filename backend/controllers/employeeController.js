const Owner = require('../models/ownerSchema');
const Salon = require('../models/salonSchema');
const Employee = require('../models/employeeSchema');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const catchAsync=require("./../utils/errorHandler").catchAsync
const AppError=require("./../utils/errorHandler").AppError

exports.getEmployeesBySalon=catchAsync(async(req,res,next)=>{
        const { salonId } = req.params;
        
        if (!mongoose.Types.ObjectId.isValid(salonId)) {
            return next(new AppError('Invalidan Salon ID.',400))
        }
        const employees = await Employee.find({ salonId }).select('-password');
    
        if (!employees || employees.length === 0) {
          return next(new AppError('Nema pronadjenih employee-a za ovaj salon.',404))}
    
        res.status(200).json(employees);
})


exports.addEmployee=catchAsync(async(req,res,next)=>{catchAsync(async(req,res,next)=>{
    const {salonId,name,bio,phone,email,password,schedule,vacationDates}=req.body
    const existingEmployee=Employee.findOne({email})
    if (existingEmployee) return next("Employee with same email address alredy exists",400)//mozda nepotrebno ako radnik promjeni firmu 

    if (password.length<6) return next("Password needs at least 6 caracters",400)
    const hashedPassword = await bcrypt.hash(password, 10);

    const newEmployee=new Employee({
salonId,name,bio,phone,email,password:hashedPassword,schedule,vacationDates
    })
    
    const employee = await newEmployee.save();

    const employeeResponse = employee.toObject();//kopirao iz user kontrolera ne znam sta radi
    delete employeeResponse.password;

    res.status(201).json(employeeResponse);
})})


exports.updateEmployee=catchAsync(async(req,res,next)=>{
        const { id } = req.params;
        const updateData = req.body;
    
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(new AppError('Invalidan Employee ID.',400))
        }
    
        if (updateData.password) {
          updateData.password = await bcrypt.hash(updateData.password, 10);
        }
        const updatedEmployee = await Employee.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }).select('-password');
    
        if (!updatedEmployee) {
          return next(new AppError('Employee nije pronadjen.',404))
        }
    
        res.status(200).json(updatedEmployee);
})


exports.deleteEmployee=catchAsync(async(req,res,next)=>{
    const employeeId= req.params.id;
    const employee=await Employee.findByIdAndDelete(employeeId)
    if (!employee) return next()
})

//     const userId = req.params.id;
//     try {
//         // Find the user by ID and delete
//         const user = await User.findByIdAndDelete(userId);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }   
//         res.status(200).json({ message: 'User deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error deleting user', error });
//     }
// }
exports.setEmployeeVacation=catchAsync(async(req,res,next)=>{})









// getEmployeesBySalon api/salons/:salonId/employees

// addEmployee api/employees

// updateEmployee api/employees/:id

// deleteEmployee api/employees/:id

// setEmployeeVacation api/employees/:id/vacation