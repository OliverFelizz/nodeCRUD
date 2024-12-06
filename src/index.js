require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const router = require('../routes/routes')

const app = express()
const PORT = process.env.PORT || 4000

//conexion a la base de datos
mongoose.connect(process.env.DB_URI)
const db = mongoose.connection
db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Conectado a base de datos'))

//cosas de express
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(session({
    secret: 'mi palabra clave',
    saveUninitialized: true,
    resave: false
}))

app.use((req, res, next) => {
    res.locals.message = req.session.message
    delete req.session.message
    next()
})

//configurar motor de plantillas
app.set('view engine', 'ejs')

app.use('', router)

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`)
})