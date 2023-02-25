const {signup, signin, signout, logginUserDetail} = require('./auth')

const authController = {
    signup,
    signin,
    signout,
    logginUserDetail
}

module.exports = {
    authController
}