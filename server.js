const express = require('express')
const bodyParser= require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose')

const url='mongodb://127.0.0.1:27017/MongoDB1'

console.log('4000 server working')

mongoose.connect(url, { useNewUrlParser: true })
.then(client => {
    const db = mongoose.connection
    app.set('view engine', 'ejs')
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(express.static('public'))
    app.get('/', (req, res) => {
    db.collection('monuments').find().toArray()

      .then(results => {
        res.render('index.ejs', { monuments: results })
      })
      .catch(error => console.error(error))
      })

    app.get('/resort1', (req, res) => {
      db.collection('resorts').find().toArray()

      .then(results => {
        res.render('index2.ejs', { resorts: results })
      })
      .catch(error => console.error(error))
      
      })
    app.get('/museums1', (req, res) => {
      db.collection('museums').find().toArray()

      .then(results => {
        res.render('index3.ejs', { museums: results })
      })
      .catch(error => console.error(error))
      
      })
    app.listen(4000, function() {
        console.log('listening on 4000')
      })
})
.catch(console.error)
