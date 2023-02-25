const mongoose = require('mongoose')
const { v1 } = require('uuid')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        require: true
    },
    email: {
        type: String,
        trim: true,
        require: true
    },
    hashed_password:{
        type: String,
        require: true
    },
    salt: String,
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date
})


userSchema.virtual('password')
    .set(function (password) {
        this._password = password

        this.salt = v1()
        //encrypt Password()
        this.hashed_password = this.encryptPassword(password)
    })
    .get(function () {
        return this._password
    })

userSchema.methods = {
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashed_password
    },

    encryptPassword: function (password) {
        if (!password) return "";
        try {
            return crypto.createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');

        } catch (error) {
            return ""
        }
    }
}


module.exports = mongoose.model("User", userSchema)