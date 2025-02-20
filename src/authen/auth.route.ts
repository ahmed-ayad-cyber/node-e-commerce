import { Router } from "express";
import { login } from "./auth.service";

const authRoute:Router = Router()

authRoute.post('/login',login)


export default authRoute