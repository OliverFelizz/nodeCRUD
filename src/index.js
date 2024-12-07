require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const router = require('../routes/routes');

const app = express();
const PORT = process.env.PORT || 4000;

// Conexion a la base de datos
mongoose.connect(process.env.DB_URI);
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Conectado a la base de datos'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('upload'));  // Carpeta para imágenes
app.set('view engine', 'ejs');
app.use(router);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
