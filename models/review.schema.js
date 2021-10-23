const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    rating : Number,
    title : String,
    description  : String
});

module.exports = ReviewSchema;