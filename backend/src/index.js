const express = require('express')
const mongoose = require('mongoose')
const routes = require('../src/routes')

const app = express()

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-obtue.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(express.json()) // Entender request no formato JSON

app.use(routes)

app.listen(3333)
