import { Router } from 'express';
import authValidation from './auth.validation';
import authService from './auth.service';



const authRoute: Router = Router();

authRoute.post('/signup',authValidation.signup,authService.signup)
authRoute.post('/login',authValidation.login,authService.login)
authRoute.post('/admin-login',authValidation.login,authService.adminLogin)
authRoute.post('/forget-password',authValidation.forgetPassword,authService.forgetPassword)
authRoute.post('/verify-code',authService.verifyCode)
authRoute.post('/reset-password',authValidation.changePassword,authService.resetPassword)

export default authRoute; 