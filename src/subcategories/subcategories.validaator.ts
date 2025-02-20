import { body, param } from "express-validator"
import validatorMiddleware from "../middlewares/validator.middleware"
import subcategoriesSchema from "./subcategories.schema"
import { error } from "console"

class subCategoriesvalidation {
   createOne = [
    body('name')
        .notEmpty()
        .withMessage('subcategory name is required')
        .isLength({ min: 2, max: 50 })
        .withMessage('invalid length')
    ,body('category')
        .notEmpty()
        .withMessage('category is required')
        .isMongoId()
        .withMessage('invalid id')
        .custom(async(value:string)=>{
            const category = await subcategoriesSchema.findById(value)
            if(!category) throw new Error ('category does not exsist')
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
        ,body('category')
            .optional()
            .isMongoId()
            .withMessage('invalid id')
            .custom(async(value:string)=>{
                const category = await subcategoriesSchema.findById(value)
                if(!category) throw new Error ('category does not exsist')
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

const subcategoriesvalidation = new subCategoriesvalidation;

export default subcategoriesvalidation
