const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const purchaseSchema = new Schema({
	productID: {
		type: mongoose.Types.ObjectId,
		ref: 'Product',
		required: true
	},
	quantityBought: {
		type: Integer,
		required: true
	},
	priceBought: {
		type: Number,
		required: true
	},
	dateBought: {
		type: Date,
		required: true
	}
}, { versionKey: '_somethingElse'});
const Purchase = mongoose.model('Purchase', purchaseSchema, 'Purchases');
module.exports = Purchase
