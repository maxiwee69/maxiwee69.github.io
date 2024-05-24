document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the form from being submitted normally

    var text = document.querySelector('input[name="myInput"]').value;
    var contact = document.querySelector('input[name="contactInput"]').value;  // Get the contact info

    fetch('http://127.0.0.1:5000/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: text,
            contact: contact  // Include the contact info
        })
    }).then(function(response) {
        return response.text();
    }).then(function(text) {
        console.log('Server response:', text);
    }).catch(function(error) {
        console.error('Error:', error);
    });
});