<<<<<<< HEAD
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
=======
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const routes = require("./routes/routes");

// Configuración de la base de datos
mongoose.connect("mongodb://localhost:27017/inventario", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Rutas
app.set("view engine", "ejs");
app.use(routes);

// Iniciar el servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
>>>>>>> dd9d117985b26e618e38928d2878d258a5bf93b7
});
