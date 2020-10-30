const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let UsersSchema = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    level: { type: String, required: true },
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String, required: true },
    birthDate: { type: String, required: true },
    img: { type: String, required: false, default: "default1.jpg" },
    createdAt: { type: String, required: true },
    updatedAt: { type: String, required: true }
});


module.exports = mongoose.model('Users', UsersSchema);