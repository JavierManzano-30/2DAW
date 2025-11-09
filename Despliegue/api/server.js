const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

app.get('/api/adaitsdawdocker', (req, res) => {
    res.json({ message: '¡Hola desde la API!' });
});

app.listen(port, () => {
    console.log(`API escuchando en el puerto ${port}`);
});

