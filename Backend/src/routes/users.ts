import { Router } from "express";

const router = Router();

// Controllers
import {
  signUpHandler,
  loginHandler,
  addUserHandler,
  getFriendsHandler,
  createGroupHandler,
  joinGroupHandler,
  getGroupHandler,
} from "../controllers/users";
import PasswordVerifier from "../Services/PasswordVerifier";

// Routing
router.post("/users/register", signUpHandler);
router.post("/users/login", PasswordVerifier, loginHandler);
router.post("/users/adduser", PasswordVerifier, addUserHandler);
router.post("/users/getfriends", PasswordVerifier, getFriendsHandler);
router.post("/users/creategroup", PasswordVerifier, createGroupHandler);
router.post("/users/joingroup", PasswordVerifier, joinGroupHandler);
router.post("/users/getgroup", PasswordVerifier, getGroupHandler);

export default router;
