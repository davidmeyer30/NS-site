app.get('/api/reis', async (req, res) => {
  const { from, to } = req.query;

  const response = await fetch(
    "https://gateway.apiportal.ns.nl/reisinformatie-api/api/v5/trips",
    {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": process.env.NS_API_KEY,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        origin: {
          name: from
        },
        destination: {
          name: to
        },
        searchForArrival: false
      })
    }
  );

  const text = await response.text();

  try {
    res.json(JSON.parse(text));
  } catch (e) {
    res.status(500).json({
      error: "NS API response niet geldig",
      raw: text
    });
  }
});
