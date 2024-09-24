
async function getPedidos(){
    const res = await fetch('http://localhost:4000/pedidos');
    const resJson = await res.json();
    return resJson;
}

console.log(getPedidos())


async function getClientes(){
    const res = await fetch('http://localhost:4000/clientes');
    const resJson = await res.json();
    return resJson;
}
console.log(getClientes())

async function getProductos(){
    const res = await fetch('http://localhost:4000/productos');
    const resJson = await res.json();
    return resJson;
}

console.log(getProductos())

async function getUsuarios(){
    const res = await fetch('http://localhost:4000/usuarios');
    const resJson = await res.json();
    return resJson;
}

console.log(getUsuarios())


async function getDetallesPedido(){
    const res = await fetch('http://localhost:4000/detallespedido');
    const resJson = await res.json();
    return resJson;
}

console.log(getDetallesPedido())