
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


function agregarAlCarrito(nombre, precio, imagen) {
    precio = parseFloat(precio); 
    const productoExistente = carrito.find((prod) => prod.nombre === nombre);

    if (productoExistente) {
        productoExistente.cantidad += 1; 
    } else {
        carrito.push({ nombre, precio, cantidad: 1, imagen }); 
    }

    localStorage.setItem("carrito", JSON.stringify(carrito)); 
    actualizarContadorCarrito();
}


function actualizarContadorCarrito() {
    const contador = document.getElementById("contador-carrito");
    if (contador) {
        contador.textContent = carrito.reduce((acc, prod) => acc + prod.cantidad, 0);
    }
}

function mostrarCarrito() {
    const carritoContenedor = document.getElementById("carrito-contenedor");
    const carritoTotal = document.getElementById("carrito-total");

    if (!carritoContenedor) {
        console.error("El contenedor del carrito no existe");
        return;
    }

    carritoContenedor.innerHTML = "";

    carrito.forEach((producto, index) => {
        const precio = producto.precio || 0; 
        const productoHTML = `
            <div class="carrito-producto">
                <img src="${producto.imagen}" alt="${producto.nombre}" class="carrito-imagen">
                <div class="carrito-detalles">
                    <h3>${producto.nombre}</h3>
                    <p>Precio: $${precio.toFixed(2)}</p>
                    <p>Cantidad: 
                        <button class="btn-cantidad" onclick="editarCantidad(${index}, -1)">-</button>
                        ${producto.cantidad}
                        <button class="btn-cantidad" onclick="editarCantidad(${index}, 1)">+</button>
                    </p>
                    <button class="btn-eliminar" onclick="eliminarProducto(${index})">Eliminar</button>
                </div>
            </div>
        `;
        carritoContenedor.innerHTML += productoHTML;
    });

    const total = carrito.reduce((acc, prod) => acc + (prod.precio || 0) * prod.cantidad, 0); 
    if (carritoTotal) carritoTotal.textContent = total.toFixed(2);
}



function editarCantidad(index, cantidad) {
    const producto = carrito[index];

    if (producto) {
        producto.cantidad += cantidad;
        if (producto.cantidad <= 0) {
            eliminarProducto(index);
        }
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
    actualizarContadorCarrito();
}


function eliminarProducto(index) {
    carrito.splice(index, 1);

    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarCarrito();
    actualizarContadorCarrito();
}

document.addEventListener("DOMContentLoaded", () => {
    actualizarContadorCarrito();
    mostrarCarrito();

    // Manejo del botón de finalizar compra
    const finalizarCompraBtn = document.getElementById("finalizar-compra");
    if (finalizarCompraBtn) {
        finalizarCompraBtn.addEventListener("click", () => {
            const spinner = document.getElementById("spinner");
            const mensajeFinalizado = document.getElementById("mensaje-finalizado");
            const totalCompra = carrito.reduce((acc, prod) => acc + prod.precio * prod.cantidad, 0).toFixed(2);
            const carritoTotal = document.getElementById("carrito-total");

            if (spinner && mensajeFinalizado) {
                spinner.style.display = "block";

                setTimeout(() => {
                    spinner.style.display = "none";
                    mensajeFinalizado.innerHTML = `¡Compra finalizada con éxito! Total pagado: $${totalCompra}`;
                    mensajeFinalizado.style.display = "block";

                    if (carritoTotal) {
                        carritoTotal.parentElement.style.display = "none";
                    }

                    localStorage.clear();
                    carrito = [];
                    actualizarContadorCarrito();
                    mostrarCarrito();
                }, 2000);
            }
        });
    }

    // Manejo del formulario de registro
    const registroForm = document.getElementById("registro-form");
    const mensajeConfirmacion = document.getElementById("mensaje-confirmacion");

    if (registroForm && mensajeConfirmacion) {
        registroForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Evitar el envío por defecto del formulario

            // Mostrar el mensaje de confirmación
            mensajeConfirmacion.style.display = "block";

            // Limpiar los campos del formulario
            registroForm.reset();
        });
    }

    // Cargar productos desde la API usando Fetch
    const apiProductsContainer = document.getElementById("api-products");
    if (apiProductsContainer) {
        fetch("https://fakestoreapi.com/products?limit=4")
            .then((response) => response.json())
            .then((data) => {
                data.forEach((product) => {
                    const productCard = document.createElement("div");
                    productCard.className = "product-card";

                    productCard.innerHTML = `
                        <div class="image-container cargando">
                            <img src="${product.image}" alt="${product.title}" onload="this.parentElement.classList.remove('cargando')" style="width: 100%; height: auto;">
                        </div>
                        <h3>${product.title}</h3>
                        <p>Precio: $${product.price}</p>
                        <p>${product.description}</p>
                    `;

                    apiProductsContainer.appendChild(productCard);
                });
            })
            .catch((error) => console.error("Error fetching API:", error));
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const apiProductsContainer = document.getElementById("api-products");

    if (apiProductsContainer) {
        fetch("https://fakestoreapi.com/products?limit=4")
            .then((response) => response.json())
            .then((data) => {
                data.forEach((product) => {
                    const productCard = document.createElement("div");
                    productCard.className = "product-card";

                    productCard.innerHTML = `
                        <img src="${product.image}" alt="${product.title}" style="width: 100%; height: auto;">
                        <h3>${product.title}</h3>
                        <p>Precio: $${product.price}</p>
                        <p>${product.description}</p>
                    `;

                    apiProductsContainer.appendChild(productCard);
                });
            })
            .catch((error) => console.error("Error fetching API:", error));
    }
});


