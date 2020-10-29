const Product = require('../models/product.model');
const Users = require('../models/users.model');

const path = require('path');
const { __express } = require('hbs');

var logged = false
var loggedAsCashier = false


//call dashboard
const call_dashboard = (req, res) => {
    try {
        if (logged == true) {
            res.render('dashboard', {
                name: req.session.name,
                level: req.session.level,
                img: req.session.img,
                id: req.session.id,
            });
        } else {
            res.redirect('/')
        }
    } catch {
        res.redirect('/')
    }

}


//call_products
const call_products = (req, res) => {

    Product.find({}, (err, products) => {
        if (err) {
            res.send(err)
        }
        try {
            if (logged == true) {
                res.render('product', {
                    products: products,
                    name: req.session.name,
                    level: req.session.level,
                    img: req.session.img,
                    id: req.session.id,
                });
            } else {
                res.redirect('/')
            }
        } catch {
            res.redirect('/')
        }
    })

}

//call stock 
const call_stock = (req, res) => {

    Product.find({}, (err, products) => {
        if (err) {
            res.send(err)
        }
        try {
            var cdate = new Date(products.created_at)
            var udate = new Date(products.updated_at)
            var created_at = cdate.getMonth() + 1 + '-' + cdate.getDate() + '-' + cdate.getFullYear() + ' :: ' + cdate.getHours() + ' : ' + cdate.getMinutes() + ' : ' + cdate.getSeconds();
            var updated_at = udate.getMonth() + 1 + '-' + udate.getDate() + '-' + udate.getFullYear() + ' :: ' + udate.getHours() + ' : ' + udate.getMinutes() + ' : ' + udate.getSeconds();
            if (logged == true) {
                res.render('stock', {
                    products: products,
                    created_at: created_at,
                    updated_at: updated_at,
                    name: req.session.name,
                    level: req.session.level,
                    img: req.session.img,
                    id: req.session.id,
                });
            } else {
                res.redirect('/')
            }
        } catch {
            res.redirect('/')
        }
    })

}

//call sales 
const call_sales = (req, res) => {

    try {
        if (logged == true) {
            res.render('sales', {
                name: req.session.name,
                level: req.session.level,
                img: req.session.img,
                id: req.session.id,
            });
        } else {
            res.redirect('/')
        }
    } catch {
        res.redirect('/')
    }

}

//call users 
const call_users = (req, res) => {
    try {
        Users.find({}, (err, users) => {
            if (err) {
                res.send(err)
            }

            if (logged == true) {
                res.render('users', {
                    users: users,
                    name: req.session.name,
                    level: req.session.level,
                    img: req.session.img,
                    id: req.session.id,
                });
            } else {
                res.redirect('/')
            }

        });
    } catch {
        res.redirect('/')
    }
}

//call users 
const login = (req, res) => {
    res.render('login');
}


const logout = (req, res) => {
    logged = false
    req.session.destroy(function(err) {
        if (err) {
            res.negotiate(err)
        }
        res.redirect('/')
    });
}



//login verification
const verify_login = (req, res) => {

    let username = req.body.username;
    let password = req.body.password;

    Users.findOne({ username: username }, (err, user) => {
        if (err) {
            res.send(err)
        }

        if (user != null) {
            if (user.username == username && user.password == password) {
                req.session.logged = true;
                req.session.name = user.fullname;
                req.session.level = user.level;
                req.session.img = user.img;
                req.session.id = user._id;

                if (user.level == "cashier") {
                    loggedAsCashier = true
                    res.redirect('/point-of-sale');
                } else {
                    logged = true
                    res.redirect('/dashboard');
                }

            } else {
                res.render("login", {
                    error: "Invalid Username or Password"
                })
            }
        } else {
            res.render("login", {
                error: "Invalid Username or Password"
            })
        }

    })
}




//call add_form
const call_form = (req, res) => {
    try {
        if (logged == true) {
            Product.find({}, 'product_number -_id', (err, product) => {
                if (err) {
                    res.send(err)
                }
                let lastID = product[product.length - 1]
                req.session.lastNumber = lastID.product_number;

                res.render('product_form', {
                    name: req.session.name,
                    level: req.session.level,
                    img: req.session.img,
                    id: req.session.id,
                    lastNumber: req.session.lastNumber + 1
                })

            });

        } else {
            res.redirect('/')
        }
    } catch {
        res.redirect('/')
    }
}

const adduser_form = (req, res) => {
    try {
        if (logged == true) {
            res.render('user_form', {
                name: req.session.name,
                level: req.session.level,
                img: req.session.img,
                id: req.session.id,
            })
        } else {
            res.redirect('/')
        }
    } catch {
        res.redirect('/')
    }
}

const point_of_sale = (req, res) => {
    var date = new Date(Date.now())
    var today = date.getMonth() + '-' + date.getDate() + '-' + date.getFullYear()
    try {
        if (loggedAsCashier == true) {

            res.render('point_of_sale', {
                name: req.session.name,
                level: req.session.level,
                img: req.session.img,
                id: req.session.id,
                date: today,
            })

        } else {
            res.redirect('/')
        }
    } catch {
        res.redirect('/')
    }
}



module.exports = {
    call_dashboard,
    call_products,
    call_form,
    call_stock,
    call_sales,
    call_users,
    login,
    logout,
    verify_login,
    adduser_form,
    point_of_sale
}