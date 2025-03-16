import {Router} from 'express';
import productsService from "./products.service";
import productsvalidation from './products.validaator';
import authService from '../auth/auth.service';


const productsRoute: Router = Router();

productsRoute.route('/')
    .get( productsService.getAll)
    .post(authService.protectedRoutes,authService.allowedTo("admin"),productsService.uploadImages,productsService.saveImage,productsService.saveImage,productsvalidation.createOne,productsService.createOne);

productsRoute.route('/:id')
    .get(productsvalidation.getOne,productsService.getOne)
    .put( authService.protectedRoutes,authService.allowedTo("admin"),productsService.uploadImages,productsService.saveImage,productsvalidation.updateOne,productsService.updateOne)
    .delete(authService.protectedRoutes,authService.allowedTo("admin"),productsvalidation.deletOne,productsService.deleteOne);

export default productsRoute;