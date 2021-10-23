const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    title: String,
    description : String,
    startdate: Date,
    enddate : Date
});

module.exports = EventSchema;