const User = require("../model/user")

exports.signup = async (data) =>{
    const userExists = await User.findOne({ email: data.email });

    const userPassword = data.password;

    if (userExists) {
        return {
            type: "error",
            message: "Email already taken",
            statusCode: 403
        }
    }

    if (userPassword.length < 6) {
        return{
            type: "error",
            message: "Password must be more than 6 characters",
            statusCode: 403
        }
    }

    const user = new User(data);

    await user.save();

    return{
        type: "success",
        message: "User has been registerd",
        statusCode: 200,
        token: 'token',
        user
    }
}