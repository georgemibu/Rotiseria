const express = require('express');
const morgan = require('morgan')
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
    console.log("Consulta de pedidos")

})