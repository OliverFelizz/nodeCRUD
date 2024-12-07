const express = require('express');
const router = express.Router();
const User = require('../models/users');
const multer = require('multer');
const path = require('path');

// Carpeta para guardar las imágenes
const carpetaUpload = path.join(__dirname, '../upload');

// Configuración de multer para subir archivos
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, carpetaUpload);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

var upload = multer({
    storage: storage
}).single('image');

// Mostrar todos los usuarios
router.get('/', async (req, res) => {
    try {
        const users = await User.find({});
        res.render('index', { titulo: 'Inicio', users: users });
    } catch (error) {
        res.json({ message: error.message });
    }
});

// Mostrar formulario para agregar un usuario
router.get('/add', (req, res) => {
    res.render('adduser', { titulo: 'Agregar Usuario' });
});

// Agregar un nuevo usuario
router.post('/add', upload, (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        image: req.file.filename // Guardamos el nombre de la imagen
    });

    user.save()
        .then(() => {
            console.log('Guardado correctamente');
            res.redirect('/');
        })
        .catch((error) => {
            console.log(error);
        });
});

// Mostrar formulario para editar un usuario
router.get('/edit/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.render('../views/layouts/editUser', { user: user }); // Especifica la subcarpeta 'layouts'
    } catch (err) {
        console.log(err);
        res.redirect('/');
    }
});

// Actualizar un usuario
router.post('/edit/:id', upload, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        user.name = req.body.name;
        user.email = req.body.email;
        user.phone = req.body.phone;

        if (req.file) {
            user.image = req.file.filename; 
        }

        await user.save();
        res.redirect('/');
    } catch (error) {
        res.json({ message: error.message });
    }
});

// Eliminar un usuario
router.get('/delete/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (error) {
        res.json({ message: error.message });
    }
});

module.exports = router;
