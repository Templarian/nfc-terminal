const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const { firmware, read, write } = require('./apis');

// Parse JSON
app.use(express.json({ strict: false }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/poll', (req, res) => {
  res.send('Hello World!');
});

app.get('/read', (req, res) => {
  read().then((data) => {
    res.json(data);
  });
});

app.post('/write', (req, res) => {
  const value = req.body;
  write(value).then((data) => {
    res.json(data);
  });
});

app.get('/firmware', (req, res) => {
  firmware().then((data) => {
    res.json(data);
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});