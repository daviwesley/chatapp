import { Router } from "express";
import { createUserController, loginController } from "../controllers/user";
import { authenticateTokenMiddleware } from "../middlwares/jwt";
const router = Router()

router.post("/", createUserController)
router.post("/login", loginController)
router.get("/teste", authenticateTokenMiddleware, (req, res) => res.send("iiiii"))

export default router