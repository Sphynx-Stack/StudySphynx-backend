const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {CourseSchema} = require('./course.js')

const UserSchema = new Schema({
    name: String,
    bio : String,
    friends : [UserSchema._id],
    courses : [CourseSchema._id],
    usermadecourses = [CourseSchema._id],
    notifications : [NotificationSchema],
    events : [EventSchema]
}, {
    timestamps : true
});

const User = mongoose.model('user', UserSchema);

module.exports = {User, UserSchema};