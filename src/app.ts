import express from 'express';
import userRoutes from './routes/user';
import messageRoutes from './routes/message'
import connect from './db/connect';
import logger from "./logger"
import loggerMiddleware from './middlwares/logger'
import { createServer } from "http";
import jwt from "jsonwebtoken"
import * as WebSocket from 'ws';
import Message from "./models/message";

const app = express()
app.use(loggerMiddleware)
app.use(express.json())
app.use(express.urlencoded())
app.use('/user', userRoutes)
app.use('/message', messageRoutes)

const httpServer = createServer(app);
const wss = new WebSocket.Server({ server: httpServer, });

wss.on('connection', (ws: WebSocket) => {
    ws.on('message', (message: string) => {
        const token: any = jwt.decode(JSON.parse(message).token)
        console.log(token.user.email)
        const parsedMessage: any = JSON.parse(message)

        if (parsedMessage?.type === "media") {
            // media logic
        }

        const msg = new Message({...parsedMessage, user: token.user.email})
        msg.save().then(() => console.log("deu bom"))
    });
    ws.send('Hi there, I am a WebSocket server');
});


// httpServer.on("upgrade", (request, socket, head) => {
//     const authHeader = request.headers['authorization']
//     const token = authHeader && authHeader.split(' ')[1]
//     jwt.verify(token, "yourSecretKey", (err: any, user: any) => {
//         if (err) {
//             socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
//             socket.destroy();
//             return
//         }
//       })
// })

httpServer.listen(8000, () => {
    logger.info("Servidor rodando em http://localhost:8000")
    connect()
})

