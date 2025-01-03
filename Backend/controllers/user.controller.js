const userModel = require('../models/user.model');
const userService = require('../services/user.service');
const {validationresult} = require('express-validator')

module.exports.registerUser = async(req,res,next)=>{
    const errors = validationresult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {firstname,lastname,email,password} = req.body;
    const hashPassword = await userModel.hashPassword(password);

    const user = await userService.createUser(
        {
            firstname, 
            lastname, 
            email, 
            password: hashPassword
        }
    );

    const token = user.generateAuthToken();

    res.status(201).json({
        token,user
    })
}