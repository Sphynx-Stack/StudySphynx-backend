const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {CourseSchema} = require('./course.js');
const CourseSegmentSchema = require('./coursesegment.schema.js');

const UserSchema = new Schema({
    name: String,
    bio : String,
    recents: [CourseSchema._id],
    friends : [UserSchema._id],
    courses : [CourseSchema._id],
    usermadecourses = [CourseSchema._id],
    notifications : [NotificationSchema],
    events : [EventSchema]
}, {
    timestamps : true
});

// TODO : Added unique id

const User = mongoose.model('user', UserSchema);

module.exports = {User, UserSchema};