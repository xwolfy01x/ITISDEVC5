const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PurchaseHistorySchema = new mongoose.SchemaType({
    purchaseID: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    quantityBought: {
        type: Number,
        required: true
    },
    dateBought: {
        type: Date,
        required: true
    }
}, { versionKey: '_somethingElse'}); 
const PurchaseHistory = mongoose.model('PurchaseHistory', PurchaseHistorySchema, 'PurchaseHistory');
module.exports = PurchaseHistory;