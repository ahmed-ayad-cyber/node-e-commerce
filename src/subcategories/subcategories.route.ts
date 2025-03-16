import {Router} from 'express';
import subcategoriesService from "./subcategories.service";
import subcategoriesvalidation from './subcategories.validaator';
import authService from '../auth/auth.service';

const subcategoriesRoute: Router = Router({mergeParams: true});

subcategoriesRoute.route('/')
    .get(subcategoriesService.filterSubcategories, subcategoriesService.getAll)
    .post(authService.protectedRoutes,authService.allowedTo("admin"),subcategoriesService.setCategoryId,subcategoriesvalidation.createOne,subcategoriesService.createOne);

subcategoriesRoute.route('/:id')
    .get(subcategoriesvalidation.getOne,subcategoriesService.getOne)
    .put( authService.protectedRoutes,authService.allowedTo("admin"),subcategoriesvalidation.updateOne,subcategoriesService.updateOne)
    .delete(authService.protectedRoutes,authService.allowedTo("admin"),subcategoriesvalidation.deletOne,subcategoriesService.deleteOne);

export default subcategoriesRoute;