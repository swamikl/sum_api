// getting access to the db 

const { Client } = require('pg')

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

const client = new Client(cred);
module.exports = client;