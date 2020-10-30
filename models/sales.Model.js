const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let SalesSchema = new Schema({
    invoiceNumber: { type: String, required: true },
    numberOfItems: { type: String, required: true },
    total: { type: Number, required: true },
    cashTendered: { type: Number, required: true },
    change: { type: Number, required: true },
    products: { type: String, required: true },
    dateRecorded: { type: String, required: true }
});

module.exports = mongoose.model('Sales', SalesSchema);