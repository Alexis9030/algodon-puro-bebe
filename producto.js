// Lista de productos
const productos = [
    { id: "id1", nombre: "Body + Short", precio: 5500, descripcion: "Talles 00 y 0, desde recién nacido hasta los 6 meses.", imagen: "imagenes/short1.jpg" },
    { id: "id2", nombre: "Ranitas", precio: 5200, descripcion: "Talles 00 al 2, desde recién nacido hasta el año y medio.", imagen: "imagenes/ranita1.jpg" },
    { id: "id3", nombre: "Ajuares", precio: 7500, descripcion: "Talles 00, 0 y 1, ideales para el primer mes del bebé.", imagen: "imagenes/set1.jpg" },
    { id: "id4", nombre: "Mantas", precio: 15800, descripcion: "Mantas suaves y abrigadas, perfectas para cualquier temporada.", imagen: "imagenes/manta1.jpg" },
    { id: "id5", nombre: "Babitas Estampadas", precio: 1000, descripcion: "Doble algodón, terminación borde con picot. Ideal para acompañar al bebé en cada momento.", imagen: "imagenes/babita1.jpg" },
];

function obtenerIdDesdeUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

function cargarDetalleProducto() {
    const idProducto = obtenerIdDesdeUrl();
    const producto = productos.find(p => p.id === idProducto);

    if (!producto) {
        alert("Producto no encontrado");
        window.location.href = "index.html";
        return;
    }

    document.getElementById("producto-nombre").textContent = producto.nombre;
    document.getElementById("producto-descripcion").textContent = producto.descripcion;
    document.getElementById("producto-precio").textContent = `${producto.precio}`;
    document.getElementById("producto-imagen").src = producto.imagen;
}

function agregarAlCarritoDesdeDetalle() {
    const idProducto = obtenerIdDesdeUrl();
    const producto = productos.find(p => p.id === idProducto);

    if (producto) {
        agregarAlCarrito(producto.nombre, producto.precio, producto.imagen);
        alert(`${producto.nombre} fue agregado al carrito.`);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes("producto.html")) {
        cargarDetalleProducto();
    }
});
