const {authService} = require('../services')
exports.signup = async (req, res) =>{
    const {statusCode, type, message, token, user} = await authService.signup(req.body)

    if(type === "error"){
        return res.status(statusCode).json({
            message,
            type
        })
    }

    return res.status(statusCode).json({
        type,
        message,
        token,
        user
    })
}