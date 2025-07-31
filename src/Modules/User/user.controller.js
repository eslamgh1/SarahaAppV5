import { Router } from "express";
import * as userServices from "./user.service.js"

const router = Router();

router.get("/getSingleUser",userServices.getSingleUser)


export default router;