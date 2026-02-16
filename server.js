const express = require("express");
const { searchGoogle } = require("./googleService");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

app.get("/search", async (req, res) => {
  const query = req.query.q;

  if (!query || query.trim().length === 0) {
    return res.status(400).json({ error: "Query parameter is required." });
  }

  try {
    const results = await searchGoogle(query);

    res.json({
      query,
      timestamp: new Date().toISOString(),
      count: results.length,
      results
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to fetch search results." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
