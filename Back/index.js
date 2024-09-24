const express = require('express');
const morgan = require('morgan')
const database = require('./database')
const cors = require('cors')

//Config inicial
const app = express();
app.set('port', 4000);
app.listen(app.get('port'));
console.log(`escuchando en puerto ${app.get('port')}`)

//middleware
app.use(cors({
    origin:['http://127.0.0.1:5500','http://127.0.0.1:5501' ]
}))
app.use(morgan('dev'))

//Rutas
app.get('/pedidos', async (req, res)=>{
    const connection = await database.getConnection();
    const result = await connection.query('SELECT * from pedidos')
    res.json(result)
})

app.get('/clientes', async (req, res)=>{
    const connection = await database.getConnection();
    const result = await connection.query('SELECT * from clientes')
    res.json(result)
})

app.get('/productos', async (req, res)=>{
    const connection = await database.getConnection();
    const result = await connection.query('SELECT * from productos')
    res.json(result)
})

app.get('/usuarios', async (req, res)=>{
    const connection = await database.getConnection();
    const result = await connection.query('SELECT * from usuarios')
    res.json(result)
})

app.get('/detallespedido', async (req, res)=>{
    const connection = await database.getConnection();
    const result = await connection.query('SELECT * from detalles_pedido')
    res.json(result)
})