document.addEventListener("DOMContentLoaded", () => {
    /*if (sessionStorage.getItem('usuario')){
        // alert('El usuario ya se encuentra logueado.')
        window.location.href = './panelAdmin.html';
    }*/

    /*document.getElementById('loginForm').addEventListener('submit', function(event){
        event.preventDefault();

        // Datos de usuario administrativo.
        const adminUser = 'admin';
        const adminPass = 'admin';

        const usuario = document.getElementById('usuario').value;
        const password = document.getElementById('password').value;

        if ((adminUser === usuario) && (adminPass === password)){
            sessionStorage.setItem('usuario', usuario);
            window.location.href = './panelAdmin.html';
        }
        else {
            alert('Usuario incorrecto.');
        }

    });*/

    // Si ya hay un accestoken, el usuario ya esta logeado y va al panel
    if (sessionStorage.getItem('accessToken')){
        window.location.href = './panelAdmin.html';
    }

    document.getElementById('loginForm').addEventListener('submit', function(event){
        event.preventDefault();

        const usuario = document.getElementById('usuario').value;
        const password = document.getElementById('password').value;

        fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: usuario,
                password: password
            })
        })
        .then(res => {
            // LÍNEA DE DIAGNÓSTICO 1: Mostramos la respuesta completa del servidor.
            // Aquí podremos ver el código de estado (ej: 200 para éxito, 400 para error).
            console.log('Respuesta completa del servidor (res):', res);
            
            // Si la respuesta no es OK (ej: error 400), la API envía un mensaje de error.
            if (!res.ok) {
                // Intentamos leer el JSON del error para ver el mensaje específico.
                return res.json().then(errorData => {
                    throw new Error(errorData.message || 'Credenciales inválidas');
                });
            }
            // Si la respuesta es OK (código 200), procesamos el JSON.
            return res.json();
        })
        .then(data => {
            // LÍNEA DE DIAGNÓSTICO 2: Mostramos los datos que recibimos en formato JSON.
            // Aquí veremos si el objeto 'data' contiene la propiedad 'token'.
            console.log('Datos recibidos en formato JSON (data):', data);

            if (data.accessToken) {
                sessionStorage.setItem('accessToken', data.token);
                window.location.href = './panelAdmin.html';
            } else {
                // Este error se mostrará si la respuesta fue 200 OK pero no vino un token.
                throw new Error('La respuesta del servidor fue exitosa pero no incluyó un token.');
            }
        })
        .catch(error => {
            // El .catch ahora recibirá errores de red Y los errores que lanzamos nosotros.
            console.error('Error final capturado en .catch:', error);
            // Mostramos el mensaje de error específico de la API.
            alert(`Error de autenticación: ${error.message}`);
        });
    });
});