const express = require("express")
const {authController} = require('../controller')
const router = express.Router()
const {signup} = authController

router.post('/signup', signup);

module.exports = router

