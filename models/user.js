const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {CourseSchema} = require('./course.js');
const NotificationSchema = require('./notification.schema.js');
const EventSchema = require('./event.schema');

const UserSchema = new Schema({
    name: String,
    bio : String,
    recents: [CourseSchema._id],
    courses : [CourseSchema._id],
    usermadecourses : [CourseSchema._id],
    notifications : [NotificationSchema],
    events : [EventSchema]
}, {
    timestamps : true
});

UserSchema.add({
    friends : [UserSchema._id],
});
// TODO : Added unique id

const User = mongoose.model('user', UserSchema);

module.exports = {User, UserSchema};