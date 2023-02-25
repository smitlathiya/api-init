const User = require("../model/user")
const Token = require("../model/token")
const jwt = require("jsonwebtoken")

exports.signup = async (data) =>{
    const userExists = await User.findOne({ email: data.email });

    try {
        if (userExists) {
            throw "Email already taken"
        }
    
        const user = new User(data);
    
        await user.save();
    
        user.hashed_password = undefined
        user.salt = undefined
    
        return{
            type: "success",
            message: "User has been registerd",
            statusCode: 200,
            user
        }
        
    } catch (error) {
        return {
            type: "error",
            message: error,
            statusCode: 403
        }
    }
}

exports.signin = async (data) =>{
    const {email, password} = data

    try {

        const user = await User.findOne({email})

    if(!user){
        throw "User not exist"
    }

    if (!user.authenticate(password)){
        throw "Email or Password does not matched"
    }
        
    const loginToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

    const token = new Token({
        user_id: user._id,
        token: loginToken,
        token_type: "LOGIN"
    })

    await token.save()

    return{
        type: "success",
        message: "Login Successgully",
        statusCode: 200,
        token: loginToken
    }

    } catch (error) {
        return {
            type: "error",
            message: error,
            statusCode: 403
        }
    }
}

exports.signout = async (token) => {
    try {
        if(!token){
            throw "Somthing went wrong"
        }

        token = token.replace("Bearer ", "")

        const tokenExist = await Token.findOne({token})

        if (!tokenExist) {
            throw "Already logged out"
        }

        await tokenExist.remove()

        return{
            type: "success",
            message: "Logout Successgully",
            statusCode: 200
        }

    } catch (error) {
        console.log(error);
        return {
            type: "error",
            message: error,
            statusCode: 403
        }
    }

    
}
exports.logginUserDetail = async (token) =>{
    try {
        if(!token){
            throw "Somthing went wrong"
        }

        token = token.replace("Bearer ", "")

        const tokenExist = await Token.findOne({token})

        if (!tokenExist) {
            throw "Please Login"
        }

        const user = await User.findById(tokenExist.user_id)

        user.hashed_password = undefined
        user.salt = undefined

        return{
            type: "success",
            message: "Logout Successgully",
            statusCode: 200,
            user
        }

    } catch (error) {
        return {
            type: "error",
            message: error,
            statusCode: 403
        }
    }
}