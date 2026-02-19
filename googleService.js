const axios = require("axios");

const SERPAPI_KEY = process.env.SERPAPI_KEY;

async function searchGoogle(query) {
  const url = `https://serpapi.com/search.json?engine=google&q=${encodeURIComponent(query)}&api_key=${SERPAPI_KEY}`;

  const res = await axios.get(url);
  // mapujeme jen to, co chceme vrátit
  const results = (res.data.organic_results || []).map((r, i) => ({
    position: i + 1,
    title: r.title,
    url: r.link,
    snippet: r.snippet || ""
  }));
  return results;
}

module.exports = { searchGoogle };
