const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const purchaseSchema = new Schema({
	productID: {
		type: mongoose.Types.ObjectId,
		ref: 'Product',
		required: true
	},
	priceEach: {
		type: Number,
		required: true
	}
}, { versionKey: '_somethingElse'});
purchaseSchema.statics.getPurchases2 = async function() {
	return Purchase.find().then(result => {
		return result;
	})
}
purchaseSchema.statics.getPurchases = async function() {
    return Purchase.find().populate('productID').populate({
		path: 'product'
	}).catch(err => {
        console.log(err);
    })
}
const Purchase = mongoose.model('Purchase', purchaseSchema, 'Purchases');
module.exports = Purchase;