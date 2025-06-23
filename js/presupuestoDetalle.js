document.addEventListener('DOMContentLoaded', () => {
    // Aqui utilizamos el URLSearchParams, de la misma manera que lo aclaramos en el salon.js para obtener la id del salon.
    const presuId = new URLSearchParams(window.location.search).get('id');
    let salones   = getSalones();
    
    const presupuestos = getPresupuestos();

    const presupuesto = presupuestos.find(p => p.id === parseInt(presuId));

    if (!presupuesto) {
        document.body.innerHTML = '<p class="text-center mt-5 text-danger">Presupuesto no encontrado</p>';
        throw new Error('Presupuesto no encontrado');
    }

    const salon = salones.find(s => s.id === presupuesto.idSalon);
    console.log(salon)
    document.getElementById('precioSalon').textContent      = salon.precio.toLocaleString();
    document.getElementById('nya').textContent              = presupuesto.apellidoNombre;
    document.getElementById('fecha').textContent            = presupuesto.fecha;
    document.getElementById('tematica').textContent         = presupuesto.tematica;
    document.getElementById('totalPresupuesto').textContent = presupuesto.total.toLocaleString();
    
    const listaServicios = document.getElementById('servicios');
    presupuesto.servicios.forEach(serv => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.textContent = serv;
        listaServicios.appendChild(li);
    });
});