/*
- logID: ObjectId
- productID: ObjectId
- currPrice: double
- dateChanged: Date 
- reason: String
*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const historySchema = new Schema ({
    productID: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    currPrice: {
        type: Integer,
        required: true
    },
    dateChanged: {
        type: Date,
        required: true
    },
    reason:{
        type: String,
        required: false
    }
}, { versionKey: '_somethingElse' })
const History = mongoose.model('History', historySchema, "Product History");
module.exports = History;