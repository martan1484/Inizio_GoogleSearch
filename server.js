const express = require("express");
const path = require("path");
const { searchGoogle } = require("./googleService");

const app = express();

// statické soubory z public/
app.use(express.static("public"));

// root route → index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// endpoint pro hledání
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

// port z Renderu
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



