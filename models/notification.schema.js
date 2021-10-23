const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
    title: String,
    description: String,
    type : {type: String},
}, {
    timestamps : true
});

module.exports = NotificationSchema;