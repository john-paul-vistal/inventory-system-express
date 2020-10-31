const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SalesSchema = new Schema({
    invoiceNumber: { type: Number, required: true },
    numberOfItems: { type: Number, required: true },
    total: { type: Number, required: true },
    cashTendered: { type: Number, required: true },
    change: { type: Number, required: true },
    products: { type: Array, required: true },
    cashier: { type: String, required: true },
    dateRecorded: { type: Date, required: true, default: Date.now() }
});

module.exports = mongoose.model('Sales', SalesSchema);