const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FlashcardSchema = new Schema({
    front : String,
    back : String,
});

module.exports = FlashcardSchema;