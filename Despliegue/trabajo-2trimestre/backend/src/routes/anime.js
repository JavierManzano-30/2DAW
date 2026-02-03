const express = require("express");

const router = express.Router();
const BASE_URL = "https://api.jikan.moe/v4";

async function proxyJikan(url, res) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data?.message || "Error de Jikan"
      });
    }

    return res.json(data);
  } catch (error) {
    return res.status(500).json({ error: "No se pudo conectar con Jikan" });
  }
}

router.get("/top", (req, res) => {
  const limit = Number(req.query.limit) || 10;
  const url = `${BASE_URL}/top/anime?limit=${limit}`;
  return proxyJikan(url, res);
});

router.get("/search", (req, res) => {
  const query = String(req.query.q || req.query.query || "").trim();

  if (!query) {
    return res.status(400).json({ error: "query es obligatorio" });
  }

  const limit = Number(req.query.limit) || 10;
  const url = `${BASE_URL}/anime?q=${encodeURIComponent(query)}&limit=${limit}`;
  return proxyJikan(url, res);
});

module.exports = router;
