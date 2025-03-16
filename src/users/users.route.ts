import { Router } from 'express';
import usersService from './users.service';
import usersvalidation from './users.validaator';
import authService from '../auth/auth.service';

const usersRoute: Router = Router();

usersRoute.route('/')
    .get(authService.protectedRoutes,authService.allowedTo('admin'),usersService.getAll)
    .post(authService.protectedRoutes,usersService.uploadImage,usersService.saveImage,usersvalidation.createOne,usersService.createOne);

usersRoute.route('/:id')
    .get(authService.protectedRoutes,usersvalidation.getOne,usersService.getOne)
    .put(authService.protectedRoutes,usersService.uploadImage,usersService.saveImage,usersvalidation.updateOne,usersService.updateOne)
    .delete(authService.protectedRoutes,usersvalidation.deleteOne,usersService.deleteOne);

usersRoute.put('/:id/change-password',authService.protectedRoutes,usersvalidation.changePasswrd,usersService.changePassword)

export default usersRoute; 