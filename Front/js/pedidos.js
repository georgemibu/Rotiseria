//OBTENER PRODUCTOS DESDE LA API
async function obtenerProductos(){
    try {
        const respuesta = await fetch('http://localhost:4000/productos');
        console.log(respuesta)
        if (!respuesta.ok) {
            throw new Error('Error al obtener los productos');
        }
        const productos = await respuesta.json();
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
    const productos = await obtenerProductos();
    if (productos){
        generarOpciones(productos)
    }
})


//SUMAR PEDIDOS
const productosSeleccionados = [];

        function agregarProducto() {
            const producto = document.getElementById('producto').value;
            const cantidad = document.getElementById('cantidad').value;
            const horario = document.getElementById('hora').value;


            productosSeleccionados.push({ producto, cantidad, horario });
            mostrarResumen();
        }

        function mostrarResumen() {
            const resumenDiv = document.getElementById('resumen');
            resumenDiv.innerHTML = '<h4>Resumen del Pedido:</h4>';
            productosSeleccionados.forEach(item => {
                resumenDiv.innerHTML += `<p>Cantidad: ${item.cantidad} x ${item.producto}</p> <p>Precio: PRECIO</p><hr>`;
            });

            // Abrir el modal
            document.getElementById('pedidoModal').style.display = 'block';
        }

        function cerrarModal() {
            document.getElementById('pedidoModal').style.display = 'none';
        }

        function enviarPedido() {
            alert('Pedido enviado con éxito!');
            // Aquí puedes implementar la lógica para enviar los datos a tu servidor
            limpiarFormulario();
            cerrarModal();
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



