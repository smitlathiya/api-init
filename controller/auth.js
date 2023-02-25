const {authService} = require('../services')

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