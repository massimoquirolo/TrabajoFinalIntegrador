document.addEventListener('DOMContentLoaded', () => {
    // Aqui utilizamos el URLSearchParams, de la misma manera que lo aclaramos en el salon.js para obtener la id del salon.
    const salonId = new URLSearchParams(window.location.search).get('id');
    let salones   = getSalones();
    let servicios = getServicios();
    const contenedor = document.getElementById('servPresupuesto');
    const total = document.getElementById('totalPresupuesto');
    
    const salon = salones.find(s => s.id === salonId);
    if (!salon) {
        document.body.innerHTML = '<p class="text-center mt-5 text-danger">Salón no encontrado</p>';
        throw new Error('Salón no encontrado');
    }
    
    document.getElementById('precioSalon').textContent = salon.precio.toLocaleString();
    
    let costoBase = salon.precio;
    total.textContent = costoBase.toLocaleString();
    const checkboxes = [];

    servicios.forEach(servicio => {
        const precio = parseInt(servicio.precio);

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = servicio.id;
        checkbox.value = precio;
        checkbox.classList.add('form-check-input', 'me-2');

        // Aca tenemos creado prevamiente un array llamado "checkboxes", para con esto tener guardado los checkbox
        // que sean seleccionados por el usuario, y obtener luego los valores de los precios con un forEach
        // a la hora de calcular el total del presupuesto.
        checkboxes.push(checkbox);

        const label = document.createElement('label');
        label.htmlFor = servicio.id;
        label.innerText = `${servicio.descripcion}: $${precio.toLocaleString()}`;
        label.classList.add('form-check-label');

        const serviciosCB = document.createElement('div');
        serviciosCB.classList.add('form-check', 'mb-1');
        serviciosCB.appendChild(checkbox);
        serviciosCB.appendChild(label);

        checkbox.addEventListener('change', () => {
            // Calculamos el costo total del presupuesto, teniendo como costo base el valor del salon
            // y a este luego le vamos sumando o restando, a medida que se van tildando o destildando
            // los checkboxes de los servicios.
            let totalPresupuesto = costoBase;
            checkboxes.forEach(box => {
                if (box.checked) {
                    totalPresupuesto += parseInt(box.value);
                }
            });
            total.textContent = totalPresupuesto.toLocaleString();
        });

        contenedor.appendChild(serviciosCB);
    });


    document.getElementById('solicitarPresupuesto').addEventListener('click', function(event) {

        const apellidoNombre = document.getElementById('nya').value;
        const fecha          = document.getElementById('fecha').value;
        const tematica       = document.getElementById('tematica').value;
        // Con el replace, quitamos los puntos del precio numerico, por ejemplo "1.000", lo pasa a 1000.
        const total          = document.getElementById('totalPresupuesto').textContent.replace(/\./g, '');

        // Validamos los datos para alertar que son valores obligatorios los de los inputs
        if (!apellidoNombre || !fecha || !tematica) {
            alert('Por favor, completá todos los campos obligatorios. (Nombre, fecha y temática)');
            return;
        }

        const serviciosSeleccionados = [];
        // Aqui utilizamos el previamente creado array de checkboxes, para obtener la descripcion de los servicios
        // seleccionados, y poder almacenarlos en forma de array dentro del data de presupuestos.
        checkboxes.forEach(cb => {
            if (cb.checked) {
                const label = document.querySelector(`label[for="${cb.id}"]`);
                const descriServicio = label.textContent.split(':')[0];
                serviciosSeleccionados.push(descriServicio);
            }
        });

        // Aqui por primera vez cuando se hace un presupuesto, creamos un array vacio, caso contrario traemos el ya existente
        // y le sumamos el presupuesto con el formato dado. Guardamos los valores solicitados, y lo asociamos al id de un salon.
        const presupuestos = JSON.parse(localStorage.getItem('presupuestos')) || [];

        // de esta manera utilizando el map resolvemos poder obtener el id de manera secuencial sin tener que duplicar datos
        let nuevoId = 1;
        if (presupuestos.length > 0) {
            const ids = presupuestos.map(p => p.id);
            const maxId = Math.max(...ids);
            nuevoId = maxId + 1;
        }

        const nuevoPresu = {
            id: nuevoId,
            apellidoNombre,
            fecha,
            tematica,
            total: parseInt(total),
            servicios: serviciosSeleccionados,
            idSalon: salon.id,
        };

        presupuestos.push(nuevoPresu);
        localStorage.setItem('presupuestos', JSON.stringify(presupuestos));

        window.location.href = `presupuestoDetalle.html?id=${nuevoPresu.id}`;
        
    });

});