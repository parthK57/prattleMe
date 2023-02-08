import { Router } from "express";

const router = Router();

// Controllers
import {signUpHandler, loginHandler} from "../controllers/users";
import PasswordVerifier from "../Services/PasswordVerifier";

// Routing
router.post("/users/register", signUpHandler);
router.post("/users/login", PasswordVerifier, loginHandler);

export default router;