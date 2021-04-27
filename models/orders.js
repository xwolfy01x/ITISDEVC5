const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const orderSalesSchema = new Schema({
	salesID: [{
		type: mongoose.Types.ObjectId,
		ref: 'IndivSale',
		required: true
	}],
	dateCreated: {
		type: Date,
		required: true
	}
}, { versionKey: '_somethingElse' });
const OrderSale = mongoose.model('OrderSale', orderSalesSchema, 'OrderSales');
module.export = OrderSale;