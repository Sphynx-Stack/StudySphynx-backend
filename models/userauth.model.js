const mongoose = require('mongoose');
const { isEmail } = require('validator')
const bcrypt = require('bcrypt');

const registerationSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true, 'Please Enter your name']
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: [true, 'email should be lowercase'],
        validate: [isEmail, 'Please enter a valid Email']
    },
    password: {
        type: String,
        required: true,
        minlength:[6, 'Minimum password length should be 6 characters'],
        hide:true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

registerationSchema.pre('save', async function(next){ 
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model('userauth', registerationSchema);