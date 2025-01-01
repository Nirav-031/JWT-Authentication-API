const mongoose = require("mongoose");
const Login = require("../model/model.js");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const { generateToken} = require('../JWT/jwtManager.js');
exports.registrationController = async (req, res, next) => {
	try {
		const valid = validationResult(req);
		if (!valid.isEmpty()) {
			return res.status(400).json({
				message: "Validation failed",
				errors: valid.array(),
			});
        }
        
		const { name, email, password, mo_no } = req.body;
        
		const isExist = await Login.findOne({ email });
		if (isExist) throw new Error("User Already Exists");
        
       
		const hashPassword = await bcrypt.hash(password,10);
		const result = await Login.insertMany({
			name,
			email,
			password: hashPassword,
			mo_no,
		});

        if (result) {
            return res.status(200).json({ status: true, data: "User Register SuccessFully" });
        } else
        {
            return res.status(500).json({ status: false, data: "Something went wrong" });    
        }
    } catch (error) {
        console.log(error.message);
        
        const err = {
            status: 500,
            message:error.message
        }
		next(err);
	}
};


exports.login = async(req,res,next) => {
    try {
        const valid = validationResult(req);
        if (!valid.isEmpty()) {
            return res.status(500).json({ status: 500, error: valid.array() });
        }
        const isExist =await Login.findOne({ email:req.body.email });
        if (!isExist) return res.status(500).json({ status: false, data: "Please Register First" });
        const decryptPassword = await bcrypt.compare(req.body.password, isExist.password);
        if (!decryptPassword) return res.status(500).json({ status: false, data: "Incorrect Password" });
        
        const token =await generateToken({isExist});
        
        res.cookie("jwt", token);

        return res.status(200).json({ status: true, data: "Login SuccessFully" });

    } catch (error) {
        const err = {
            status: 500,
            message:error.message
        }
        next(err);
    }
}

exports.dashboard = (req,res,next) => {
    try {
        return res.status(200).json("Welcome To DashBoard")
    } catch (error) {
        const err = {
            status: 500,
            message:error.message
        }
        next(err);
    }
}

exports.logout = (req, res, next) => {
    try {
        
        res.clearCookie('jwt');
        return res.status(200).json({ status: true, data: "LogOut SuccessFully" })
    } catch (error) {
        next(error);
    }
}