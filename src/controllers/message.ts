import { Request, Response } from "express";
import Message from "../models/message";
import * as WebSocket from 'ws';
import logger from "../logger";
// import { wss } from "../app";
export async function getMessagesController(req: Request, res: Response) {
    
    Message.find({},(err, messages)=> {
        res.send(messages);
    })
           
}

export async function createMessageController(req: Request, res: Response) {
    const msg = new Message(req.body)

    msg.save((err) => {
        if(err) res.sendStatus(500)
    })
    res.sendStatus(200);
}