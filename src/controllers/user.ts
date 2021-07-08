import { Request, Response } from "express";
import User from "../models/user";
import { compareSync } from "bcrypt";
import jwt from "jsonwebtoken"

export async function createUserController(req: Request, res: Response) {
    const { email, password } = req.body;

    const user = await User.create({
        email,
        password
    });

    res.json({
        user,
        message: "create user successfully"
    });
}

export async function loginController(req: Request, res: Response) {
    const { email, password } = req.body;
    
    const user = await User.findOne({
      email
    });
  
    if (!user) {
      throw Error("User not found");
    }
    if (compareSync(password, user.password)) {
      const token = jwt.sign({ user }, "yourSecretKey", {
        expiresIn: "24h"
      });
      res.cookie('token', token, { httpOnly: true });
      res.json({
        token
      });
    } else {
      res.status(401).json({
        message: "Unauthenticated"
      });
    }
  }