const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const http = require('http')
const routes = require('../src/routes')
const {setUpWebsocket} = require('./websocket')

const app = express()
const server = http.Server(app)

setUpWebsocket(server)

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-obtue.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(cors())
app.use(express.json()) // Entender request no formato JSON
app.use(routes)

server.listen(4444)