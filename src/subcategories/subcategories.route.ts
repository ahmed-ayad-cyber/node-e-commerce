import {Router} from 'express';
import subcategoriesService from "./subcategories.service";
import subcategoriesvalidation from './subcategories.validaator';

const subcategoriesRoute: Router = Router({mergeParams: true});

subcategoriesRoute.route('/')
    .get(subcategoriesService.filterSubcategories, subcategoriesService.getAll)
    .post(subcategoriesService.setCategoryId,subcategoriesvalidation.createOne,subcategoriesService.createOne);

subcategoriesRoute.route('/:id')
    .get(subcategoriesvalidation.getOne,subcategoriesService.getOne)
    .put( subcategoriesvalidation.updateOne,subcategoriesService.updateOne)
    .delete(subcategoriesvalidation.deletOne,subcategoriesService.deleteOne);

export default subcategoriesRoute;