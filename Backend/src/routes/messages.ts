import { Router } from "express";

const router = Router();

// Controllers
import {
  sendMessageHandler,
  getMessageHandler,
  sendGroupMessageHandler,
  getGroupMessageHandler,
} from "../controllers/messages";
import PasswordVerifier from "../Services/PasswordVerifier";

router.post("/message/sendmessage", PasswordVerifier, sendMessageHandler);
router.post("/message/getmessage", PasswordVerifier, getMessageHandler);
router.post(
  "/message/sendgroupmessage",
  PasswordVerifier,
  sendGroupMessageHandler
);
router.post(
  "/message/getgroupmessage",
  PasswordVerifier,
  getGroupMessageHandler
);

export default router;
