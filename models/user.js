const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {CourseSchema} = require('./course.js');
const NotificationSchema = require('./notification.schema.js');
const EventSchema = require('./event.schema');

const UserSchema = new Schema({
    name: String,
    bio : String,
    recents: [CourseSchema.pick(['_id'])],
    courses : [CourseSchema.pick(['_id'])],
    usermadecourses : [CourseSchema.pick(['_id'])],
    notes : [NoteSchema],
    notifications : [NotificationSchema],
    events : [EventSchema],
    user_id: String
}, {
    timestamps : true
});

UserSchema.add({
    friends : [UserSchema.pick(['_id'])],
});
// TODO : Added unique id

const User = mongoose.model('user', UserSchema);

module.exports = User;