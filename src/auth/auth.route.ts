import { Router } from 'express';
import authValidation from './auth.validation';
import authService from './auth.service';



const authRoute: Router = Router();

authRoute.post('/login',authValidation.login,authService.login)
authRoute.post('/signup',authValidation.signup,authService.signup)

export default authRoute; 