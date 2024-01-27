window.onload = function() {
    fetch('/recentCrimes')
        .then(response => response.json())
        .then(data => {
            const crimesDiv = document.getElementById('crimes');
            data.forEach(crime => {
                const p = document.createElement('p');
                p.textContent = `Crime: ${crime.name}, Date: ${crime.date}`;
                crimesDiv.appendChild(p);
            });
        })
        .catch(error => console.error('Error:', error));
};