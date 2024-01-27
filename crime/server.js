const express = require('express');
const { Pool } = require('pg');
const axios = require('axios');
const cheerio = require('cheerio');
const Sentiment = require('sentiment');
const path = require('path');

const app = express();
const port = 3000;
const sentiment = new Sentiment();

const pool = new Pool({
  user: 'maxiwee',
  host: 'localhost',
  database: 'mcrimes',
  password: 'Leonie<3!',
  port: 5432, // PostgreSQL default port is 5432
});

app.use(express.static(path.join(__dirname)));

app.get('/recentCrimes', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM crimes ORDER BY date DESC LIMIT 10');
  res.json(rows);
});

app.get('/weirdestCrimes', async (req, res) => {
  const { rows } = await pool.query('SELECT * FROM crimes WHERE weirdness > 10 ORDER BY date DESC LIMIT 10');
  res.json(rows);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

function calculateWeirdness(description) {
  const { score } = sentiment.analyze(description);
  
  // Normalize the score to a scale of 0-10
  const weirdness = Math.max(0, Math.min(10, Math.round((score + 5) * 10 / 11)));
  
  return weirdness;
}

const urls = [
  'https://www.cbsnews.com/',
  'https://www.statista.com/',
  'https://www.standard.co.uk/news/crime',
  'https://allthatsinteresting.com/tag/crime',
  'https://apnews.com/hub/crime'
];

async function scrapeCrimes() {
  for (const url of urls) {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    
    // Use the Cheerio selectors to find the data you want on the page
    // This is just a placeholder and you would need to replace it with your own logic
    $('div.crime').each((i, elem) => {
      const crime = {
        date: $(elem).find('span.date').text(),
        description: $(elem).find('p.description').text(),
      };

      crime.weirdness = calculateWeirdness(crime.description);

      // Insert the crime data into the database
      pool.query('INSERT INTO crimes (date, description, weirdness) VALUES ($1, $2, $3)', [crime.date, crime.description, crime.weirdness]);
    });
  }
}

// Run the scraper every hour
setInterval(scrapeCrimes, 60 * 60 * 1000);