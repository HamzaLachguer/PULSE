

// Caching DOM elements
const menuBtn = document.querySelector("#menu-btn");
const navList = document.querySelector("#nav-list");
const navMenu = document.querySelector("#nav-menu");

menuBtn.addEventListener('click', () => {
  const isMenuOpen = menuBtn.classList.toggle("close-icon");
  navList.classList.toggle("open", isMenuOpen);

  // update aria-atributes
  navMenu.setAttribute("aria-hidden", !isMenuOpen);
  menuBtn.setAttribute("aria-expanded", isMenuOpen);
})