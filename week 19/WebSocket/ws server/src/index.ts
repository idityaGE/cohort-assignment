import WebSocket, { WebSocketServer } from "ws";
import express from "express";

const app = express()
const httpServer = app.listen(3000, () => console.log("connected to port 3000"))

const wss = new WebSocketServer({ server: httpServer })

let userCount = 0
wss.on("connection", (ws) => {
  ws.on('error', (err) => console.error(err))

  ws.on('message', (data, binary) => {
    wss.clients.forEach((client) => {
      if (client.readyState == WebSocket.OPEN) {
        client.send(data, { binary: binary })
      }
    })
  })
  console.log("userCount = ",++userCount)
  ws.send("Hello msg from WebSocket")
})

app.get("/", (req, res) => {
  res.send("A webSocket Server")
})