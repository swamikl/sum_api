


// Using the library - like importing in python 
const express = require("express");
const dataBaseHandler = require('./databaseHandler'); 

// launching the app 
const app = express(); 

// Setting up the port 
let port = process.env.PORT || 3000; 

// calling the app on the above port 
app.listen(port, ()=>{
    console.log("Server is running on port " + port); 
}); 

// what the user sees, the home page
app.get("/", (req,res)=>{
    res.send("Hello this is from port"); 
})

app.get("/sum", (req,res)=>{
    console.log(req.query); 
    
    // get the number that they passed 
    const numFromURL = req.query?.num; 

    // check to see if a number was passed 
    if(isNaN(numFromURL)){
        res.send("You need to input an integer")
        return; 
    }

    if(numFromURL){
        dataBaseHandler.setNum(numFromURL); 
        const sum = dataBaseHandler.getSum(); 
        res.send(`Your number is ${numFromURL} and the sum is ${sum}`); 
    } else { 
        res.send("Please input a valid number")
    }

    // save the number to the postgress data base 

    // set data in postgress 

    // get the data from postgress 

    // return the sum of numbers in database 
})
