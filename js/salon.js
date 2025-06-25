// Realizamos una busqueda, y encontramos que con "URLSearchParams" podemos tomar el id del salon el cual queremos llevar a salon.html y
// mostrar de forma dinamica su informacion.
// El window.location.search, nos devuelve la parte luego del "?", por ej "?id=1" ejemplificando para el salon id 1, y el ".get('id')", nos retorna 
// limpio el valor numerico, en este caso del ejemplo, el "1".
const salonId = new URLSearchParams(window.location.search).get('id');
let salones  = getSalones();
let imagenes = getImagenes();

const salon = salones.find(s => s.id === salonId);
if (!salon) {
    // Si no encuentra la ID del salon correspondiente (O se ingresa a un salon inexistente por URL), da un mensaje
    // de error sobre el medio de la pantalla, obligando a volver hacia atras al usuario.
    document.body.innerHTML = '<p class="text-center mt-5 text-danger">Salón no encontrado</p>';
    throw new Error('Salón no encontrado');
}

document.getElementById('nombreSalon').textContent      = salon.nombre;
document.getElementById('descripcionSalon').textContent = salon.descripcion;
document.getElementById('direccionSalon').textContent   = salon.direccion;
document.getElementById('precioSalon').textContent      = salon.precio.toLocaleString();
const estado = salon.disponible ? 'Disponible' : 'Reservado';
document.getElementById('estadoSalon').textContent      = estado;
elementEstado = document.getElementById('estadoSalon');

elementEstado.classList.add(salon.disponible ? 'disponible' : 'reservado');

const imagenesSalon = imagenes.filter(img => img.idsitio === salonId);

const galeria = document.getElementById('galeriaImagenes');
imagenesSalon.forEach(img => {
    const div = document.createElement('div');
    div.className = 'col-md-4';
    div.innerHTML = `
        <div class="card shadow-sm">
            <img src="${img.url}" class="card-img" alt="${img.descripcion}">
        </div>`;
    galeria.appendChild(div);
});

if (salon.disponible) {
    const presupuesto = document.getElementById('botonPresupuesto');
    const divres      = document.createElement('div');
    divres.className = 'col-md-12 text-center';
    divres.innerHTML = `<a href="presupuesto.html?id=${salon.id}" class="boton"><span>Pedir Prespuesto</span></a>`;
    presupuesto.appendChild(divres);
}