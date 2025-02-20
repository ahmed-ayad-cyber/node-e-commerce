import {Router,Request,Response,NextFunction} from 'express';
import productsService from "./products.service";
import productsvalidation from './products.validaator';


const productsRoute: Router = Router();

productsRoute.route('/')
    .get( productsService.getAll)
    .post(productsService.uploadImages,productsService.saveImage,productsService.saveImage,productsvalidation.createOne,productsService.createOne);

productsRoute.route('/:id')
    .get(productsvalidation.getOne,productsService.getOne)
    .put( productsService.uploadImages,productsService.saveImage,productsvalidation.updateOne,productsService.updateOne)
    .delete(productsvalidation.deletOne,productsService.deleteOne);

export default productsRoute;