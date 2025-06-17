document.addEventListener("DOMContentLoaded", () => {
    if (!sessionStorage.getItem("usuario")) {
        window.location.href = "login.html";
    }
    
    // Logout
    const salir = document.getElementById('botonSalir');
    if (salir) {
        salir.addEventListener('click', function(){
            sessionStorage.clear();
            window.location.href = 'login.html';
        })
    }
});