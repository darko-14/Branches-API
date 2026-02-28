
import { Router, Request, Response } from "express";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { validateZod } from "../../middleware/validate";
import { loginSchema } from "./auth.schema";

const router = Router();
const service = new AuthService();
const controller = new AuthController(service);

router.post('/login', validateZod(loginSchema, 'body'), controller.login);
router.post('/logout', controller.logout);

export default router