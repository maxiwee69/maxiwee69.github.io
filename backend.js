const express = require('express');
const cors = require('cors');
const writeFileAtomic = require('write-file-atomic');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.post('/counter', (req, res) => {
    const answer = req.body.answer;
    console.log(`Received answer: ${answer}`); // Print the received answer

    writeFileAtomic('counter.txt', `${answer}\n`, { encoding: 'utf8', mode: 0o600 }, function (err) {
        if (err) {
            console.error(`Error writing to file: ${err}`); // Print the error
            res.status(500).json({ message: 'Error writing to file' });
        } else {
            console.log('Saved!');
            res.status(200).json({ message: 'counter upped' });
        }
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});