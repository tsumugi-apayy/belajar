// ================= SHOW MENU =================
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

// Menu Show
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

// Menu Hidden
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/* ================= NAVBAR ================= */

const navbarToggle = document.querySelector('.navbar-toggle');
const navbarMenu = document.querySelector('.navbar-menu');

if (navbarToggle && navbarMenu) {
    navbarToggle.addEventListener('click', () => {
        navbarToggle.classList.toggle('active');
        navbarMenu.classList.toggle('active');
    });
}

/* ================= SEARCH & FILTER BLOG ================= */

const searchInput = document.getElementById("searchInput");
const categoryButtons = document.querySelectorAll(".category-btn");
const blogCards = document.querySelectorAll(".blog-card");

let activeCategory = "all";

function filterBlogs() {

    const searchValue = searchInput
        ? searchInput.value.toLowerCase()
        : "";

    let visibleCards = [];

    // FILTER CARD
    blogCards.forEach(card => {

        const title = card
            .querySelector(".blog-title")
            .textContent
            .toLowerCase();

        const cardCategory = card.getAttribute("data-category");

        const matchesSearch = title.includes(searchValue);

        const matchesCategory =
            activeCategory === "all" ||
            cardCategory === activeCategory;

        // RESET
        card.classList.remove("fade-in");

        if (matchesSearch && matchesCategory) {

            // tampilkan card
            card.style.display = "flex";

            visibleCards.push(card);

        } else {

            // sembunyikan total dari grid
            card.style.display = "none";
        }
    });

    // trigger animasi berurutan
    visibleCards.forEach((card, index) => {

        card.style.animationDelay = `${index * 140}ms`;

        requestAnimationFrame(() => {
            card.classList.add("fade-in");
        });

    });
}

/* ================= SEARCH EVENT ================= */

if (searchInput) {
    searchInput.addEventListener("keyup", filterBlogs);
}

/* ================= CATEGORY BUTTON ================= */

categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        // hapus active semua
        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // active button sekarang
        button.classList.add("active");

        // ambil category
        activeCategory = button.getAttribute("data-category");

        // filter ulang
        filterBlogs();
    });

});

/* ================= LOAD AWAL ================= */

document.addEventListener("DOMContentLoaded", () => {
    filterBlogs();
});

/* ================= DARK LIGHT THEME ================= */

const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'

// Tema sebelumnya
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// Ambil tema sekarang
const getCurrentTheme = () =>
    document.body.classList.contains(darkTheme)
        ? 'dark'
        : 'light'

const getCurrentIcon = () =>
    themeButton.classList.contains(iconTheme)
        ? 'ri-moon-line'
        : 'ri-sun-line'

// Jika sebelumnya dark
if (selectedTheme) {

    document.body.classList[
        selectedTheme === 'dark'
            ? 'add'
            : 'remove'
    ](darkTheme)

    themeButton.classList[
        selectedIcon === 'ri-moon-line'
            ? 'add'
            : 'remove'
    ](iconTheme)
}

// Klik tombol
themeButton.addEventListener('click', () => {

    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)

    // Simpan tema
    localStorage.setItem(
        'selected-theme',
        getCurrentTheme()
    )

    localStorage.setItem(
        'selected-icon',
        getCurrentIcon()
    )
})