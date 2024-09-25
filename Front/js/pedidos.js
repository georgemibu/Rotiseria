let productos = []; // Declara la variable productos a nivel global


//OBTENER PRODUCTOS DESDE LA API
async function obtenerProductos(){
    try {
        const respuesta = await fetch('http://localhost:4000/productos');
        console.log(respuesta)
        if (!respuesta.ok) {
            throw new Error('Error al obtener los productos');
        }
        productos = await respuesta.json(); // Asigna directamente al array global
        return productos;
    } catch {
        console.log("Error")
    }

}
console.log(obtenerProductos())


//FUNCION PARA GENERAR LAS OPCIONES EN EL SELECT
function generarOpciones(productos){
    const selectProducto = document.getElementById('producto');
    //limpiar opciones existentes
    selectProducto.innerHTML ='';
    //Crear la opcion de cada producto obtenido
    productos.forEach(producto=>{
        const option = document.createElement('option');
        option.value = producto.id_producto;
        option.textContent = producto.nombre;
        selectProducto.appendChild(option)
    })
}

//CARGAR CUANDO CARGUE EL DOM
document.addEventListener('DOMContentLoaded', async ()=>{
    await obtenerProductos(); // Espera a que los productos se carguen
    if (productos.length > 0) {
        generarOpciones(productos);
    } else {
        console.log('No se encontraron productos');
    }
})


//SUMAR PEDIDOS
const productosSeleccionados = [];

        function agregarProducto() {
            const nombre = document.getElementById('nombre').value;
            const direccion = document.getElementById('direccion').value;
            const telefono = document.getElementById('telefono').value;
            const hora = document.getElementById('hora').value;
            const productoId = document.getElementById('producto').value; // ID del producto seleccionado
            const cantidad = parseInt(document.getElementById('cantidad').value, 10); // Asegúrate de que sea un número
        
            // Busca el producto correspondiente para obtener el precio
            console.log('productoId:', productoId, 'productos:', productos);
            const productoSeleccionado = productos.find(prod => prod.id_producto === Number(productoId)); // Convierte productoId a número
        
            if (productoSeleccionado) {
                const { nombre: nombreProducto, precio } = productoSeleccionado; // Obtén el nombre y el precio
        
                productosSeleccionados.push({ nombre, direccion, telefono, hora, id_producto: productoId, cantidad, precio: precio });
                mostrarResumen();
            } else {
                console.error('Producto no encontrado', { productoId, productos }); // Agrega más información para depuración
            }
        }

        function mostrarResumen() {
            const resumenDiv = document.getElementById('resumen');
            resumenDiv.innerHTML = '<h4>Resumen del Pedido:</h4>';
            productosSeleccionados.forEach(item => {
                resumenDiv.innerHTML += `<p>Nombre: ${item.nombre}</p>
                    <p>Dirección: ${item.direccion}</p>
                    <p>Telefono: ${item.telefono}</p>
                    <p>Hora: ${item.hora}</p>
                    <p>Cantidad: ${item.cantidad} x ${item.id_producto}</p>
                    <p>Precio: ${item.precio}</p><hr>`;
            });
        
            // Abrir el modal
            document.getElementById('pedidoModal').style.display = 'block';
        }

        function cerrarModal() {
            document.getElementById('pedidoModal').style.display = 'none';
        }

        async function enviarPedido() {
            const nombre = document.getElementById('nombre').value;
            const direccion = document.getElementById('direccion').value;
            const telefono = document.getElementById('telefono').value;
            const hora = parseInt(document.getElementById('hora').value, 10); // Convertir a entero
            const productoId = document.getElementById('producto').value; // Agregar esta línea para obtener el id del producto
        
            const productoSeleccionado = productos.find(prod => prod.id_producto === Number(productoId)); // Convierte productoId a número
        
            if (productoSeleccionado) {
                const { nombre: nombreProducto, precio } = productoSeleccionado; // Obtén el nombre y el precio
        
                productosSeleccionados.push({ 
                    nombre, 
                    direccion, 
                    telefono, 
                    hora, 
                    id_producto: productoId, 
                    cantidad, 
                    precio 
                });
                mostrarResumen();
            } else {
                console.error('Producto no encontrado', { productoId, productos }); // Agrega más información para depuración
            }
        
            const pedidoData = {
                nombre: nombre,
                direccion: direccion,
                telefono: telefono,
                hora: hora,
                productos: productosSeleccionados // Cambiado a un arreglo de productos
            };
        
            console.log("Datos a enviar:", pedidoData);
            
            try {
                const response = await fetch('http://localhost:4000/api/pedidos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json' // Indicamos que estamos enviando JSON
                    },
                    body: JSON.stringify(pedidoData) // Convertimos el objeto a JSON
                });
        
                console.log("Status code:", response.status); // Verificar el status code
        
                // Verificar si el contenido es JSON
                if (response.headers.get('content-type')?.includes('application/json')) {
                    const resultado = await response.json();
                    console.log("JSON response:", resultado);
                } else {
                    console.log("Response is not JSON:", await response.text());
                }
        
                if (!response.ok) {
                    throw new Error('Error al enviar el pedido');
                }
        
                alert('Pedido enviado con éxito!');
        
                limpiarFormulario();
                cerrarModal();
        
            } catch (error) {
                console.error('Hubo un problema con la solicitud:', error.message);
                alert('Hubo un error al enviar el pedido. Por favor, intenta de nuevo.');
            }
        }
        
        
        function limpiarFormulario() {
            document.getElementById('pedidoForm').reset();
            productosSeleccionados.length = 0; // Limpiar el array
            document.getElementById('resumen').innerHTML = ''; // Limpiar resumen
            cerrarModal();
        }

        // Cerrar el modal si se hace clic fuera de él
        window.onclick = function(event) {
            const modal = document.getElementById('pedidoModal');
            if (event.target === modal) {
                cerrarModal();
            }
        };

// CALENDARIO
const pedidosData = {
    '2024-09-21': [
        { cliente: 'Juan Pérez', productos: 'Pollo al horno', cantidad: 1, estado: 'entregado' },
        { cliente: 'María López', productos: 'Empanadas', cantidad: 3, estado: 'pendiente' }
    ],
    '2024-09-22': [
        { cliente: 'Pedro González', productos: 'Pizza', cantidad: 2, estado: 'en preparación' }
    ]
};


document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');

    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        dateClick: function(info) {
            // Mostrar los pedidos del día seleccionado
            mostrarPedidos(info.dateStr);
        }
    });

    calendar.render();
});


//MOSTRAR PEDIDOS
function mostrarPedidos(fecha) {
    const pedidosDiv = document.getElementById('pedidos');
    pedidosDiv.innerHTML = ''; // Limpiar pedidos anteriores

    const pedidos = pedidosData[fecha] || [];
    if (pedidos.length === 0) {
        pedidosDiv.innerHTML = '<p>No hay pedidos para esta fecha.</p>';
        return;
    }


    pedidos.forEach(pedido => {
        const card = document.createElement('div');
        card.className = 'pedido-card';
        card.innerHTML = `
            <h4>Cliente: ${pedido.cliente}</h4>
            <p>Productos: ${pedido.productos}</p>
            <p>Cantidad: ${pedido.cantidad}</p>
            <p>Estado: ${pedido.estado}</p>
        `;
        pedidosDiv.appendChild(card);
    });
    
}


//AÑADIR PEDIDO
