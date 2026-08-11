 const API_URL = "http://13.58.40.248/api/productos";

const formulario = document.getElementById("form-producto");
const contenedorProductos = document.getElementById("contenedor-productos");
const mensajeVacio = document.getElementById("mensaje-vacio");

const productoId = document.getElementById("producto-id");
const nombre = document.getElementById("nombre");
const marca = document.getElementById("marca");
const categoria = document.getElementById("categoria");
const presentacion = document.getElementById("presentacion");
const stockLleno = document.getElementById("stock-lleno");
const envasesVacios = document.getElementById("envases-vacios");
const precio = document.getElementById("precio");
const descripcion = document.getElementById("descripcion");

const btnGuardar = document.getElementById("btn-guardar");
const btnCancelar = document.getElementById("btn-cancelar");
const btnRecargar = document.getElementById("btn-recargar");


// ==========================================
// ELEMENTOS DE ESTADÍSTICAS
// ==========================================

const totalProductos = document.getElementById("total-productos");
const totalLlenos = document.getElementById("total-llenos");
const totalEnvases = document.getElementById("total-envases");


// ==========================================
// ICONOS POR CATEGORÍA
// ==========================================

function obtenerIcono(categoria) {

    switch (categoria) {

        case "Refresco":
            return "🥤";

        case "Agua":
            return "💧";

        case "Jugo":
            return "🧃";

        case "Energizante":
            return "⚡";

        default:
            return "🍹";
    }
}


// ==========================================
// CARGAR PRODUCTOS
// ==========================================

async function cargarProductos() {

    try {

        const respuesta = await fetch(API_URL);

        if (!respuesta.ok) {
            throw new Error("No se pudieron obtener los productos");
        }

        const productos = await respuesta.json();

        contenedorProductos.innerHTML = "";

        // ======================================
        // ESTADÍSTICAS
        // ======================================

        let cantidadLlenos = 0;
        let cantidadEnvases = 0;

        productos.forEach(producto => {

            cantidadLlenos += Number(producto.stock_lleno);

            cantidadEnvases += Number(producto.envases_vacios);

        });

        totalProductos.textContent = productos.length;

        totalLlenos.textContent = cantidadLlenos;

        totalEnvases.textContent = cantidadEnvases;


        // ======================================
        // SIN PRODUCTOS
        // ======================================

        if (productos.length === 0) {

            mensajeVacio.style.display = "block";

            return;

        }

        mensajeVacio.style.display = "none";


        // ======================================
        // CREAR TARJETAS
        // ======================================

        productos.forEach((producto, indice) => {

            const tarjeta = document.createElement("article");

            tarjeta.className = "producto-card";

            tarjeta.style.animationDelay = `${indice * 0.08}s`;


            // ==================================
            // NIVEL DE STOCK
            // ==================================

            let claseStock = "stock-normal";

            let textoStock = "Stock disponible";

            if (Number(producto.stock_lleno) === 0) {

                claseStock = "stock-agotado";

                textoStock = "Agotado";

            } else if (Number(producto.stock_lleno) < 20) {

                claseStock = "stock-bajo";

                textoStock = "Stock bajo";

            }


            tarjeta.innerHTML = `

                <div class="producto-top">

                    <div class="producto-icono">

                        ${obtenerIcono(producto.categoria)}

                    </div>

                    <span class="producto-categoria">

                        ${producto.categoria}

                    </span>

                </div>


                <div class="producto-info">

                    <h3>
                        ${producto.nombre}
                    </h3>

                    <p class="producto-marca">
                        ${producto.marca}
                    </p>

                    <p class="producto-presentacion">
                        📦 ${producto.presentacion}
                    </p>

                </div>


                <div class="producto-stock">

                    <div class="stock-box">

                        <span class="stock-icon">
                            🟢
                        </span>

                        <div>

                            <small>
                                Productos llenos
                            </small>

                            <strong>
                                ${producto.stock_lleno}
                            </strong>

                        </div>

                    </div>


                    <div class="stock-box">

                        <span class="stock-icon">
                            ♻️
                        </span>

                        <div>

                            <small>
                                Envases vacíos
                            </small>

                            <strong>
                                ${producto.envases_vacios}
                            </strong>

                        </div>

                    </div>

                </div>


                <div class="stock-status ${claseStock}">

                    <span></span>

                    ${textoStock}

                </div>


                <div class="producto-footer">

                    <div class="precio">

                        <small>
                            Precio
                        </small>

                        <strong>
                            L ${Number(producto.precio).toFixed(2)}
                        </strong>

                    </div>


                    <div class="acciones">

                        <button
                            class="btn-editar"
                            onclick='editarProducto(${JSON.stringify(producto)})'
                            title="Editar producto"
                        >
                            ✏️
                        </button>


                        <button
                            class="btn-eliminar"
                            onclick="eliminarProducto(${producto.id})"
                            title="Eliminar producto"
                        >
                            🗑️
                        </button>

                    </div>

                </div>


                ${
                    producto.descripcion
                    ?
                    `<p class="producto-descripcion">
                        ${producto.descripcion}
                    </p>`
                    :
                    ""
                }

            `;

            contenedorProductos.appendChild(tarjeta);

        });


    } catch (error) {

        console.error(error);

        alert(
            "No se pudo conectar con el servidor. " +
            "Verifica que el backend esté funcionando."
        );

    }
}


// ==========================================
// CREAR / ACTUALIZAR
// ==========================================

formulario.addEventListener("submit", async (evento) => {

    evento.preventDefault();


    const datos = {

        nombre: nombre.value.trim(),

        marca: marca.value.trim(),

        categoria: categoria.value.trim(),

        presentacion: presentacion.value.trim(),

        stock_lleno: Number(stockLleno.value),

        envases_vacios: Number(envasesVacios.value),

        precio: Number(precio.value),

        descripcion: descripcion.value.trim()

    };


    try {

        let respuesta;


        // ======================================
        // ACTUALIZAR
        // ======================================

        if (productoId.value) {

            respuesta = await fetch(
                `${API_URL}/${productoId.value}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(datos)
                }
            );

        }


        // ======================================
        // CREAR
        // ======================================

        else {

            respuesta = await fetch(
                API_URL,
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(datos)
                }
            );

        }


        const resultado = await respuesta.json();


        if (!respuesta.ok) {

            throw new Error(
                resultado.error || "Ocurrió un error"
            );

        }


        mostrarNotificacion(resultado.mensaje);

        limpiarFormulario();

        cargarProductos();


    } catch (error) {

        console.error(error);

        alert("Error: " + error.message);

    }

});


// ==========================================
// EDITAR PRODUCTO
// ==========================================

function editarProducto(producto) {

    productoId.value = producto.id;

    nombre.value = producto.nombre;

    marca.value = producto.marca;

    categoria.value = producto.categoria;

    presentacion.value = producto.presentacion;

    stockLleno.value = producto.stock_lleno;

    envasesVacios.value = producto.envases_vacios;

    precio.value = producto.precio;

    descripcion.value = producto.descripcion || "";


    document.getElementById(
        "titulo-formulario"
    ).textContent = "Editar producto";


    btnGuardar.textContent = "Actualizar producto";


    btnCancelar.classList.remove("oculto");


    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// ==========================================
// ELIMINAR PRODUCTO
// ==========================================

async function eliminarProducto(id) {

    const confirmar = confirm(
        "¿Estás seguro de que deseas eliminar este producto?"
    );


    if (!confirmar) {
        return;
    }


    try {

        const respuesta = await fetch(
            `${API_URL}/${id}`,
            {
                method: "DELETE"
            }
        );


        const resultado = await respuesta.json();


        if (!respuesta.ok) {

            throw new Error(
                resultado.error || "No se pudo eliminar"
            );

        }


        mostrarNotificacion(resultado.mensaje);

        cargarProductos();


    } catch (error) {

        console.error(error);

        alert("Error: " + error.message);

    }

}


// ==========================================
// NOTIFICACIÓN BONITA
// ==========================================

function mostrarNotificacion(mensaje) {

    const notificacion = document.createElement("div");

    notificacion.className = "notificacion";

    notificacion.innerHTML = `
        <span>✓</span>
        ${mensaje}
    `;

    document.body.appendChild(notificacion);


    setTimeout(() => {

        notificacion.classList.add("mostrar");

    }, 50);


    setTimeout(() => {

        notificacion.classList.remove("mostrar");

        setTimeout(() => {

            notificacion.remove();

        }, 300);

    }, 2500);

}


// ==========================================
// CANCELAR
// ==========================================

btnCancelar.addEventListener(
    "click",
    limpiarFormulario
);


// ==========================================
// LIMPIAR FORMULARIO
// ==========================================

function limpiarFormulario() {

    formulario.reset();

    productoId.value = "";


    document.getElementById(
        "titulo-formulario"
    ).textContent = "Agregar producto";


    btnGuardar.textContent = "Guardar producto";


    btnCancelar.classList.add("oculto");

}


// ==========================================
// RECARGAR
// ==========================================

btnRecargar.addEventListener(
    "click",
    cargarProductos
);


// ==========================================
// INICIAR
// ==========================================

cargarProductos();