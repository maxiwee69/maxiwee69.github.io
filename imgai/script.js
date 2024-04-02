function generateImage() {
    const prompt = document.getElementById('prompt').value;
    const secretKey = document.getElementById('secretKey').value;
    fetch('https://images.maxiwee.workers.dev', { 
        method: 'POST', 
        headers: { 
            'Content-Type': 'application/json',
            'X-Secret-Key': secretKey 
        },
        body: JSON.stringify({ prompt: prompt }) 
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.blob();
    })
    .then(blob => {
        const urlCreator = window.URL || window.webkitURL;
        const imageUrl = urlCreator.createObjectURL(blob);
        document.getElementById('output').src = imageUrl;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}