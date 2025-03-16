import { Router } from 'express';
import categoriesService from './categories.service';
import categoriesvalidation from './categories.validaator';
import subcategoriesRoute from '../subcategories/subcategories.route';
import authService from '../auth/auth.service';

const categoriesRoute: Router = Router();

categoriesRoute.use('/:categoryId/subcategories', subcategoriesRoute);

categoriesRoute.route('/')
    .get(categoriesService.getAll)
    .post(authService.protectedRoutes,authService.allowedTo("admin"),authService.protectedRoutes,categoriesvalidation.createOne,categoriesService.createOne);

categoriesRoute.route('/:id')
    .get(categoriesvalidation.getOne,categoriesService.getOne)
    .put(authService.protectedRoutes,authService.allowedTo("admin"),categoriesvalidation.updateOne,categoriesService.updateOne)
    .delete(authService.protectedRoutes,authService.allowedTo("admin"),categoriesvalidation.deleteOne,categoriesService.deleteOne);

export default categoriesRoute;