const express = require("express");
const router = express.Router();
const controller = require("../controller/controller.js");
const { body } = require("express-validator");
const { verifyToken } = require("../JWT/jwtManager.js");
router.post(
	"/registration",
	body("name")
		.trim()
		.notEmpty()
		.withMessage("Name Must be Require")
		.isLength({ min: 4 })
		.withMessage("Please Enter Atleast 4 Char for Name"),
	body("email")
		.isEmail()
		.withMessage("Please Provide Valid Email")
		.notEmpty()
		.withMessage("Email Must be Required"),
	body("password")
		.trim()
		.notEmpty()
		.withMessage("Password Required")
		.isLength({ min: 4 })
		.withMessage("Password Should be at least 4 char long")
		.isAlphanumeric()
		.withMessage("Password Should be Alphanumeric"),
	body("c_password")
		.notEmpty()
		.withMessage("Confirm Password Required")
		.custom(function (value, { req }) {
			if (value != req.body.password) {
				throw new Error("Password and Confirm Password Should Be Same");
			}
			return true;
		}),
	body("mo_no")
		.isNumeric()
		.withMessage("Provide valid Mobile Number")
		.isLength({ min: 10, max: 10 })
		.withMessage("Provide valid Mobile Number"),
	controller.registrationController
);

router.post(
	"/login",
	body("email")
		.notEmpty()
		.withMessage("Email Must Require")
		.isEmail()
		.withMessage("Please Provide valid Email"),
	body("password")
		.notEmpty()
		.withMessage("Password Required")
		.isLength({ min: 4 })
		.withMessage("Password Should be at least 4 char long")
		.isAlphanumeric()
		.withMessage("Password Should be Alphanumeric"),
	controller.login
);


router.get('/', verifyToken, controller.dashboard);
router.post('/logout', controller.logout);
module.exports = router;
