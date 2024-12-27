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

                    finalizarCompraBtn.style.display = "none";

                    localStorage.clear();
                    carrito = [];
                    actualizarContadorCarrito();
                    mostrarCarrito();
                }, 2000);
            }
        });
    }

    const registroForm = document.getElementById("registro-form");
    const mensajeConfirmacion = document.getElementById("mensaje-confirmacion");

    if (registroForm && mensajeConfirmacion) {
        registroForm.addEventListener("submit", (e) => {
            e.preventDefault();
            mensajeConfirmacion.style.display = "block";
            registroForm.reset();
        });
    }

    // Cargar productos desde la API usando Fetch
    const apiProductsContainer = document.getElementById("api-products");
    if (apiProductsContainer) {
        apiProductsContainer.innerHTML = `<p id="loading-message">Cargando productos...</p>`;
        const loadingMessage = document.getElementById("loading-message");

        fetch("https://fakestoreapi.com/products?limit=4")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error en la respuesta de la API");
                }
                return response.json();
            })
            .then((data) => {
                loadingMessage.style.display = "none"; 

                data.forEach((product) => {
                    const productCard = document.createElement("div");
                    productCard.className = "product-card";

                    productCard.innerHTML = `
                        <img src="${product.image}" alt="${product.title}" style="width: 100%; height: auto;">
                        <h3>${product.title}</h3>
                        <p>Precio: $${product.price}</p>
                        <p>${product.description}</p>
                        <button class="buy-button" data-producto="${product.title}" data-precio="${product.price}" data-imagen="${product.image}">Comprar</button>
                    `;

                    apiProductsContainer.appendChild(productCard);
                });

                apiProductsContainer.addEventListener("click", (e) => {
                    if (e.target.classList.contains("buy-button")) {
                        const boton = e.target;
                        const nombre = boton.dataset.producto;
                        const precio = parseFloat(boton.dataset.precio);
                        const imagen = boton.dataset.imagen;

                        if (nombre && precio && imagen) {
                            agregarAlCarrito(nombre, precio, imagen);
                            alert(`${nombre} fue agregado al carrito.`);
                        } else {
                            console.error("Datos del producto faltantes en el botón.");
                        }
                    }
                });
            })
            .catch((error) => {
                console.error("Error al cargar los productos desde la API:", error);
                apiProductsContainer.innerHTML = `<p>Hubo un problema al cargar los productos sugeridos. Intenta nuevamente más tarde.</p>`;
            });
    }

    document.body.addEventListener("click", (e) => {
        if (e.target.classList.contains("buy-button") || e.target.classList.contains("buy-now-button")) {
            const boton = e.target;
            const nombre = boton.dataset.producto;
            const precio = parseFloat(boton.dataset.precio);
            const imagen = boton.dataset.imagen;

            if (nombre && precio && imagen) {
                agregarAlCarrito(nombre, precio, imagen);
                alert(`${nombre} fue agregado al carrito.`);
            } else {
                console.error("Datos del producto faltantes en el botón.");
            }
        }
    });
});


