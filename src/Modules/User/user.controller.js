import { Router } from "express";
import * as userServices from "./user.service.js"
import { authentication } from "../../Middlewares/authentication.middleware.js";

const router = Router();

router.get("/getSingleUser",authentication,userServices.getSingleUser)


export default router;