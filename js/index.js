document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('contenedor-salones');
    const salones = getSalones();
    const imagenes = getImagenes();

    if (salones.length === 0) {
        contenedor.innerHTML = '<p class="text-center">No hay salones disponibles.</p>';
        return;
    }

    let fila = null;

    salones.forEach((salon, index) => {
        // Esto mantiene el formato que se hizo a mano en el TP anterior, de 3 salones por fila..
        if (index % 3 === 0) {
            fila = document.createElement('div');
            fila.className = 'row';
            contenedor.appendChild(fila);
        }
        const imagenSalon = imagenes.find(img => img.idsitio === salon.id);
        const imagenURL = imagenSalon ? imagenSalon.url : 'img/salon-ejemplo.jpg';

        const estadoClase = salon.disponible ? 'disponible' : 'reservado';
        const estadoTexto = salon.disponible ? 'Disponible' : 'Reservado';

        const col = document.createElement('div');
        col.className = 'col-lg-4 justify-items-center mb-4';


        // Aqui, en la etiqueta <a>, utilizamos el "href="salon.html?id=${salon.id}", a modo de que en la URL de la pagina del salon, tengamos la id del propio salon, y por tal
        // podamos escribir sobre el HTML de forma dinamica para ese salon en especifico.
        col.innerHTML = `
            <div class="card mx-auto" style="width: 18rem;">
                <img src="${imagenURL}" class="card-img-top img-max" alt="img">
                <div class="card-body altura-card">
                    <h5 class="card-title">${salon.nombre}</h5>
                    <p class="card-text">${salon.descripcion}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">${salon.direccion}</li>
                    <li class="list-group-item">$${parseInt(salon.precio).toLocaleString('es-AR')}</li>
                    <li class="list-group-item ${estadoClase}"><b>${estadoTexto}</b></li>
                </ul>
                <div class="card-body text-center">
                    <a href="salon.html?id=${salon.id}" class="btn btn-secondary bg-gradient w-50">Ver más</a>
                </div>
            </div>
        `;

        fila.appendChild(col);
    });
});
