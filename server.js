const express = require('express');
const mongoose = require('mongoose');
const path = require('path')

const PORT = process.env.PORT || 3304;
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static(path.join(__dirname,'./public')))

mongoose.connect('mongodb://localhost/kudos', {useNewUrlParser: true});

require ('./routes/api-routes')(app);
require ('./routes/html-routes')(app);

app.listen(PORT, function() {
    console.log(`App is listening on PORT ${PORT}`);
})