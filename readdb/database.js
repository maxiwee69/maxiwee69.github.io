window.onload = function() {
    fetch('https://127.0.0.1:5000/getData', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        var contentTable = document.getElementById('content');
        data.forEach(function(item) {
            var row = document.createElement('tr');
            var ipCell = document.createElement('td');
            ipCell.textContent = item[0];  // IP address is the first element
            var textCell = document.createElement('td');
            textCell.textContent = item[1];  // Text is the second element
            var timestampCell = document.createElement('td');
            timestampCell.textContent = item[3];  // Timestamp is the third element
            var contactCell = document.createElement('td');
            contactCell.textContent = item[2];  // Contact info is the fourth element
            row.appendChild(ipCell);
            row.appendChild(textCell);
            row.appendChild(timestampCell);
            row.appendChild(contactCell);  // Append the new cell to the row
            contentTable.appendChild(row);
        });
    }).catch(function(error) {
        console.error('Error:', error);
    });
};

document.getElementById('clearDbButton').addEventListener('click', function() {
    fetch('https://127.0.0.1:5000/clearDb', {
        method: 'POST',
    }).then(function(response) {
        if (response.ok) {
            alert('Database cleared');
        } else {
            alert('Error: ' + response.statusText);
        }
    });
});