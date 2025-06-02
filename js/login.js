document.addEventListener("DOMContentLoaded", () => {
    if (sessionStorage.getItem('usuario')){
        // alert('El usuario ya se encuentra logueado.')
        window.location.href = './panelAdmin.html';
    }

    document.getElementById('loginForm').addEventListener('submit', function(event){
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

    });
});