const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());

const API_KEY = process.env.NS_API_KEY;

app.get('/api/reis', async (req, res) => {
  const { from, to } = req.query;

  const response = await fetch(
    `https://gateway.apiportal.ns.nl/reisinformatie-api/api/v3/trips?fromStation=${from}&toStation=${to}`,
    {
      headers: {
        "Ocp-Apim-Subscription-Key": API_KEY
      }
    }
  );

  const data = await response.json();
  res.json(data);
});

app.listen(10000);