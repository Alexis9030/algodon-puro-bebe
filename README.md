**Algodón Puro Bebé** es una tienda de ropa para bebés que ofrece productos 100% de algodón, diseñados para brindar suavidad y comodidad a los más pequeños. Este proyecto forma parte del proyecto integrador del curso **Front-End JS** de Talento Tech.

---

## 📂 Estructura del Proyecto

La página está organizada en las siguientes secciones:

- **Header 🧸:** Contiene el nombre de la tienda, un breve mensaje sobre la propuesta y un carrito con contador dinámico.
- **Carrusel de Texto 🎡:** Un carrusel que muestra mensajes promocionales sobre descuentos y beneficios.
- **Navegación (nav) 🔗:** Menú de navegación que permite moverse entre las páginas de productos, ofertas, reseñas y contacto.
- **Main 🛍️:**
  - **Productos Destacados 👶:** Lista de productos principales con imagen, nombre, descripción y precio.
  - **Ofertas 💸:** Productos con descuentos especiales, resaltados en una sección específica.
  - **Fetch API 📦:** Productos dinámicos obtenidos de la [Fake Store API](https://fakestoreapi.com/) y mostrados como una galería en la sección "Ofertas Especiales".
  - **Formulario de Suscripción 💌:** Permite a los usuarios registrarse para recibir noticias, promociones y novedades.
- **Footer 📬:** Información de contacto, métodos de pago y envío, y enlaces a redes sociales.

---

## 🛠️ Tecnologías Utilizadas

- **HTML5 🌐:** Estructura semántica de la página.
- **CSS3 🎨:** Diseño visual y responsividad.
- **JavaScript ES6 ⚙️:** Funcionalidad dinámica del carrito, interacción con APIs y validaciones.
- **Google Fonts ✍️:** Tipografía personalizada para el diseño.
- **Flexbox 📐:** Organización y alineación de elementos de la página.
- **Fake Store API 📦:** Para obtener productos de ejemplo y mostrarlos dinámicamente.

---

## ⚡ Funcionalidades Dinámicas (JavaScript)

### 🛒 Carrito de Compras Dinámico
- Los usuarios pueden agregar, editar o eliminar productos del carrito.
- Los datos del carrito se almacenan en **localStorage**, lo que asegura persistencia incluso si se recarga o cierra la página.
- Contador dinámico que muestra la cantidad total de productos en tiempo real.
- Calculadora de precio total que se actualiza al modificar el carrito.
- Opción de finalizar la compra, mostrando un mensaje de éxito y vaciando el carrito.

### 🔍 Integración con Fetch API
- La página obtiene productos dinámicamente desde la [Fake Store API](https://fakestoreapi.com/).
- Los productos se muestran como tarjetas con imagen, título, precio y descripción.
- Diseño responsivo para asegurar una visualización adecuada en cualquier dispositivo.

### 📋 Validación de Formularios
- Formulario de suscripción validado para campos requeridos: nombre, correo electrónico y mensaje.
- Mensaje de confirmación dinámico tras el envío exitoso.

---

## 📱 Responsividad

- La página está completamente adaptada para dispositivos móviles, tabletas y computadoras.
- Utiliza **media queries** para ajustar el diseño según el tamaño de pantalla.

---

## 📋 Formularios

### Formulario de Suscripción 💌
- Ubicado en la sección "Únete a la Familia".
- Permite a los usuarios registrarse para recibir noticias y promociones.
- Incluye validación de campos y muestra un mensaje de confirmación.

### Formulario de Contacto 📞
- Ubicado en el footer.
- Los usuarios pueden enviar consultas o pedidos especiales.

---

## 🚀 Cómo Ejecutar el Proyecto

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/algodon-puro-bebe.git
