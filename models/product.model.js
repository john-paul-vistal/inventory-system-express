const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Rider model
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

// Export the Rider model
module.exports = mongoose.model('Product', ProductSchema);