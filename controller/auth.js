const {authService} = require('../services')
const Token = require('../model/token')

exports.signup = async (req, res) =>{

    const {statusCode, type, message, user} = await authService.signup(req.body)

    if(type === "error"){
        return res.status(statusCode).json({
            message,
            type
        })
    }

    return res.status(statusCode).json({
        type,
        message,
        user
    })
}
exports.signin = async (req, res) => {

    const {statusCode, type, message, token} = await authService.signin(req.body)

    if(type === "error"){
        return res.status(statusCode).json({
            message,
            type
        })
    }

    res.cookie("t", token, { expire: new Date() + 9999 });

    return res.status(statusCode).json({
        type,
        message
    })
}
exports.signout = async (req, res) =>{
    const {statusCode, type, message} = await authService.signout(req.headers.authorization)


    if(type === "error"){
        return res.status(statusCode).json({
            message,
            type
        })
    }

    return res.status(statusCode).json({
        type,
        message
    })
}
exports.logginUserDetail = async(req, res) =>{
    const {statusCode, type, message, user} = await authService.logginUserDetail(req.headers.authorization)


    if(type === "error"){
        return res.status(statusCode).json({
            message,
            type
        })
    }

    return res.status(statusCode).json({
        type,
        message,
        user
    })
}
exports.signinRequire = async(req, res, next) =>{
    try {
        if(!req.headers.authorization){
            throw "Unauthorized"
        }
        const token = req.headers.authorization.replace("Bearer ", "")

        const tokenExist = await Token.findOne({token})

        if (!tokenExist) {
            throw "Please Login"
        }
        
        next()

    } catch (error) {
        return res.status(401).json({
            type: "error",
            message: error,
        })
    }
    
}