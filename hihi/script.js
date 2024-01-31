document.addEventListener('DOMContentLoaded', function() {
    var yesButton = document.getElementById('yesButton');
    var noButton = document.getElementById('noButton');

    yesButton.style.cursor = 'pointer';
    noButton.style.cursor = 'pointer';
    
    function sendAnswer(answer) {
        fetch('http://localhost:3000/save_answer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ answer: 'your answer here' }),
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch((error) => {
            console.error('Error:', error);
        });
        .then(response => {
            console.log(response);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    document.getElementById('yesButton').addEventListener('click', function() {
        console.log('Yes button clicked');
        sendAnswer('Yes');
        // Change the title
        document.getElementById('message').textContent = 'Yippie!!';
        var image = document.getElementById('image');
        image.src = 'cat.gif'; 
        image.style.display = 'block';
    });

    document.getElementById('noButton').addEventListener('click', function() {
        sendAnswer('No');
        document.getElementById('message').textContent = 'No button is just for show'; 
        var noButton = document.getElementById('noButton');
        noButton.parentNode.removeChild(noButton);
        var image = document.getElementById('image');
        image.src = 'sarlah-sarlahthecat.gif'; 
        image.style.display = 'block';
    });
});