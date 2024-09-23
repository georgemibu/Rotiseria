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

