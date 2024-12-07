const express = require("express");
const router = express.Router();
const User = require("../models/users");
const multer = require("multer");
const path = require("path");
const routes = require("../routes/routes");

const carpetaUpload = path.join(__dirname, "../upload");

// Configuración de almacenamiento para multer
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, carpetaUpload);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname); // Nombres únicos para los archivos
  },
});

var upload = multer({
  storage: storage,
}).single("image"); // Sólo un archivo de imagen por formulario

// Ruta para mostrar la página de inicio
router.get("/", (req, res) => {
  User.find()
    .then((users) => {
      res.render("index", { titulo: "Usuarios", users });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/");
    });
});

// Ruta para mostrar el formulario de agregar usuario
router.get("/add", (req, res) => {
  res.render("adduser", { titulo: "Agregar Usuario" });
});

// Ruta para procesar el formulario de agregar usuario
router.post("/add", upload, (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    image: req.file ? req.file.filename : "", // Se guarda el nombre del archivo de la imagen
  });

  user
    .save()
    .then(() => {
      console.log("Usuario guardado correctamente");
      res.redirect("/");
    })
    .catch((error) => {
      console.log(error);
      res.redirect("/");
    });
});

// Ruta para mostrar el formulario de edición de usuario
router.get("/edit/:id", (req, res) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      if (!user) {
        return res.redirect("/");
      }
      res.render("edituser", { titulo: "Editar Usuario", user });
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/");
    });
});

// Ruta para procesar el formulario de edición de usuario
router.post("/edit/:id", upload, (req, res) => {
  const { id } = req.params;
  const updatedData = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    image: req.file ? req.file.filename : req.body.existingImage, // Mantener la imagen anterior si no se sube una nueva
  };

  User.findByIdAndUpdate(id, updatedData, { new: true })
    .then(() => {
      console.log("Usuario actualizado correctamente");
      res.redirect("/");
    })
    .catch((error) => {
      console.log(error);
      res.redirect("/");
    });
});

// Ruta para eliminar un usuario
router.get("/delete/:id", (req, res) => {
  const { id } = req.params;
  User.findByIdAndDelete(id)
    .then(() => {
      console.log("Usuario eliminado");
      res.redirect("/");
    })
    .catch((error) => {
      console.log(error);
      res.redirect("/");
    });
});

module.exports = router;
