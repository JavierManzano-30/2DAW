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
  } catch (_error) {
    return res.status(500).json({ error: "No se pudo conectar con Jikan" });
  }
}

router.get("/genres", (_req, res) => {
  const url = `${BASE_URL}/genres/anime`;
  return proxyJikan(url, res);
});

router.get("/top", (req, res) => {
  const limit = Number(req.query.limit) || 10;
  const url = `${BASE_URL}/top/anime?limit=${limit}`;
  return proxyJikan(url, res);
});

router.get("/search", (req, res) => {
  const query = String(req.query.q || req.query.query || "").trim();

  const allowed = [
    "type",
    "status",
    "rating",
    "order_by",
    "sort",
    "min_score",
    "max_score",
    "year",
    "genres",
    "sfw"
  ];

  const hasFilters = allowed.some((key) => {
    const value = req.query[key];
    return value !== undefined && value !== "";
  });

  if (!query && !hasFilters) {
    return res.status(400).json({ error: "query o filtros son obligatorios" });
  }

  const params = new URLSearchParams();
  if (query) params.set("q", query);
  params.set("limit", String(Number(req.query.limit) || 10));

  allowed.forEach((key) => {
    const value = req.query[key];
    if (value !== undefined && value !== "") {
      params.set(key, String(value));
    }
  });

  const url = `${BASE_URL}/anime?${params.toString()}`;
  return proxyJikan(url, res);
});

module.exports = router;
