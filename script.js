document.addEventListener("DOMContentLoaded", () => {
  // Seleccionar elementos del menú desplegable
  const menuToggle = document.querySelector(".menu-toggle");
  const menu = document.querySelector(".menu");

  // Funcionalidad del menú desplegable
  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active"); // Alternar la clase 'active' en el menú
    menuToggle.classList.toggle("active"); // Alternar la clase 'active' en el botón
  });

  // Cerrar el menú al hacer clic en un enlace (opcional)
  menu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("active"); // Cerrar el menú
      menuToggle.classList.remove("active"); // Restaurar el botón
    });
  });

  // Funcionalidad de filtrado por categoría
  const enlacesCategorias = document.querySelectorAll(".menu a[data-categoria]");
  const productos = document.querySelectorAll(".producto");

  enlacesCategorias.forEach(enlace => {
    enlace.addEventListener("click", (event) => {
      event.preventDefault(); // Evitar el comportamiento predeterminado del enlace

      const categoriaSeleccionada = enlace.dataset.categoria; // Obtener la categoría seleccionada

      // Mostrar u ocultar productos según la categoría
      productos.forEach(producto => {
        const categoriaProducto = producto.dataset.categoria;

        if (categoriaSeleccionada === "todos" || categoriaProducto === categoriaSeleccionada) {
          producto.style.display = "block"; // Mostrar el producto
        } else {
          producto.style.display = "none"; // Ocultar el producto
        }
      });
    });
  });

  // Resto del código JavaScript (funcionalidades del catálogo)
  const colores = document.querySelectorAll(".color"); // Selecciona todos los elementos de color
  const tallas = document.querySelectorAll(".talla"); // Selecciona todos los elementos de talla

  // Variables para almacenar los valores seleccionados
  let colorSeleccionado = null;
  let tallaSeleccionada = null;

  // Modal
  const modal = document.getElementById("modal");
  const modalNombre = document.getElementById("modal-nombre");
  const modalImagen = document.getElementById("modal-imagen");
  const modalPrecio = document.getElementById("modal-precio");
  const modalColores = document.getElementById("modal-colores");
  const modalTallas = document.getElementById("modal-tallas");
  const botonCerrar = document.querySelector(".cerrar");

  // Modal de advertencia
  const modalAdvertencia = document.getElementById("modal-advertencia");
  const mensajeAdvertencia = document.getElementById("mensaje-advertencia");

  // Cambiar imagen y color seleccionado
  colores.forEach(color => {
    color.addEventListener("click", event => {
      // Resaltar color seleccionado
      colores.forEach(c => c.classList.remove("seleccionado"));
      event.target.classList.add("seleccionado");

      colorSeleccionado = event.target; // Guardar el color seleccionado
      const nuevoColor = event.target.dataset.color; // Obtiene el color seleccionado
      const nuevaImagen = event.target.dataset.imagen; // Obtiene la nueva imagen

      // Encuentra el producto relacionado y cambia la imagen
      const producto = event.target.closest(".producto"); // Encuentra el producto más cercano
      const imagenProducto = producto.querySelector(".imagen-producto");

      if (imagenProducto && nuevaImagen) {
        imagenProducto.src = nuevaImagen; // Actualiza la imagen
        imagenProducto.alt = `Conjunto en color ${nuevoColor}`; // Actualiza el texto alternativo
      } else {
        console.error("No se encontró la imagen o color para este producto."); // Log de error
      }
    });
  });

  // Resaltar talla seleccionada en el modal
  tallas.forEach(talla => {
    talla.addEventListener("click", event => {
      // Resaltar talla seleccionada
      tallas.forEach(t => t.classList.remove("seleccionado"));
      event.target.classList.add("seleccionado");

      tallaSeleccionada = event.target; // Guardar la talla seleccionada
    });
  });

 // Agregar la funcionalidad para abrir el modal con los detalles del producto
const botonesVerDetalle = document.querySelectorAll(".ver-detalle");

botonesVerDetalle.forEach(boton => {
  boton.addEventListener("click", () => {
    // Si no se ha seleccionado color o talla, mostrar el modal de advertencia
    if (!colorSeleccionado || !tallaSeleccionada) {
      mensajeAdvertencia.textContent = "Por favor, selecciona tanto un color como una talla para continuar.";
      modalAdvertencia.style.display = "flex";
      return;
    }

    // Encuentra el producto relacionado
    const producto = boton.closest(".producto");
    const nombreProducto = producto.querySelector("h3").textContent;
    const imagenProducto = producto.querySelector(".imagen-producto").src;
    const precioProducto = producto.querySelector(".precio-descuento").textContent;

    // Obtener la imagen adicional relacionada con el color seleccionado
    const imagenAdicional = colorSeleccionado.dataset.imagenAdicional;

    // Actualiza los detalles del modal
    modalNombre.textContent = nombreProducto;
    modalImagen.src = imagenProducto;
    modalImagen.alt = nombreProducto;
    modalPrecio.textContent = `Precio: ${precioProducto}`;

    // Mostrar la nueva imagen adicional
    const modalImagenAdicional = document.getElementById("modal-imagen-adicional");
    modalImagenAdicional.src = imagenAdicional;
    modalImagenAdicional.style.display = "block"; // Mostrar la imagen adicional

    // Limpiar y agregar los colores seleccionados al modal
    modalColores.innerHTML = '';
    const coloresProducto = producto.querySelectorAll(".color");
    coloresProducto.forEach(color => {
      const colorButton = document.createElement("button");
      colorButton.classList.add("color", color.classList[1]);
      colorButton.dataset.color = color.dataset.color;
      modalColores.appendChild(colorButton);
    });

    // Limpiar y agregar las tallas seleccionadas al modal
    modalTallas.innerHTML = '';
    const tallasProducto = producto.querySelectorAll(".talla");
    tallasProducto.forEach(talla => {
      const tallaButton = document.createElement("button");
      tallaButton.classList.add("talla");
      tallaButton.textContent = talla.textContent;
      tallaButton.dataset.talla = talla.dataset.talla;
      modalTallas.appendChild(tallaButton);
    });

    // Resaltar el color seleccionado previamente en el modal
    if (colorSeleccionado) {
      const colorModal = Array.from(modalColores.children).find(c => c.dataset.color === colorSeleccionado.dataset.color);
      if (colorModal) colorModal.classList.add("seleccionado");
    }

    // Resaltar la talla seleccionada previamente en el modal
    if (tallaSeleccionada) {
      const tallaModal = Array.from(modalTallas.children).find(t => t.dataset.talla === tallaSeleccionada.dataset.talla);
      if (tallaModal) tallaModal.classList.add("seleccionado");
    }

    // Muestra el modal
    modal.style.display = "flex";
  });
});

  // Cerrar el modal al hacer clic en la "X"
  botonCerrar.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Cerrar el modal de advertencia al hacer clic en la "X"
  const botonCerrarAdvertencia = modalAdvertencia.querySelector(".cerrar");
  botonCerrarAdvertencia.addEventListener("click", () => {
    modalAdvertencia.style.display = "none";
  });

  // Cerrar el modal si se hace clic fuera del contenido del modal
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
    if (event.target === modalAdvertencia) {
      modalAdvertencia.style.display = "none";
    }
  });

  // Enviar por WhatsApp
  const botonEnviarWhatsApp = document.getElementById("enviar-whatsapp");

  botonEnviarWhatsApp.addEventListener("click", () => {
    const mensaje = `¡Hola! Estoy interesado en el producto "${modalNombre.textContent}" de color ${colorSeleccionado.dataset.color} y talla ${tallaSeleccionada.dataset.talla}. ¿Podrías darme más detalles?`;
    const numeroWhatsApp = "+573174653280";
    const enlaceWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
    
    window.open(enlaceWhatsApp, "_blank");
  });
});