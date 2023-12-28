const hamburgerMenu = document.querySelector('.hamburger-menu');
const menu = document.querySelector('.menu');

hamburgerMenu.addEventListener('click', () => {
  menu.classList.toggle('active');
});

document.addEventListener('click', (event) => {
  if (!menu.contains(event.target) && !hamburgerMenu.contains(event.target)) {
    menu.classList.remove('active');
  }
});