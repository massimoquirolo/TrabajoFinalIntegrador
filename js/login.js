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

    document.getElementById('loginForm').addEventListener('submit', async function(event){
        event.preventDefault();

        const usuario = document.getElementById('usuario').value;
        const password = document.getElementById('password').value;
        let userToken = null; // Variable para guardar el token temporalmente

        try {
            // Autentica para obtener el token
            const res = await fetch('https://dummyjson.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: usuario,
                    password: password,
                }),
            });

            if (!res.ok) {
                // credenciales incorrecta, api devuelve error 404
                throw new Error('Usuario o contraseña incorrectos.');
            }

            const loginInfo = await res.json();
            userToken = loginInfo.accessToken;

            if (!userToken) {
                // este error es por si la api cambia y no devuelve token
                throw new Error('La autenticación fue exitosa pero no se recibió un token.');
            }

            // Verificamos el rol con el token anterior
            // Hacemos una nueva llamada al endpoint 'me' para obtener los datos del usuario logueado
            const respUsuario = await fetch('https://dummyjson.com/auth/me', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${userToken}`,
                },
            });

            const userInfo = await respUsuario.json();

           // tenemos los datos del user incluyendo tambien el rol
            console.log('Datos del usuario logueado:', userInfo); // Para pruebas

            // verificamos la clave
            if (userInfo.role === 'admin') {
                // Si es admin, guardamos el token en sessionStorage y redirigimos
                alert('¡Bienvenido, administrador!');
                sessionStorage.setItem('accessToken', userToken);
                window.location.href = './panelAdmin.html';
            } else {
                // Si no es admin, lanzamos un error y no le damos acceso
                throw new Error('Acceso denegado. No tienes permisos de administrador.');
            }
        } catch (error) {
            console.error('Error en el proceso de login:', error);
            alert(`Error: ${error.message}`);
        }

    });
});