const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API Diagnóstico Pymes funcionando 🚀');
});

app.post('/diagnostico', (req, res) => {
    const { operaciones, finanzas, talento } = req.body;

    let puntaje = 0;

    if (operaciones === "bueno") puntaje += 30;
    if (finanzas === "bueno") puntaje += 30;
    if (talento === "bueno") puntaje += 40;

    let nivel = "Bajo";

    if (puntaje > 60) nivel = "Medio";
    if (puntaje > 80) nivel = "Alto";

    res.json({
        puntaje,
        nivel,
        alertas: [
            "Inventarios sin control",
            "Flujo de caja informal",
            "Falta de capacitación"
        ],
        recomendaciones: [
            "Definir KPIs",
            "Mejorar control financiero",
            "Capacitar personal"
        ]
    });
});

app.listen(3000, () => {
    console.log('Servidor corriendo en http://localhost:3000');
});