const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PurchaseHistorySchema = new Schema({
    purchaseID: {
        type: mongoose.Types.ObjectId,
        ref: 'Purchase',
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
PurchaseHistorySchema.statics.getMonthlyPurchases = async function() {
    var date = new Date();
    return PurchaseHistory.find({dateBought: {
        $gte: new Date(new Date(date.getFullYear(), date.getMonth(), 1).setHours(00,00,00))
    }}).populate("purchaseID")
}
PurchaseHistorySchema.statics.getWeeklyPurchases = async function() {
	var date = new Date();
    var startOfWeek = date.getDate() - date.getDay();
	return PurchaseHistory.find({dateBought: {
		$gte: new Date(new Date(date.setDate(startOfWeek)).setHours(00,00,00))
	}}).populate("purchaseID");
}
PurchaseHistorySchema.statics.getDailyPurchases = async function() {
    return PurchaseHistory.find({dateBought: {
		$gte: new Date(new Date().setHours(00,00,00))
	}}).populate("purchaseID");
}
const PurchaseHistory = mongoose.model('PurchaseHistory', PurchaseHistorySchema, 'PurchaseHistory');
module.exports = PurchaseHistory;