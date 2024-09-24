const dotenv = require(`dotenv`);
dotenv.config();

const mysql = require('promise-mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    database: 'rotiseria',
    user:'root',
    password:'1234'
})

const getConnection = async ()=> await connection;

module.exports= {
    getConnection
}
