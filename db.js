// 
const { Pool } = require('pg')

// credentials for accessing the database 
const cred = {
    user: 'iuoxghhtpufxzs',
    host: 'ec2-52-200-188-218.compute-1.amazonaws.com',
    database: 'ddkaidsotfi41e',
    password: 'a11008aea192507006a00bec3a31c6b4143c9bf97c718270e0263f011081dfae',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
}

const pool = new Pool(cred); 

const getSum = (request, response) => {
    // destructuring the request to get the num param 
    const {number} = request.body; 

    // If there is number 
    if(number){
        // query to add the number to the database 
        const insert_query = {
            name: 'insert-number',
            text: `INSERT INTO user_numbers(number) VALUES(${Number(number)})`,
        }
        // Attempting to add number to database 
        pool.query(insert_query, (err, result) => {
          if(err){
              response.status(500).send({"message": "Error inserting number, please try again"})
          } else {
            // no err in adding to database, so now fetch the sum 
             const select_query = {
                name: 'fetch-numbers',
                text: 'SELECT SUM(number) FROM user_numbers'
            }
            // returns err if failed, the sum if there is no err
            pool.query(select_query, (err, result) => {
                if (err) {
                    response.status(500).send({"message": "Error fetching numbers, please try again"})
                }else{
                    const sum = result.rows[0].sum;
                    response.status(200).send({"message": `${Number(number)} inserted successfully`, "sum": Number(sum)})
                }
            })
          }
        })
    // if they did not put a number 
    } else {
        response.status(400).send({"message": "Please pass a number as a post body"})
    }

    
    
}

// exporting the function 
module.exports = {
    getSum
}