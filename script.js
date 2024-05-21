const hamburgerMenu = document.querySelector('.hamburger-menu');
const menu = document.querySelector('.menu');
const body = document.querySelector('body');

hamburgerMenu.addEventListener('click', (event) => {
    event.stopPropagation(); // Prevent the event from bubbling up to the body
    menu.style.transform = menu.style.transform === 'translateX(0%)' ? 'translateX(100%)' : 'translateX(0%)';
});

body.addEventListener('click', () => {
    menu.style.transform = 'translateX(100%)'; // Close the menu when clicking outside of it
});
