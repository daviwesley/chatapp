import { Router } from "express";
import { createMessageController, getMessagesController } from "../controllers/message";
import { authenticateTokenMiddleware } from "../middlwares/jwt";
const router = Router()

router.get("/", getMessagesController)
router.post("/", createMessageController)
// router.post("/login", loginController)
// router.get("/teste", authenticateTokenMiddleware, (req, res) => res.send("iiiii"))

export default router