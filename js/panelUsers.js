document.addEventListener('DOMContentLoaded', () => {
    // no permitir acceso a users no logeados
    if (!sessionStorage.getItem("accessToken")) {
        window.location.href = 'login.html';
        return; // poarameos la ejecucion
    }

    // funcionalida d del boton salir para liberar la sessionstorage y volver al index
    const salir = document.getElementById('botonSalir');
    if (salir) {
        salir.addEventListener('click', function() {
            sessionStorage.clear();
            window.location.href = 'index.html';
        });
    }

    // funcion que carga y muestra los usuarios
    const cargarUsuarios = async () => {
        const tablaBody     = document.getElementById('tabla-usuarios');
        tablaBody.innerHTML = '<tr><td colspan="6" class="text-center">Cargando...</td></tr>';

        try {
            const res = await fetch('https://dummyjson.com/users');
            if (!res.ok) {
                throw new Error('No se pudo obtener la lista de usuarios.');
            }

            const data = await res.json();
            tablaBody.innerHTML = ''; // limpiando la tabla antes de utilizar

            // data.users es el array que contiene todos los usuarios de la que hay en la api
                data.users.forEach(user => {
                    const row = document.createElement('tr');
                    
                    //se omite contraseñas y demas cosas al mostrar los datos
                    row.innerHTML = `
                        <td>${user.id}</td>
                        <td>${user.firstName}</td>
                        <td>${user.lastName}</td>
                        <td>${user.email}</td>
                        <td>${user.username}</td>
                        <td>${user.role}</td>
                        <td>${user.age}</td>
                    `;
                    
                    tablaBody.appendChild(row);
            });
        } catch (error) {
            console.error('Error al cargar los usuarios:', error);
            tablaBody.innerHTML = `<tr><td colspan="6" class="text-center text-danger">Error al cargar los usuarios: ${error.message}</td></tr>`;
        }
    };

    // llamamos a la funcion para que cargue la informacion
    cargarUsuarios();
});