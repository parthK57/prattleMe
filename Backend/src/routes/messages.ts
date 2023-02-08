import { Router } from "express";

const router = Router();

// Controllers
import {sendMessageHandler, getMessageHandler} from "../controllers/messages";
import PasswordVerifier from "../Services/PasswordVerifier";

router.post("/message/sendmessage", PasswordVerifier, sendMessageHandler);
router.post("/message/getmessage", PasswordVerifier, getMessageHandler);

export default router;