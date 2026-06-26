// Configuración de Supabase
const SUPABASE_URL = "https://ddgclumgrixqalnvrzzz.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_vtxXtfI0fuivgNMsChXaWQ_3e9KrVsj";
const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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

// --- 3. Marcar Link Activo ---
const currentPath = window.location.pathname;
navLinks.forEach(link => {
    const linkPath = link.getAttribute("href");
    if (currentPath.includes(linkPath)) {
        link.classList.add("active");
    }
});

// --- 4. Animación de Aparición (Scroll Reveal) ---
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .product-card, .contact-info, .contact-form-container').forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    card.style.transition = "all 0.6s ease-out";
    observer.observe(card);
});

// --- 5. Base de Datos: Guardar Mensajes de Contacto ---
const contactForm = document.querySelector(".contact-form");
if (contactForm && window.location.pathname.includes("Contacto")) {
    contactForm.onsubmit = async (e) => {
        e.preventDefault();
        const btn = e.target.querySelector("button");
        btn.innerText = "Enviando...";
        btn.disabled = true;

        const formData = {
            nombre: e.target.querySelector('input[type="text"]').value,
            email: e.target.querySelector('input[type="email"]').value,
            asunto: e.target.querySelectorAll('input[type="text"]')[1].value, // El segundo input text es el asunto
            mensaje: e.target.querySelector('textarea').value
        };

        const { data, error } = await _supabase
            .from('mensajes_contacto')
            .insert([formData]);

        if (error) {
            alert("Error al enviar el mensaje: " + error.message);
        } else {
            alert("¡Mensaje guardado en la base de datos con éxito!");
            contactForm.reset();
        }
        btn.innerText = "Enviar Mensaje";
        btn.disabled = false;
    };
}

// --- 6. Base de Datos: Gestión de Iniciar Sesión / Registro ---
async function iniciarSesion(e) {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const { data, error } = await _supabase
        .from('perfiles_usuarios')
        .select('*')
        .eq('email', email)
        .eq('password_hash', password)
        .single();

    if (data) {
        alert("¡Bienvenido caballero! Sesión iniciada correctamente.");
        window.location.href = "index.html";
    } else {
        alert("Credenciales incorrectas o usuario no encontrado.");
    }
}

async function registrar(e) {
    e.preventDefault();
    const btn = e.target.querySelector("button");
    btn.innerText = "Registrando...";
    btn.disabled = true;

    try {
        const userData = {
            nombre: document.getElementById("reg-nombre").value,
            email: document.getElementById("reg-email").value,
            password_hash: document.getElementById("reg-password").value
        };

        const { data, error } = await _supabase
            .from('perfiles_usuarios')
            .insert([userData]);

        if (error) {
            alert("Error al registrar: " + error.message);
        } else {
            alert("¡Registro exitoso! Ya estás en nuestra base de datos.");
            e.target.reset();
        }
    } catch (err) {
        alert("Ocurrió un error inesperado: " + err.message);
    }
    
    btn.innerText = "Registrarme ahora";
    btn.disabled = false;
}