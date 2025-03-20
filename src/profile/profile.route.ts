import { Router } from 'express';
import authService from '../auth/auth.service';
import profileService from './profile.service';
import usersService from '../users/users.service';
import profilevalidation from './profile.validaator';

const profileroute: Router = Router();

profileroute.use(authService.protectedRoutes,authService.checkActive);

profileroute.route('/')
    .get(profileService.setUserId,profilevalidation.getOne,profileService.getOne)
    .put(usersService.uploadImage,usersService.saveImage,profilevalidation.updateOne,profileService.updateOne)
    .delete(profileService.setUserId,authService.allowedTo('user'),profilevalidation.deleteOne,profileService.deleteOne);

profileroute.put('/create-password',profilevalidation.createPasswrd,profileService.createPassword)
profileroute.put('/change-password',profilevalidation.changePasswrd,profileService.changePassword)

export default profileroute; 