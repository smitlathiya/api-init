const {signup, signin, signout, logginUserDetail,signinRequire} = require('./auth')

const authController = {
    signup,
    signin,
    signout,
    logginUserDetail,
    signinRequire
}

module.exports = {
    authController
}