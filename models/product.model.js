const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Rider model
let ProductSchema = new Schema({
    product_name: { type: String, required: true },
    brand: { type: String, required: true },
    qty: { type: Number, required: true },
});

// Export the Rider model
module.exports = mongoose.model('Product', ProductSchema);