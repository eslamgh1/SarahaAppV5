import { Router } from "express";
import * as authServices from "./auth.service.js"

const router = Router();

router.post("/signup",authServices.signUp)
router.post("/login",authServices.login)
router.put("/confirm",authServices.confirmEmail)


export default router;  // import by any name
