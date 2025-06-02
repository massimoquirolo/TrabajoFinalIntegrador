document.addEventListener('DOMContentLoaded', () => {
    const contenedor = document.getElementById('contenedor-salones');

    const salones = getSalones();

    // Si no existen salones para mostrar, muestro este texto.
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

        const estadoClase = salon.disponible ? 'disponible' : 'reservado';
        const estadoTexto = salon.disponible ? 'Disponible' : 'Reservado';

        const col = document.createElement('div');
        col.className = 'col-lg-4 justify-items-center mb-4';

        col.innerHTML = `
            <div class="card mx-auto" style="width: 18rem;">
                <img src="${salon.imagen}" class="card-img-top img-max" alt="img">
                <div class="card-body altura-card">
                    <h5 class="card-title">${salon.nombre}</h5>
                    <p class="card-text">${salon.descripcion}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">${salon.direccion}</li>
                    <li class="list-group-item">$${parseInt(salon.precio).toLocaleString('es-AR')}</li>
                    <li class="list-group-item ${estadoClase}"><b>${estadoTexto}</b></li>
                </ul>
            </div>
        `;

        fila.appendChild(col);
    });
});
