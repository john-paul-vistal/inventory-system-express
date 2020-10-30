const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let ProductSchema = new Schema({
    product_number: { type: Number, required: true },
    product_name: { type: String, required: true },
    brand: { type: String, required: true },
    qty: { type: Number, required: true },
    price: { type: Number, required: true },
    img: { type: String, required: false, default: "notavailable.jpg" },
    created_at: { type: String, required: true },
    updated_at: { type: String, required: true },
    created_by: { type: String, required: true },
    updated_by: { type: String, required: true }

});

module.exports = mongoose.model('Product', ProductSchema);