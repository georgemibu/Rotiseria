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
app.use(express.json());
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



//SOLICITUD POST PEDIDOS
// SOLICITUD POST PEDIDOS
app.post('/api/pedidos', async (req, res) => {
    const connection = await database.getConnection();
    console.log(req.body); // Para depuración

    const { nombre, telefono, hora, productos } = req.body;
    console.log(nombre, telefono, hora, productos)
    // Validar que los datos estén completos
    if (!nombre || !telefono || !hora || !productos || productos.length === 0) {
        return res.status(400).json({ error: 'Por favor, completa todos los campos' });
    }

    try {
        // 1. Verificar si el cliente ya existe, si no, crear uno nuevo
        const sqlCliente = `SELECT id_cliente FROM clientes WHERE telefono = ?`;
        const clientes = await connection.query(sqlCliente, [telefono]);

        let idCliente;
        if (clientes.length > 0) {
            idCliente = clientes[0].id_cliente; // Cliente existente
        } else {
            // Crear un nuevo cliente
            const sqlNuevoCliente = `INSERT INTO clientes (nombre, telefono) VALUES (?, ?)`;
            const resultCliente = await connection.query(sqlNuevoCliente, [nombre, telefono]);
            idCliente = resultCliente.insertId; // Obtener nuevo id_cliente
        }

        // 2. Crear el pedido
        const total = productos.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);
        const sqlPedido = `
            INSERT INTO Pedidos (id_cliente, horario_pedido, estado, total)
            VALUES (?, ?, 'pendiente', ?)
        `;
        const valuesPedido = [idCliente, hora, total];
        const resultPedido = await connection.query(sqlPedido, valuesPedido);
        const idPedido = resultPedido.insertId; // Obtener nuevo id_pedido

        // 3. Insertar detalles del pedido
        const sqlDetalles = `
        INSERT INTO detalles_pedido (id_pedido, id_producto, cantidad) 
        VALUES (?, ?, ?)
    `;
    const detallesPromises = productos.map(prod => {
        return connection.query(sqlDetalles, [idPedido, prod.id_producto, prod.cantidad]);
    });
        await Promise.all(detallesPromises); // Esperar a que se inserten todos los detalles

        res.status(201).json({ mensaje: 'Pedido guardado correctamente', pedidoId: idPedido });
    } catch (err) {
        console.error('Error al insertar el pedido en la base de datos:', err);
        return res.status(500).json({ error: 'Error al guardar el pedido' });
    } finally {
        connection.release(); // Liberar la conexión
    }
});
