document.addEventListener('DOMContentLoaded', () => {
    // corroborar de que haya token, si no se vuelve al login
    if (!sessionStorage.getItem("accessToken")) {
        window.location.href = 'login.html';
        return; 
    }

    // para que funcione el boton salir como las demas secciones
    const salir = document.getElementById('botonSalir');
    if (salir) {
        salir.addEventListener('click', function() {
            sessionStorage.clear();
            window.location.href = 'index.html';
        });
    }

    const cargarPresupuestos = () => {
        const tablaBody = document.getElementById('tabla-presupuestos');
        
        const presupuestos = getPresupuestos();
        const salones = getSalones();

        tablaBody.innerHTML = '';

        if (presupuestos.length === 0) {
            tablaBody.innerHTML = '<tr><td colspan="6" class="text-center">Aún no se ha generado ningún presupuesto.</td></tr>';
            return;
        }

        presupuestos.forEach(presupuesto => {
            // se busca el salon correspondiente al presupuesto por id
            const salonContratado = salones.find(s => s.id === presupuesto.idSalon);
            const nombreSalon = salonContratado ? salonContratado.nombre : 'Salón no encontrado/eliminado';

            // Formateamos los servicios para que se vean bien en la tabla
            const serviciosTexto = presupuesto.servicios.length > 0 ? presupuesto.servicios.join(', ') : 'Ninguno';

            // Creamos la nueva fila
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${presupuesto.id}</td>
                <td>${presupuesto.apellidoNombre}</td>
                <td>${presupuesto.fecha}</td>
                <td>${presupuesto.tematica}</td>
                <td>${serviciosTexto}</td>
                <td>${nombreSalon}</td>
                <td>$${presupuesto.total.toLocaleString('es-AR')}</td>
            `;
            
            tablaBody.appendChild(row);
        });
    };

    cargarPresupuestos();
});