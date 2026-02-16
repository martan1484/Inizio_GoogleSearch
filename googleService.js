const axios = require("axios");

async function searchGoogle(query) {
  const response = await axios.get("https://serpapi.com/search.json", {
    params: {
      engine: "google",
      q: query,
      api_key: process.env.SERPAPI_KEY,
      num: 10
    }
  });

  const organic = response.data.organic_results || [];

  return organic.slice(0, 10).map(result => ({
    position: result.position,
    title: result.title,
    url: result.link,
    snippet: result.snippet
  }));
}

module.exports = { searchGoogle };
