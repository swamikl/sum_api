
// to build the api 
const express = require('express');
const app = express();

// middlewhere to help with parsing json 
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./db');

let port = process.env.PORT || 3000;

// sum endpoint
// calls the function getSum from db as soon as we get a request at this end point 
app.post('/sum', db.getSum); 

// listen to the incoming requests 
app.listen(port, ()=>{
    console.log('Server is running on port ' + port);
});