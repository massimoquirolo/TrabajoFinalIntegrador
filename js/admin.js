/*cuando se llega al panelAdmin.html, el script admin.js se ejecuta, se obtiene de accestoken en el sessionstorage para ver si estas logeado
si se usara el que estaba antes (usuario) tomaria las credenciales viejas y quedaria en bucle*/

document.addEventListener('DOMContentLoaded', () => {
    if (!sessionStorage.getItem("accessToken")) { //ahora apuntamos a accessToken
        window.location.href = "login.html";
        return; // Detenemos la ejecucion del script por si hay b ucle o otro error
    }

    // Salones
    const formSalon                 = document.getElementById('form-salon');
    const idSalonInput              = document.getElementById('salon-id');
    const nombreSalonInput          = document.getElementById('nombre-salon');
    const direccionSalonInput       = document.getElementById('direc-salon');
    const descripcionSalonInput     = document.getElementById('desc-salon');
    const precioSalonInput          = document.getElementById('precio-salon');
    const imagenSalonInput          = document.getElementById('imagen-salon');
    const disponibleSalonInput      = document.getElementById('disponible-salon');
    const tablaSalones              = document.getElementById('tabla-salones');
    const botonAceptar              = document.getElementById('boton-aceptar-salon');
    const botonEditar               = document.getElementById('boton-cancelar-salon');

    // Servicios
    const formServicio          = document.getElementById('form-servicio');
    const idServicioInput       = document.getElementById('servicio-id');
    const descriServicioInput   = document.getElementById('descri-servicio');
    const precioServicioInput   = document.getElementById('precio-servicio');
    const tablaServicios        = document.getElementById('tabla-servicios');
    const btnAceptarServicio    = document.getElementById('boton-aceptar-servicio');
    const btnEditarServicio     = document.getElementById('boton-cancelar-servicio');

    // Tags imagenes
    const inputImg       = document.getElementById("imagen-salon-input");
    const contenedorTags = document.getElementById("tag");

    let salonIdAux = null; // para seguir editando
    let urls = [];

    // cargar/mostrar salones
    function mostrarSalones() {
        console.log("Dentro de mostrar salones")
        const salones = getSalones(); // del js data.js
        tablaSalones.innerHTML = ''; // limpiar filas existentes

        if (salones.length === 0) {
            console.log("Dentro de mostrar salones 1")
            tablaSalones.innerHTML = '<tr><td colspan="5" class="text-center">No hay salones registrados.</td></tr>';
            return;
        }

        console.log(salones);

        salones.forEach(salon => {
            console.log("Dentro de mostrar salones 2")
            const row = tablaSalones.insertRow();
            row.innerHTML = `
                <td>${salon.nombre}</td>
                <td>${salon.direccion}</td>
                <td>$${parseInt(salon.precio).toLocaleString('es-AR')}</td>
                <td><span class="badge ${salon.disponible ? 'bg-success' : 'bg-danger'}">${salon.disponible ? 'Disponible' : 'Reservado'}</span></td>
                <td>
                    <button class="btn btn-sm btn-warning edit-btn" data-id="${salon.id}">Editar</button>
                    <button class="btn btn-sm btn-danger delete-btn" data-id="${salon.id}">Eliminar</button>
                </td>
            `;
        });
    }

    // agregar o updatear
    formSalon.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const dataSalon = {
            id: salonIdAux || `salon${Date.now()}`, // genera id nuevo cuando no se esta editando
            nombre: nombreSalonInput.value,
            direccion: direccionSalonInput.value,
            descripcion: descripcionSalonInput.value,
            precio: parseFloat(precioSalonInput.value),
            imagen: imagenSalonInput.value || 'img/salon-ejemplo.jpg',
            disponible: disponibleSalonInput.value === 'true'
        };

        let salones = getSalones();
        if (salonIdAux) { // updateamos el existente
            salones = salones.map(s => s.id === salonIdAux ? dataSalon : s);
        } else { // agregamos nuevo
            salones.push(dataSalon);
        }

        // Esta linea, separa las urls por comas, en un array, para luego recorrrerlo y agregar las imagenes al data correctamente.
        urls.forEach((url, index) => {
            const imagen = {
                id: 'img' + Date.now() + '_' + index,
                idsitio: dataSalon.id,
                url: url
            };
            Imagenes.push(imagen);
        });

        guardarSalones(salones);
        mostrarSalones();
        resetearForm();
    });

    // al momento de dar cancelar reseteamos form
    botonEditar.addEventListener('click', () => {
        resetearForm();
    });

    // funcion para resetar todo el form, al momento de cancelar la edicion
    function resetearForm() {
        formSalon.reset();
        idSalonInput.value = '';
        salonIdAux = null;
        botonAceptar.querySelector('span').textContent = 'Agregar Salón';
        botonEditar.style.display = 'none';
        imagenSalonInput.value = '';
        disponibleSalonInput.value = 'true';

        // Eliminamos las tags visualmente del formulario al cancelar la edicion, o al agregar un salon
        let tags = contenedorTags.querySelectorAll(".tag");
        tags.forEach(tag => tag.remove());
        urls = []; 
        inputImg.value = '';
    }

    // Contador de caracteres de la descripcion de salones en el administrador
    const textarea = document.getElementById("desc-salon");
    const contador = document.getElementById("contador");

    console.log(textarea);

    textarea.addEventListener("input", function () {
        contador.textContent = 90 - textarea.value.length;
    });

    // mostrar lo primero inicial
    mostrarSalones();

    tablaSalones.addEventListener('click', (e) => {
        const target = e.target;

        if (target.classList.contains('edit-btn')) {
            const id = target.dataset.id;
            const salones = getSalones();
            const salon = salones.find(s => s.id === id);

            // Aqui reutilizamos el formulario que agrega salones, para cargar todos los datos del salon seleccionado a editar,
            // realizar la edicion, y luego poder guardar, o cancelar los cambios.
            if (salon) {
                salonIdAux = salon.id;
                idSalonInput.value = salon.id;
                nombreSalonInput.value = salon.nombre;
                direccionSalonInput.value = salon.direccion;
                descripcionSalonInput.value = salon.descripcion;
                precioSalonInput.value = salon.precio;

                let Imgs = getImagenes();
                const imagenesSalon = Imgs.filter(img => img.idsitio === salon.id);
                precargarTagsImagenes(imagenesSalon.map(img => img.url));

                disponibleSalonInput.value = salon.disponible ? 'true' : 'false';

                botonAceptar.querySelector('span').textContent = 'Guardar Cambios'; // Aqui cambiamos el boton de Agregar Salon a Guardar Cambios
                botonEditar.style.display = 'inline-block'; // Aqui mostramos el boton de Cancelar, ya que por defecto tiene un display: none
            }
        }

        if (target.classList.contains('delete-btn')) {
            const id = target.dataset.id;
            let salones = getSalones();
            salones = salones.filter(s => s.id !== id);
            guardarSalones(salones);
            mostrarSalones();
        }
    });

    
    // Logout
    const salir = document.getElementById('botonSalir');
    if (salir) {
        salir.addEventListener('click', function(){
            sessionStorage.clear();
            window.location.href = 'index.html';
        })
    }


//  inicio mostrar servicios CON BOTONES 
function mostrarServicios() {
    const servicios = getServicios();
    tablaServicios.innerHTML = '';

    if (servicios.length === 0) {
        tablaServicios.innerHTML = '<tr><td colspan="3" class="text-center">No hay servicios registrados.</td></tr>';
        return;
    }

    servicios.forEach(servicio => {
        const row = tablaServicios.insertRow();
        row.innerHTML = `
            <td>${servicio.nombre}</td>
            <td>${servicio.descripcion}</td>
            <td>
                <button class="btn btn-sm btn-warning edit-servicio-btn" data-id="${servicio.id}">Editar</button>
                <button class="btn btn-sm btn-danger delete-servicio-btn" data-id="${servicio.id}">Eliminar</button>
            </td>
        `;
    });
}
mostrarServicios();
//  fin mostrar servicios con botones 
//  inicio eventos editar y eliminar servicios 
tablaServicios.addEventListener('click', (e) => {
    const target = e.target;
    const servicios = getServicios();

    if (target.classList.contains('delete-servicio-btn')) {
        const id = target.dataset.id;
        const nuevosServicios = servicios.filter(s => s.id !== id);
        guardarServicios(nuevosServicios);
        mostrarServicios();
    }

    if (target.classList.contains('edit-servicio-btn')) {
        const id = target.dataset.id;
        const servicio = servicios.find(s => s.id === id);
        if (servicio) {
            const nuevoNombre = prompt("Editar nombre del servicio:", servicio.nombre);
            const nuevaDescripcion = prompt("Editar descripción:", servicio.descripcion);

            if (nuevoNombre && nuevaDescripcion) {
                const editado = { ...servicio, nombre: nuevoNombre, descripcion: nuevaDescripcion };
                const actualizados = servicios.map(s => s.id === id ? editado : s);
                guardarServicios(actualizados);
                mostrarServicios();
            }
        }
    }
});
//  fin eventos y eliminar servicios 


mostrarServicios();
//  fin mostar servicios  


    // Tags de imagenes
    function actualizarInputOculto() {
        imagenSalonInput.value = urls.join(",");
    }

    function crearTag(url) {
        const tag = document.createElement("span");
        tag.className = "tag";
        // Aqui agregamos el tag de manera dinamica, y dejamos implementada la funcion para que elimine la etiqueta "span"
        // que es la etiqueta padre, y tambien que actue con la funcion eliminarURL al presionar la X.
        tag.innerHTML = `${url}<button onclick="this.parentElement.remove(); eliminarUrl('${url}')">X</button>`;
        contenedorTags.insertBefore(tag, inputImg);
    }

    inputImg.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            const url = inputImg.value.trim();
            if (url && !urls.includes(url)) {
                urls.push(url);
                crearTag(url);
                actualizarInputOculto();
            }
            inputImg.value = "";
        }
    });

    // Esta funcion de precargar, es la utilizada a la hora de presionar el boton editar salon, para que cargue los tags ya existentes en los
    // salones que hay, y traiga la informacion real guardada.
    function precargarTagsImagenes(urlsArray) {
        // Limpiar tags anteriores
        const tags = contenedorTags.querySelectorAll(".tag");
        tags.forEach(tag => tag.remove());

        urls = []; // Vaciar el array también

        // Crear tags con las URLs del salón
        urlsArray.forEach(url => {
            url = url.trim();
            if (url) {
                urls.push(url);
                crearTag(url);
            }
        });

        imagenSalonInput.value = urls.join(',');
    }

    // Esta funcion crea el elemento del tag en si, con el texto del link, y la X para luego poder ser eliminado
    // Y tambien se creo el "EventListener" para la cruz, y que al momento de presionarla, sea eliminado el tag correspondiente.
    function crearTag(url) {
        const tag = document.createElement("span");
        tag.className = "tag";
        tag.textContent = url;

        const btnTag = document.createElement("button");
        btnTag.textContent = "X";
        btnTag.addEventListener("click", () => {
            tag.remove(); // Elimina el tag visual
            urls = urls.filter(u => u !== url); // Elimina del array
            actualizarInputOculto(); // Actualiza el input oculto
        });

        tag.appendChild(btnTag);
        contenedorTags.insertBefore(tag, inputImg);
    }


//  inicicio mostrar imagenes como tabla 
const tablaImagenes = document.getElementById('tabla-imagenes');

function mostrarImagenes() {
    const imagenes = getImagenes();
    tablaImagenes.innerHTML = '';

    if (imagenes.length === 0) {
        tablaImagenes.innerHTML = '<tr><td colspan="3" class="text-center">No hay imágenes registradas.</td></tr>';
        return;
    }

    imagenes.forEach(img => {
        const row = tablaImagenes.insertRow();
        row.innerHTML = `
            <td><img src="${img.url}" alt="miniatura" class="img-thumbnail" style="max-width: 100px; max-height: 80px;"></td>
            <td>${img.descripcion}</td>
            <td>
                <button class="btn btn-sm btn-warning edit-img-btn" data-id="${img.id}">Editar</button>
                <button class="btn btn-sm btn-danger delete-img-btn" data-id="${img.id}">Eliminar</button>
            </td>
        `;
    });
}
mostrarImagenes();
//  fin mostrar imagenes como tabla 
//  inicio eventos editar y eliminar imagenes 
tablaImagenes.addEventListener('click', (e) => {
    const target = e.target;
    const imagenes = getImagenes();

    if (target.classList.contains('delete-img-btn')) {
        const id = target.dataset.id;
        const nuevasImagenes = imagenes.filter(img => img.id !== id);
        guardarImagenes(nuevasImagenes);
        mostrarImagenes();
    }

    if (target.classList.contains('edit-img-btn')) {
        const id = target.dataset.id;
        const imagen = imagenes.find(img => img.id === id);

        if (imagen) {
            const nuevaUrl = prompt("Editar URL de la imagen:", imagen.url);
            const nuevaDesc = prompt("Editar descripción:", imagen.descripcion);

            if (nuevaUrl && nuevaDesc) {
                const editada = { ...imagen, url: nuevaUrl, descripcion: nuevaDesc };
                const actualizadas = imagenes.map(img => img.id === id ? editada : img);
                guardarImagenes(actualizadas);
                mostrarImagenes();
            }
        }
    }
});
//  fin eventos editar y eliminar imagenes 





});