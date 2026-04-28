app.get('/api/reis', async (req, res) => {
  const { from, to } = req.query;

  const url = `https://gateway.apiportal.ns.nl/reisinformatie-api/api/v3/trips?origin=${from}&destination=${to}`;

  const response = await fetch(url, {
    headers: {
      "Ocp-Apim-Subscription-Key": process.env.NS_API_KEY,
      "Accept": "application/json"
    }
  });

  const data = await response.text();

  try {
    res.json(JSON.parse(data));
  } catch (e) {
    res.status(500).json({
      error: "NS API gaf geen JSON terug",
      raw: data
    });
  }
});
