
// Using the library - like importing in python 
const express = require("express");
// launching the app 
const app = express(); 

app.use(express.json());
const client = require("./db");
client.connect(); 

// Setting up the port 
let port = process.env.PORT || 3000; 

app.get("/sum",(req, response)=>{
    const select_query = {
        name: 'fetch-numbers',
        text: 'SELECT SUM(number) FROM user_numbers'
    }
    client.query(select_query).then(res => {
        sum = res.rows[0].sum;
        response.send({sum});
    }).catch(e => console.log(e.stack));
   
})
app.post("/sum", (request, response)=>{
    const numberFromURL = request.body.number;
    // get the number from the request
    const insert_query = {
        name: 'insert-number',
        text: `INSERT INTO user_numbers(number) VALUES(${Number(numberFromURL)})`,
    }
    client.query(insert_query).then(res => {
        console.log("ADDED"); 
    }).catch(e => console.log(e.stack));

    const select_query = {
        name: 'fetch-numbers',
        text: 'SELECT SUM(number) FROM user_numbers'
    }
    client.query(select_query).then(res => {
        sum = res.rows[0].sum;
        response.json({"sum": sum});
    }).catch(e => console.log(e.stack));
    
    
})


app.listen(port, ()=>{
    console.log('Server is running on port ' + port);
}); 
