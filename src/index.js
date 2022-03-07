const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

const {
  read,
  write,
  test,
  getTemp,
  poll
} = require('./apis');

// Parse JSON
app.use(express.json({ strict: false }));

// Static Files
app.use('/assets', express.static('src/assets'));
app.use('/modules', express.static('src/modules'));

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
  const records = req.body;
  write(records).then((data) => {
    res.json(data);
  });
});

app.get('/poll', (req, res) => {
  try {
    poll();
    res.json("Success");
  } catch (error) {
    res.json(error.message);
  }
});

app.get('/temp', (req, res) => {
  try {
    res.json(getTemp());
  } catch (error) {
    res.json(error.message);
  }
});

app.get('/test', (req, res) => {
  try {
    test();
    res.json("Success");
  } catch (error) {
    res.json(error.message);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});