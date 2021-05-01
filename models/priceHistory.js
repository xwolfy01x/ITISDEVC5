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
        ref: 'Product',
        required: true
    },
    currPrice: {
        type: Number,
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
}, { versionKey: '_somethingElse' });
historySchema.statics.getPriceInstance = async function(id) {
    return History.find({productId: id}).sort({dateChanged: -1}).then(result => {
        return result;
    })
}
historySchema.statics.findProductPrice = async function() {
    return History.find().sort({productID: 1, dateChanged: -1}).populate("productID").populate({
        path: 'product'
    });
}
const History = mongoose.model('History', historySchema, "PriceHistory");
module.exports = History;