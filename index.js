// Configuration part
// ------------------------------------------------------------
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = 3231

// Create express app
const app = express();
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
let db_url = 'mongodb://127.0.0.1/db_exercise_johnpaul';
mongoose.connect(db_url, { useNewUrlParser: true });
// Get the default connection
var db = mongoose.connection;
// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



//
// Let's start the exercise :
//
// During ALL the exercise the requests have to be connected with the database
//
// Context : We want to create a web application to manage a motorcyle Championship. 
// ------------------------------------------------------------

// Import Models
const Rider = require('./models/rider.model');
const Motorcycle = require('./models/motorcycle.model');

// Question 1 - Create a HTTP Request to add a riders in the database :
// When we create a rider he doesn't have a score yet.

app.post('/riders', (req, res) => {
    let riderToCreate = new Rider({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age
    });
    riderToCreate.save((err, rider) => {
        if (err) {
            res.send(err);
        }
        res.send('Rider Added Successfully!')
        res.json(rider);
    });
});

// Question 2 - Create a HTTP Request to fetch all the riders :
app.get('/riders', (req, res) => {
    Rider.find({}, (err, riders) => {
        if (err) {
            res.send(err)
        }
        res.json({ riders: riders })
    });
});


// Question 3 - Create a HTTP Request to fetch one rider :
app.get('/riders/:id', (req, res) => {
    Rider.findById(req.params.id, (err, riders) => {
        if (err) {
            res.send(err)
        }
        res.json(riders)
    });
});

// Question 4 - Create a HTTP Request to update firstName or/and lastName of a rider :
app.put('/riders/:id', (req, res) => {
    let infoTOUpdate = req.body;
    Rider.findByIdAndUpdate(req.params.id, infoTOUpdate, (err, updatedRider) => {
        if (err) {
            res.send(err)
        }
        res.send('Updated Successfully!')
        res.json(updatedRider)
    });
});

// Question 5 - Create a HTTP Request to ADD score of a rider :
app.put('/riders/score/:id', (req, res) => {
    let infoTOUpdate = req.body;
    Rider.findByIdAndUpdate(req.params.id, infoTOUpdate, (err, updatedRider) => {
        if (err) {
            res.send(err)
        }
        res.send('Score Added Successfully!')
        res.json(updatedRider)
    });
});

// Question 6 - Create a HTTP Request to delete one rider :
app.delete('/riders/:id', (req, res) => {
    Rider.findByIdAndDelete(req.params.id, (err, riders) => {
        if (err) {
            res.send(err)
        }
        res.send('Deleted Successfully!')
    });
});

// Question 7 - Create a HTTP Request to create motorcycles :
// For create a motorcycle you will need to create the model first.
app.post('/motorcycles', (req, res) => {
    let motorToCreate = new Motorcycle({
        manufacturer: req.body.manufacturer,
        displacement: req.body.displacement,
        weight: req.body.weight,
        riderId: req.body.riderId,
    });
    motorToCreate.save((err, motorcycle) => {
        if (err) {
            res.send(err);
        }
        res.send('Motorcycle Added Successfully!')
        res.json(motorcycle);
    });
});


// Question 8 - Create a HTTP Request to fetch all the motorcycles:
app.get('/motorcycles', (req, res) => {
    Motorcycle.find({}, (err, motors) => {
        if (err) {
            res.send(err)
        }
        res.json({ motorcycles: motors })
    });
});


// Question 9 - Create a HTTP Request to fetch all the motorcycles associate to one rider:
app.get('/motorcycles/:riderid', (req, res) => {
    Motorcycle.findOne({ riderId: req.params.riderid }, function(err, motor) {
        if (err) {
            res.send(err)
        }
        res.json(motor)
    });
});


// BONUS 10 - Create a HTTP Request to to get the riders ranking


//
// End of the exercise
// ------------------------------------------------------------
// listen for requests
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});