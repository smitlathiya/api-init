const mongoose = require('mongoose')
const { ObjectId } = mongoose.Schema

const tokenSchema = new mongoose.Schema({
    user_id: {
        type: ObjectId,
        ref: "User"
    },
    token: {
        type: String,
        require: true
    },
    token_type:{
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    }
})




module.exports = mongoose.model("Token", tokenSchema)