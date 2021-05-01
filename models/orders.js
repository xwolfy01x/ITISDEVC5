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
	},
	totalSale: {
		type: Number,
		required: true
	}
}, { versionKey: '_somethingElse' });
orderSalesSchema.statics.getMonthlyOrders = async function() {
	var date = new Date();
	return OrderSale.find({dateCreated: {
		$gt: new Date(new Date(date.getFullYear(), date.getMonth(), 1).setHours(00,00,00))
	}})
}
orderSalesSchema.statics.getWeeklyOrders = async function() {
	var date = new Date();
    var startOfWeek = date.getDate() - date.getDay();
	return OrderSale.find({dateCreated: {
		$gt: new Date(new Date(date.setDate(startOfWeek)).setHours(00,00,00))
	}})
}
orderSalesSchema.statics.getOrdersToday = async function() {
	return OrderSale.find({dateCreated: {
		$gt: new Date(new Date().setHours(00,00,00))
	}});
};
const OrderSale = mongoose.model('OrderSale', orderSalesSchema, 'OrderSales');
module.exports = OrderSale;