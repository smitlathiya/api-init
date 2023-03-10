const express = require("express")
const {authController} = require('../controller')
const router = express.Router()
const {signup, signin, signout, logginUserDetail, signinRequire} = authController
const {userCreate, userSignin, validationErrorHandler} =require("../middleware/validation")

router.post('/signup',userCreate, validationErrorHandler,signup);

router.post('/signin',userSignin, validationErrorHandler, signin);

router.post('/signout', signout);

router.get('/me',signinRequire, logginUserDetail);

module.exports = router

