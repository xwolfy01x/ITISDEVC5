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
productSchema.statics.getProducts = async function() {
    return Product.find().sort({_id: 1}).then(result => {
        return result;
    }).catch(err => {
        console.log(err);
    })
}
productSchema.statics.getSortedProducts = async function() {
    return Product.find().sort({productName: 1}).then(result => {
        return result;
    }).catch(err => {
        console.log(err);
    })
}
productSchema.statics.getOnStock = async function() {
    return Product.find({status:"On Stock"}).then(result => {
        return result;
    });
}
productSchema.statics.getOutOfStock = async function() {
    return Product.find({status:"Out of Stock"}).then(result => {
        return result;
    });
}
const Product = mongoose.model('Product', productSchema, 'Products');
module.exports = Product;