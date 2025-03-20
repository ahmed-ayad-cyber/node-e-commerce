import { Router } from 'express';
import usersService from './users.service';
import usersvalidation from './users.validaator';
import authService from '../auth/auth.service';

const usersRoute: Router = Router();

usersRoute.use(authService.protectedRoutes,authService.checkActive,authService.allowedTo('admin'));

usersRoute.route('/')
    .get(usersService.getAll)
    .post( usersService.uploadImage,usersService.saveImage,usersvalidation.createOne,usersService.createOne);

usersRoute.route('/:id')
    .get(usersvalidation.getOne,usersService.getOne)
    .put(usersService.uploadImage,usersService.saveImage,usersvalidation.updateOne,usersService.updateOne)
    .delete(usersvalidation.deleteOne,usersService.deleteOne);

usersRoute.put('/:id/change-password',authService.protectedRoutes,usersvalidation.changePasswrd,usersService.changePassword)

export default usersRoute; 