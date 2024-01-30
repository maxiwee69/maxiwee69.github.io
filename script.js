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

window.onload = function() {
    var button = document.getElementById('invisblebutton');
    var x = Math.floor(Math.random() * window.innerWidth);
    var y = Math.floor(Math.random() * window.innerHeight);
    button.style.position = "absolute";
    button.style.left = x+'px';
    button.style.top = y+'px';
}

let counter = 0; // Initialize the counter

document.getElementById('invisblebutton').addEventListener('click', function() {
    var secretImage = document.getElementById('secretImage');
    if (secretImage.style.display === 'block') {
        secretImage.style.display = 'none';
    } else {
        secretImage.style.display = 'block';
        secretImage.style.width = '800px';  // Set the width of the image
        secretImage.style.height = '500px'; // Set the height of the image
        var x = Math.floor(Math.random() * (window.innerWidth - secretImage.width));
        var y = Math.floor(Math.random() * (window.innerHeight - secretImage.height));
        secretImage.style.position = "absolute";
        secretImage.style.left = x+'px';
        secretImage.style.top = y+'px';

        counter++; // Increment the counter
        document.getElementById('counter').textContent = counter + ' people have found the secret'; // Update the counter on the website
    }
});