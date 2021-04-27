/*
    - productID: ObjectId
    - productName: String
    - currQuantity: Int
    - status: String
*/ 
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productSchema = new Schema({
    productName: {
        type: String,
        required: true
    },
    currQuantity: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    }
}, { versionKey: '_somethingElse' });
const Product = mongoose.model('Product', productSchema, 'Products');
module.exports = Product;