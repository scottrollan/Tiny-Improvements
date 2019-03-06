const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
// const MONGODB_URI = require('./config/keys.js')

const PORT = process.env.PORT || 3304;
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static(path.join(__dirname,'./public')))
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost/kudos'
//Set up promises with mongoose
mongoose.Promise = global.Promise;
//Connect to the Mongo DB
mongoose.connect(
    MONGODB_URI, {useNewUrlParser: true});

require ('./routes/api-routes')(app);
require ('./routes/html-routes')(app);

app.listen(PORT, function() {
    console.log(`App is listening on PORT ${PORT}`);
})