const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const purchaseSchema = new Schema({
	productID: {
		type: mongoose.Types.ObjectId,
		ref: 'Products',
		required: true
	},
	priceEach: {
		type: Number,
		required: true
	}
}, { versionKey: '_somethingElse'});
const Purchase = mongoose.model('Purchase', purchaseSchema, 'Purchases');
module.exports = Purchase;