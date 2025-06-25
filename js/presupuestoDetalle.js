document.addEventListener('DOMContentLoaded', () => {
    // Aqui utilizamos el URLSearchParams, de la misma manera que lo aclaramos en el salon.js para obtener la id del salon.
    const presuId = new URLSearchParams(window.location.search).get('id');
    let salones   = getSalones();
    let servicios = getServicios();
    
    const presupuestos = getPresupuestos();

    const presupuesto = presupuestos.find(p => p.id === parseInt(presuId));

    if (!presupuesto) {
        document.body.innerHTML = '<p class="text-center mt-5 text-danger">Presupuesto no encontrado</p>';
        throw new Error('Presupuesto no encontrado');
    }

    const salon = salones.find(s => s.id === presupuesto.idSalon);
    let total = salon.precio;
    console.log(salon)
    document.getElementById('precioSalon').textContent      = salon.precio.toLocaleString();
    document.getElementById('nya').textContent              = presupuesto.apellidoNombre;
    document.getElementById('fecha').textContent            = presupuesto.fecha;
    document.getElementById('tematica').textContent         = presupuesto.tematica;
    presupuesto.servicios.forEach(servi => {
        const servicio = servicios.find(s => s.id === servi);
        if (servicio) {
            total += parseInt(servicio.precio);
        }
    });
    presupuesto.total = total;
    // Guardamos por si fue recalculado a causa de algun cambio en el precio del salon, o el precio de los servicios.
    localStorage.setItem('presupuestos', JSON.stringify(presupuestos));
    document.getElementById('totalPresupuesto').textContent = presupuesto.total.toLocaleString('es-AR');
    
    const listaServicios = document.getElementById('servicios');
    presupuesto.servicios.forEach(servi => {
        const servicio = servicios.find(s => s.id === servi);
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.textContent = servicio ? `${servicio.descripcion}: $${parseInt(servicio.precio).toLocaleString()}` : '(Serivicio Eliminado)';
        listaServicios.appendChild(li);
    });
});