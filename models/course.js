const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CourseSegmentSchema = require('./coursesegment.schema.js')
const FlashcardSchema = require('./flashcard.schema.js')

const CourseSchema = new Schema({
    name: String,
    description : String,
    tags : [String],
    segments : [CourseSegmentSchema],
    flashcards : [FlashcardSchema],
    notes : String,
}, {
    timestamps : true
});

const Course = mongoose.model('course', CourseSchema);

module.exports = {Course, CourseSchema};