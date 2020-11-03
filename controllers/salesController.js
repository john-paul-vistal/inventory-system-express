const Sales = require('../models/sales.model');

const path = require('path');
const { __express } = require('hbs');



//get_all product
const get_all_sales = (req, res) => {
    Sales.find({}, (err, sales) => {
        if (err) {
            res.send(err)
        }
        res.send(sales)
    });
}

//search_products
const get_sales = (req, res) => {
    Product.findById(req.params.id, (err, product) => {
        if (err) {
            res.send(err)
        }
        res.render('product_view', {
            product: product,
            name: req.session.name
        });
    });
}


//save_products
const add_sales = (req, res) => {

    let productOrderList = JSON.parse(req.body.products);

    let salesToCreate = new Sales({
        invoiceNumber: req.body.invoiceNumber,
        numberOfItems: req.body.itemCount,
        total: req.body.total,
        cashTendered: req.body.cashTendered,
        change: req.body.change,
        products: productOrderList,
        cashier: req.body.cashier
    });

    salesToCreate.save((err, sales) => {
        if (err) {
            res.send(err);
        }
        res.redirect('/point-of-sale')

    });
}

//update_products
const update_sales = (req, res) => {
    var date = new Date(Date.now())
    var updated_at = date.getMonth() + 1 + '-' + date.getDate() + '-' + date.getFullYear() + ' :: ' + date.getHours() + ' : ' + date.getMinutes() + ' : ' + date.getSeconds();

    let infoTOUpdate = req.body;
    infoTOUpdate.updated_at = updated_at;

    Product.findByIdAndUpdate(req.body._id, infoTOUpdate, { new: true }, (err, updatedProduct) => {
        if (err) {
            res.send(err)
        }
        res.redirect('/products')
    });

}

//delete_products
const delete_sales = (req, res) => {
    Product.findByIdAndDelete(req.params.id, (err, product) => {
        if (err) {
            res.send(err)
        }
        res.redirect('/products')
    });
}



module.exports = {
    get_all_sales,
    get_sales,
    add_sales,
    update_sales,
    delete_sales
}