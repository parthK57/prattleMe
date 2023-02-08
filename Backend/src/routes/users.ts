import { Router } from "express";

const router = Router();

// Controllers
import {signUpHandler, loginHandler, addUserHandler, getFriendsHandler} from "../controllers/users";
import PasswordVerifier from "../Services/PasswordVerifier";

// Routing
router.post("/users/register", signUpHandler);
router.post("/users/login", PasswordVerifier, loginHandler);
router.post("/users/adduser", PasswordVerifier, addUserHandler);
router.post("/users/getfriends", PasswordVerifier, getFriendsHandler);

export default router;