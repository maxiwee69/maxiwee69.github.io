// Set the date we're counting down to
var countDownDate = new Date("Feb 3, 2024 23:59:59").getTime();

// Update the count down every 1 second
var countdownfunction = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the elements with id="days", "hours", "minutes", and "seconds"
  document.getElementById("days").innerHTML = days + "d ";
  document.getElementById("hours").innerHTML = hours + "h ";
  document.getElementById("minutes").innerHTML = minutes + "m ";
  document.getElementById("seconds").innerHTML = seconds + "s ";

  // If the count down is finished, write some text 
  if (distance < 0) {
    clearInterval(countdownfunction);
    document.getElementById("countdown").innerHTML = "RELEASED!";
  }
}, 1000);


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