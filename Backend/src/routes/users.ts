import { Router } from "express";

const router = Router();

// Controllers
import {signUpHandler, loginHandler, addUserHandler} from "../controllers/users";
import PasswordVerifier from "../Services/PasswordVerifier";

// Routing
router.post("/users/register", signUpHandler);
router.post("/users/login", PasswordVerifier, loginHandler);
router.post("/users/adduser", PasswordVerifier, addUserHandler);

export default router;