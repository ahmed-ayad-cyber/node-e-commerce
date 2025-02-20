import { body, param } from "express-validator"
import validatorMiddleware from "../middlewares/validator.middleware"
import categoriesSchema from "../categories/categories.schema"
import subcategoriesSchema from "../subcategories/subcategories.schema"



class Productsvalidation {
   createOne = [
    body('name')
        .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
        .isLength({ min: 2, max: 50 }).withMessage((val, {req}) => req.__('validation_value'))
    ,body('description')
        .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
        .isLength({ min: 2, max: 50 }).withMessage((val, {req}) => req.__('validation_value'))
    ,body('price')
        .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
        .isFloat({ min: 1, max: 10000000 }).withMessage((val, {req}) => req.__('validation_value'))
    ,body('quantity')
        .isInt({ min: 1, max: 10000000 }).withMessage((val, {req}) => req.__('validation_value'))
    ,body('discount')
        .isFloat({ min: 2, max: 50 }).withMessage((val, {req}) => req.__('validation_value'))
        .custom((val,{req})=>{
            req.body.priceAfterDiscount=req.body.price - (req.body.price * val / 100)
            return true
        })
    ,body('category')
        .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
        .isMongoId().withMessage((val, {req}) => req.__('invalid_id'))
        .custom(async(value:string,{req})=>{
            const category = await categoriesSchema.findById(value)
            if(!category) throw new Error (`${req.__('validation_value')}`)
            return true
        })
    ,body('subcategory')
        .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
        .isMongoId().withMessage((val, {req}) => req.__('invalid_id'))
        .custom(async(value:string,{req})=>{
            const subcategory = await subcategoriesSchema.findById(value)
            if(!subcategory) throw new Error (`${req.__('validation_value')}`)
            if( !subcategory || subcategory.category._id!.toString()!== req.body.category.toString()) throw new Error ('sub category')
            return true
        })
    ,validatorMiddleware
    ]
    
    updateOne = [
        param('id')
            .isMongoId()
            .withMessage('invalid id')
        ,body('name')
            .notEmpty()
            .withMessage('category name is required')
            .isLength({ min: 2, max: 50 })
            .withMessage('invalid length')
        ,body('discription')
            .optional()
            .isLength({ min: 2, max: 50 }).withMessage('invalid length')
        ,body('price')
            .optional()
            .isFloat({ min: 1, max: 10000000 }).withMessage('invalid length')
        ,body('quantity')
            .optional()
            .isInt({ min: 1, max: 10000000 }).withMessage('invalid length')
        ,body('discount')
            .optional()
            .isFloat({ min: 2, max: 50 }).withMessage('invalid length')
            .custom((val,{req})=>{
                req.body.priceAfterDiscount=req.body.price -(req.body.price * val/100)
                return true
            })
        ,body('category')
            .optional().isMongoId().withMessage('invalid id')
            .custom(async(value:string)=>{
                const category = await categoriesSchema.findById(value)
                if(!category) throw new Error ('category does not exsist')
                return true
            })
        ,body('subcategory')
            .optional()
            .isMongoId()
            .withMessage('invalid id')
            .custom(async(value:string,{req})=>{
                const subcategory = await subcategoriesSchema.findById(value)
                if(!subcategory) throw new Error ('category does not exsist')
                if(subcategory.category._id!.toString()!== req.body.category.toString()) throw new Error ('sub category')
                return true
            })
        ,validatorMiddleware
    ]
    
    deletOne = [
        param('id')
            .isMongoId()
            .withMessage('invalid id')
        ,body('name')
            .notEmpty()
            .withMessage('category name is required')
            .isLength({ min: 2, max: 50 })
            .withMessage('invalid length')
            .custom(async(value:string ,{req})=>{
                const subcategory = await subcategoriesSchema.findOne({name:value})
                if(subcategory && subcategory._id!.toString() !==req.params?.id.toString()) throw new Error ('category already exsist')
                return true})
        ,validatorMiddleware
    ]
    
    getOne = [
        param('id')
            .isMongoId()
            .withMessage('invalid id')
        ,body('name')
            .notEmpty()
            .withMessage('category name is required')
            .isLength({ min: 2, max: 50 })
            .withMessage('invalid length')
            .custom(async(value:string ,{req})=>{
                const subcategory = await subcategoriesSchema.findOne({name:value})
                if(subcategory && subcategory._id!.toString() !==req.params?.id.toString()) throw new Error ('category already exsist')
                return true})
        ,validatorMiddleware
    ]
}

const productsvalidation = new Productsvalidation;

export default productsvalidation
