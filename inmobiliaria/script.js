const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

if (hamburger) {
    // Al hacer clic, activamos el menu y la animacion del icono 
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });
}

// Lógica para el Login / Registro
function mostrarFormulario(tipo) {
    const formLogin = document.getElementById('form-login');
    const formRegistro = document.getElementById('form-registro');
    const tabs = document.querySelectorAll('.auth-tab');

    if (tipo === 'login') {
        formLogin.classList.add('active');
        formRegistro.classList.remove('active');
        tabs[0].classList.add('active');
        tabs[1].classList.remove('active');
    } else {
        formLogin.classList.remove('active');
        formRegistro.classList.add('active');
        tabs[0].classList.remove('active');
        tabs[1].classList.add('active');
    }
}

function iniciarSesion(e) {
    e.preventDefault(); // Evita que la página recargue
    alert("¡Inicio de sesión exitoso!");
    window.location.href = "index.html"; // Redirige a inicio
}

function registrar(e) {
    e.preventDefault(); // Evita recarga
    alert("¡Cuenta creada correctamente! Ahora puedes iniciar sesión.");
    mostrarFormulario('login'); // Después de registro, va al login
}