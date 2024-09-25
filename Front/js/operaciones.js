document.getElementById('clienteForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evita el envío del formulario

    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;
    const direccion = document.getElementById('direccion').value;

    //enviar los datos a tu servidor o procesarlos 
    const nuevoCliente = {
        nombre: nombre,
        telefono: telefono,
        direccion: direccion
    }


    const response = await fetch('http://localhost:4000/api/nuevocliente', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Indicamos que estamos enviando JSON
        },
        body: JSON.stringify(nuevoCliente) // Convertimos el objeto a JSON
    })

    console.log(response)


    // Restablecer el formulario
    this.reset();
});

function verRegistro() {
    // Lógica para ver registros 
    console.log('Ver registro de clientes...');
    alert('Función para ver registros no implementada.');
}


function eliminarCliente() {
    // Lógica para eliminar cliente 
    console.log('Eliminar cliente...');
    alert('Función para eliminar cliente no implementada.');
}

