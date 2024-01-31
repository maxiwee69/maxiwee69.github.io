window.onload = function() {
    
    document.getElementById('yesButton').addEventListener('click', function() {
        sendAnswer('Yes');
        // Change the title
        document.getElementById('title').textContent = 'Yippie!!';
    
        // Embed the Tenor GIF
        var gifEmbed = document.createElement('div');
        gifEmbed.innerHTML = `
            <div class="tenor-gif-embed" data-postid="26594385" data-share-method="host" data-aspect-ratio="0.60625" data-width="100%">
                <a href="https://tenor.com/view/yippee-cat-excited-gif-26594385">Yippee Cat GIF</a>from 
                <a href="https://tenor.com/search/yippee-gifs">Yippee GIFs</a>
            </div>
            <script type="text/javascript" async src="https://tenor.com/embed.js"></script>
        `;
        document.body.appendChild(gifEmbed);
    });

    document.getElementById('noButton').addEventListener('click', function() {
        sendAnswer('No');
        // Change the title
        document.getElementById('title').textContent = 'No button is just for show'; // Replace 'New Title' with your actual title

        // Remove the "No" button
        var noButton = document.getElementById('noButton');
        noButton.parentNode.removeChild(noButton);

        // Display the image
        var image = document.getElementById('image');
        image.src = 'https://www.reddit.com/media?url=https%253A%252F%252Fi.redd.it%252F4kcezfmr06s41.png%0'; // Replace 'image.jpg' with the path to your image
        image.style.display = 'block';
    });

    function sendAnswer(answer) {
        fetch('http://loaclhost:3000/hihi/save_answer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ answer: answer }),
        })
        .then(response => response.json())
        .then(data => console.log('Success:', data))
        .catch((error) => console.error('Error:', error));
    }
}