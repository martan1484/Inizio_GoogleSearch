import fetch from "node-fetch";

const BASE_URL = "https://inizio-googlesearch.onrender.com/";

describe("Render /search endpoint", () => {

  test("should return 200 for valid query", async () => {
    const res = await fetch(`${BASE_URL}/search?q=test`);
    expect(res.status).toBe(200);
  });

  test("should return JSON", async () => {
    const res = await fetch(`${BASE_URL}/search?q=test`);
    const contentType = res.headers.get("content-type");
    expect(contentType).toContain("application/json");
  });

  test("should return results array", async () => {
    const res = await fetch(`${BASE_URL}/search?q=test`);
    const data = await res.json();
    expect(Array.isArray(data.results)).toBe(true);
  });

  test("count should match results length", async () => {
    const res = await fetch(`${BASE_URL}/search?q=test`);
    const data = await res.json();
    expect(data.count).toBe(data.results.length);
  });

  test("each result should contain title and link", async () => {
    const res = await fetch(`${BASE_URL}/search?q=test`);
    const data = await res.json();

    if (data.results.length > 0) {
      const first = data.results[0];
      expect(first).toHaveProperty("title");
      expect(first).toHaveProperty("link");
    }
  });

  test("should return 400 when query missing", async () => {
    const res = await fetch(`${BASE_URL}/search`);
    expect(res.status).toBe(400);
  });

});
