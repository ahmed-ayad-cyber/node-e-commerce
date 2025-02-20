import { body, param } from "express-validator"
import validatorMiddleware from "../middlewares/validator.middleware"
import categoriesSchema from "./categories.schema"

class Categoriesvalidation {
   createOne = [
    body('name')
        .notEmpty()
        .withMessage((val,{req})=>req.__('validation_field'))
        .isLength({ min: 2, max: 50 })
        .withMessage((val,{req})=>req.__('validation_length_short'))
        .custom(async(value:string,{req})=>{
            const category = await categoriesSchema.findOne({name:value})
            if(category) throw new Error (`${req.__('not_found')}`)
            return true
        })
        ,validatorMiddleware
    ]
    
    updateOne = [
        param('id')
            .isMongoId()
            .withMessage((val,{req})=>req.__('invalid_id'))
        ,body('name')
            .notEmpty()
            .withMessage((val,{req})=>req.__('validation_field'))
            .isLength({ min: 2, max: 50 })
            .withMessage((val,{req})=>req.__('validation_length_short'))
            .custom(async(value:string ,{req})=>{
                const category = await categoriesSchema.findOne({name:value})
                if(category && category._id!.toString() !==req.params?.id.toString()) throw new Error (`${req.__('not_found')}`)
                return true})
        ,validatorMiddleware
    ]
    
    getOne = [
        param('id')
            .isMongoId()
            .withMessage((val,{req})=>req.__('invalid_id'))
        ,validatorMiddleware
    ]

    deleteOne = [
        param('id').isMongoId().withMessage((val, {req}) => req.__('invalid_id')),
        validatorMiddleware
    ]
}

const categoriesvalidation = new Categoriesvalidation;

export default categoriesvalidation
