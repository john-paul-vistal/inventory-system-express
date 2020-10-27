const Product = require('../models/product.model');
const Users = require('../models/users.model');

const path = require('path');
const { __express } = require('hbs');

var logged = false
var name = null
var img = null
var level = null
var id = null





//call dashboard
const call_dashboard = (req, res) => {
    try {
        if (logged == true) {
            res.render('dashboard', {
                name: name,
                level: level,
                img: img
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
                    name: name,
                    img: img,
                    level: level
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
            var created_at = cdate.getMonth() + 1 + '/' + cdate.getDate() + '/' + cdate.getFullYear() + ' :: ' + cdate.getHours() + ' : ' + cdate.getMinutes() + ' : ' + cdate.getSeconds();
            var updated_at = udate.getMonth() + 1 + '/' + udate.getDate() + '/' + udate.getFullYear() + ' :: ' + udate.getHours() + ' : ' + udate.getMinutes() + ' : ' + udate.getSeconds();
            if (logged == true) {
                res.render('stock', {
                    products: products,
                    created_at: created_at,
                    updated_at: updated_at,
                    name: name,
                    level: level,
                    img: img
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
                name: name,
                level: level,
                img: img
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
                    name: name,
                    level: level,
                    img: img
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
    res.redirect('/')
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
                logged = true
                name = user.fullname;
                level = user.level;
                img = user.img;
                id = user._id;
                userLogged = user.fullname;

                res.render("dashboard", {
                    name: user.fullname,
                    level: user.level,
                    img: user.img
                })
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
            res.render('product_form', {
                id: id,
                name: name
            })
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
            res.render('add_user', {
                id: id,
                name: name
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
    adduser_form
}