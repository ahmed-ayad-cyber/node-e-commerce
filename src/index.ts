import express, { NextFunction } from 'express';
import subcategoriesRoute from "./subcategories/subcategories.route";
import categoriesRoute from './categories/categories.route';
import globalErrors from './middlewares/erorrs.middleWare';
import ApiErrors from './utils/apisErorrs';
import productsRoute from './products/products.route';
import usersRoute from './users/users.route';
import authRoute from './authen/auth.route';
import { users } from './users/users.interface';

declare module "express" {
    interface Request {
        filterData?: any;
        files?:any;
        user?:any;
    }
}

const mountRoutes = (app: express.Application) => {
    app.use('/api/v1/categories', categoriesRoute);
    app.use('/api/v1/subcategories', subcategoriesRoute);
    app.use('/api/v1/products', productsRoute);
    app.use('/api/v1/users', usersRoute);
    app.use('/api/v1/auth', authRoute);
    app.all('*',(req:express.Request,res:express.Response,next:NextFunction)=>{
        next(new ApiErrors (`route ${req.originalUrl} not found`,400))
    })
    app.use(globalErrors)
}

export default mountRoutes;