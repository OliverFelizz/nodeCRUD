<<<<<<< HEAD
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
=======
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Para almacenar el nombre del archivo de la imagen
  },
});

module.exports = mongoose.model("User", userSchema);
>>>>>>> dd9d117985b26e618e38928d2878d258a5bf93b7
