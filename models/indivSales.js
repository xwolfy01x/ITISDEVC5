const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SalesSchema = new Schema({
	orderID: {
		type: mongoose.Types.ObjectId,
		ref: 'OrderSale',
		required: true
	},
	productID: {
		type: mongoose.Types.ObjectId,
		ref: 'Product',
		required: true
	},
	quantitySold: {
		type: Number,
		required: true
	},
	totalPrice: {
		type: Number,
		required: true
	}
}, { versionKey: '_somethingElse'});
const IndivSales = mongoose.model('IndivSales', SalesSchema, 'IndivSales');
module.exports = IndivSales;