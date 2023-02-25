const {signup, signin, signout, logginUserDetail} = require('./auth')

const authService = {
    signup,
    signin,
    signout,
    logginUserDetail
}

module.exports = {
    authService
}