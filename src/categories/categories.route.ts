import { Router } from 'express';
import categoriesService from './categories.service';
import categoriesvalidation from './categories.validaator';
import subcategoriesRoute from '../subcategories/subcategories.route';

const categoriesRoute: Router = Router();

categoriesRoute.use('/:categoryId/subcategories', subcategoriesRoute);

categoriesRoute.route('/')
    .get(categoriesService.getAll)
    .post(categoriesvalidation.createOne,categoriesService.createOne);

categoriesRoute.route('/:id')
    .get(categoriesvalidation.getOne,categoriesService.getOne)
    .put(categoriesvalidation.updateOne,categoriesService.updateOne)
    .delete(categoriesvalidation.deleteOne,categoriesService.deleteOne);

export default categoriesRoute;