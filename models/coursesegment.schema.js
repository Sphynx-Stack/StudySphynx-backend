const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSegmentSchema = new Schema({
    title: String,
    description : String,
    link : [String],
    assessmentlink : [String],
    solutionlink : [String],
});

module.exports = CourseSegmentSchema;