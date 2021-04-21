const express = require('express')
const bodyParser = require('body-parser')
// corsポリシーに抵触するため、その対策としてcorsを利用する
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get('/test', function(req, res) {
  res.send({
    message: 'Hello world!'
  })
})

const server = app.listen(process.env.PORT || 3000)
const io = require('socket.io')(server, {
  cors: {
    origin: "http://192.168.56.107:8080",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
})

io.on('connection', function(socket) {
  socket.on('SEND_MESSAGE', function(data) {
      io.emit('MESSAGE', data)
  })
})