const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

const BASE_URL = "https://api.api-onepiece.com";

// Lista de personajes
app.get("/api/personajes", async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/v2/characters/en`);
        res.json(response.data);
    } catch (err) {
        console.error("Error en personajes:", err.message);
        res.status(500).json({ error: "Error consultando personajes" });
    }
});

// Un personaje por ID
app.get("/api/personaje/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const response = await axios.get(`${BASE_URL}/v2/characters/en/${id}`);
        res.json(response.data);
    } catch (err) {
        console.error("Error en personaje:", err.message);
        res.status(500).json({ error: "Personaje no encontrado" });
    }
});

// Frutas del diablo
app.get("/api/frutas", async (req, res) => {
    try {
        const response = await axios.get(`${BASE_URL}/v2/fruits/en`);
        res.json(response.data);
    } catch (err) {
        console.error("Error en frutas:", err.message);
        res.status(500).json({ error: "Error consultando frutas" });
    }
});

// Mensaje de que la API está corriendo
const host = '0.0.0.0';

app.listen(PORT, host, () => {
    console.log("API intermediaria One Piece escuchando en http://localhost:3000");
});
