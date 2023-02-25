const { body, check, validationResult } = require("express-validator");

exports.userCreate = [
    body('name').notEmpty().withMessage("Name is require"),
    body('email').notEmpty().withMessage("Email is require")
        .isEmail().withMessage("Enter Valid Email"),
    body("password").notEmpty().withMessage("Password is require").isLength({min:8}).withMessage("Password must be More than 8 characters")
]

exports.userSignin = [
    body('email').notEmpty().withMessage("Email is require")
    .isEmail().withMessage("Enter Valid Email"),
body("password").notEmpty().withMessage("Password is require").isLength({min:8}).withMessage("Password must be More than 8 characters")
]

exports.validationErrorHandler = (req, res, next) =>{
    const {errors} = validationResult(req)

    if(errors.length > 0){
        return res.status(500).json({
            message: errors,
            type: 'Error'
        })
    }
    next()
}