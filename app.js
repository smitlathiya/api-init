const express = require("express")
const dotenv = require("dotenv")
const bodyParser = require("body-parser")
const db = require('./config/db')
const routes = require("./routes")

const app = express()

dotenv.config()
app.use(bodyParser.json())
app.use('/api', routes)

const port = process.env.PORT || 3700
app.listen(port, ()=>{
    db()
    console.log(`API is listening Port: ${port}`)
})