const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

app.post('/save_answer', (req, res) => {
    const answer = req.body.answer;
    fs.writeFile('answer.txt', answer, err => {
        if (err) {
            console.error(err);
            res.status(500).send('An error occurred while writing the answer to a file.');
        } else {
            console.log('Answer saved to file.');
            res.status(200).send('Answer saved to file.');
        }
    });
});

app.listen(3000, () => console.log('Server listening on port 3000.'));