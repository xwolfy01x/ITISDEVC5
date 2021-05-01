const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const orderSalesSchema = new Schema({
	salesID: [{
		type: mongoose.Types.ObjectId,
		ref: 'IndivSales',
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
orderSalesSchema.statics.getOrders = async function(fromdate, todate) {
	return OrderSale.find({dateCreated: {
		$gte: new Date(new Date(fromdate[0], fromdate[1]-1, fromdate[2])).setHours(00,00,00),
		$lt: new Date(new Date(todate[0], todate[1]-1, todate[2])).setHours(23,59,99)
	}}).populate('salesID').populate({
		path: 'indivSales'
	})
}
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