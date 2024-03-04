const mongoose = require('mongoose')

const dbConfig = 'mongodb+srv://usuario:usuario@cluster0.ofc6w6h.mongodb.net/annotations?retryWrites=true&w=majority&appName=Cluster0'

const connection = mongoose.connect(dbConfig)

module.exports = connection
