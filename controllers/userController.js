const User = require('../models/users.model');

const path = require('path');
const { __express } = require('hbs');



//search_products
const get_user = (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) {
            res.send(err)
        }
        res.render('user_view', {
            name: req.session.name,
            user: user
        });
    });
}

//save_products
const add_user = (req, res) => {
    var bdate = new Date(req.body.birthDate);
    var birthDate = bdate.getMonth() + 1 + '-' + bdate.getDate() + '-' + bdate.getFullYear()
    var date = new Date(Date.now())
    var created_at = date.getMonth() + 1 + '-' + date.getDate() + '-' + date.getFullYear() + ' :: ' + date.getHours() + ' : ' + date.getMinutes() + ' : ' + date.getSeconds();
    var updated_at = date.getMonth() + 1 + '-' + date.getDate() + '-' + date.getFullYear() + ' :: ' + date.getHours() + ' : ' + date.getMinutes() + ' : ' + date.getSeconds();

    let userToCreate = new User({
        username: req.body.username,
        password: req.body.password,
        level: req.body.level,
        fullname: req.body.fullname,
        email: req.body.email,
        gender: req.body.gender,
        birthDate: birthDate,
        img: req.body.img,
        createdAt: created_at,
        updatedAt: updated_at
    });

    userToCreate.save((err, product) => {
        if (err) {
            res.send(err);
        }
        res.redirect('/users')
    });
}

//update_products
const update_user = (req, res) => {
    var date = new Date(Date.now())
    var updated_at = date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear() + ' :: ' + date.getHours() + ' : ' + date.getMinutes() + ' : ' + date.getSeconds();

    let infoTOUpdate = req.body;
    infoTOUpdate.updated_at = updated_at;

    User.findByIdAndUpdate(req.body._id, infoTOUpdate, { new: true }, (err, updatedProduct) => {
        if (err) {
            res.send(err)
        }
        res.redirect('/users')
    });

}

//delete_products
const delete_user = (req, res) => {
    User.findByIdAndDelete(req.params.id, (err, product) => {
        if (err) {
            res.send(err)
        }
        res.redirect('/users')
    });
}



module.exports = {
    get_user,
    add_user,
    update_user,
    delete_user
}