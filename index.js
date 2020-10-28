// Configuration part
// ------------------------------------------------------------
const express = require('express');
var session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const port = 8000


// Create express app
const app = express();

const Handlebars = require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static("public"))
app.set("views", "views")
app.set("view engine", "hbs")








// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
    // Parse requests of content-type - application/json
app.use(bodyParser.json())


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});



// Set up default mongoose connection
let db_url = 'mongodb://127.0.0.1/inventory-system';
mongoose.connect(db_url, { useNewUrlParser: true, useUnifiedTopology: true });
// Get the default connection
var db = mongoose.connection;
// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Initialize session
app.use(session({ secret: "admin123", resave: true, saveUninitialized: true }));


//Import routes
const productRoutes = require('./routes/productRoutes');
app.use(productRoutes);



// ------------------------------------------------------------
// listen for requests
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});