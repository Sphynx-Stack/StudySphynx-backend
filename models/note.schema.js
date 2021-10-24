const mongoose = require('mongoose');
const {CourseSchema} = require('./course.js');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    content: String,
    course : CourseSchema.pick(['_id'])
});

module.exports = NoteSchema;