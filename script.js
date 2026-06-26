// Selección de elementos
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const header = document.querySelector(".header");
const navLinks = document.querySelectorAll(".nav-link");

// --- 1. Control del Menú Hamburguesa ---
if (hamburger) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });

    // Cerrar menú al hacer clic en un enlace (móvil)
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        });
    });
}

// --- 2. Header Sticky al hacer Scroll ---
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// --- 3. Marcar Link Activo Automáticamente ---
const currentPath = window.location.pathname;
navLinks.forEach(link => {
    const linkPath = link.getAttribute("href");
    if (currentPath.includes(linkPath)) {
        link.classList.add("active");
    }
});

// --- 4. Animación de Aparición (Scroll Reveal) ---
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target); // Dejar de observar una vez animado
        }
    });
}, observerOptions);

// Aplicar a tarjetas de servicios y productos
document.querySelectorAll('.service-card, .product-card, .contact-info, .contact-form-container').forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "all 0.6s ease-out";
    observer.observe(card);
});

// --- 5. Lógica para el Login / Registro ---
function mostrarFormulario(tipo) {
    const formLogin = document.getElementById('form-login');
    const formRegistro = document.getElementById('form-registro');
    const tabs = document.querySelectorAll('.auth-tab');

    if (!formLogin || !formRegistro) return;

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
    e.preventDefault();
    alert("¡Inicio de sesión exitoso! Bienvenido a Pistonzone.");
    window.location.href = "index.html";
}

function registrar(e) {
    e.preventDefault();
    alert("¡Cuenta creada correctamente! Ahora puedes iniciar sesión.");
    mostrarFormulario('login');
}