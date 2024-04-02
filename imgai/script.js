function generateImage() {
    console.log('generateImage function called');
    const prompt = document.getElementById('prompt').value;
    const secretKey = document.getElementById('secretKey').value;
    console.log('Prompt:', prompt);
    console.log('Secret Key:', secretKey);
    fetch('https://images.maxiwee.workers.dev', { 
        method: 'POST', 
        headers: { 
            'Content-Type': 'application/json',
            'X-Secret-Key': secretKey 
        },
        body: JSON.stringify({ prompt: prompt }) 
    })
    .then(response => {
        console.log('Received response from server');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.blob();
    })
    .then(blob => {
        console.log('Received blob from server');
        const urlCreator = window.URL || window.webkitURL;
        const imageUrl = urlCreator.createObjectURL(blob);
        document.getElementById('output').src = imageUrl;
    })
    .catch(error => {
        console.error('Error:', error);
    });
}