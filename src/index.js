const express = require('express');
const { param } = require('express/lib/request');
const path = require('path');
const app = express();
const port = 3000;

const {
  read,
  write,
  test,
  getTemp,
  poll,
  setLed,
  args,
  getDevExamples,
  getDevExampleByName
} = require('./apis');
const arg = args();

// Parse JSON
app.use(express.json({ strict: false }));

// Static Files
app.use('/assets', express.static('src/assets'));
app.use('/modules', express.static('src/modules'));

app.get('/', (req, res) => {
  const isProd = arg.mode === 'prod';
  res.sendFile(
    path.join(
      `${__dirname}/${isProd ? 'index' : 'dev'}.html`
    )
  );
});

app.get('/led/:value', (req, res) => {
  setLed(16, parseInt(req.params.value, 10));
  res.json({ message: `success ${req.params.value}` })
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

app.get('/mode', (req, res) => {
  // "prod" | "dev"
  res.json(args().mode);
});

app.get('/examples', (req, res) => {
  res.json(getDevExamples());
});

app.get('/example/:name', (req, res) => {
  res.json(getDevExampleByName(req.params.name));
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});