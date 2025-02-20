import { body, param } from "express-validator"
import validatorMiddleware from "../middlewares/validator.middleware"
import usersSchema from "./users.schema"


class Usersvalidation {
   createOne = [
       body('username')
           .notEmpty().withMessage((val,{req})=>req.__('validation_field'))
           .isLength({ min: 2, max: 50 }).withMessage((val,{req})=>req.__('validation_length_short'))
           .custom(async(value:string,{req})=>{
               const user = await usersSchema.findOne({username:value})
               if(user) throw new Error (`${req.__('validation_email_check')}`)
               return true
           })
        ,body('email')
           .notEmpty().withMessage((val,{req})=>req.__('validation_field'))
           .isEmail().withMessage((val,{req})=>req.__('validation_value'))
           .custom(async(value:string,{req})=>{
               const user = await usersSchema.findOne({email:value})
               if(user) throw new Error (`${req.__('not_found')}`)
               return true
           })
        ,body('name')
           .notEmpty().withMessage((val,{req})=>req.__('validation_field'))
           .isLength({min:2,max:50}).withMessage((val,{req})=>req.__('validation_value'))
        ,body('password')
           .notEmpty().withMessage((val,{req})=>req.__('validation_field'))
           .isLength({min:6,max:20}).withMessage((val,{req})=>req.__('validation_length_password'))
        ,body('confirmpassword')
           .notEmpty().withMessage((val,{req})=>req.__('validation_field'))
           .isLength({min:6,max:20}).withMessage((val,{req})=>req.__('validation_length_password'))
           .custom((value:string,{req})=>{
            if (value !== req.body.password) throw new Error (`${req._('validation_password_match')}`)
                return true;
           })
       ,validatorMiddleware
    ]
    
    updateOne = [
        param('id')
            .isMongoId()
            .withMessage((val,{req})=>req.__('invalid_id'))
        ,body('name')
            .optional()
            .isLength({ min: 2, max: 50 }).withMessage((val,{req})=>req.__('validation_length_short'))
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

    changePasswrd=[
        param('id')
        .isMongoId()
        .withMessage((val,{req})=>req.__('invalid_id'))
    ,body('password')
        .notEmpty().withMessage((val,{req})=>req.__('validation_field'))
        .isLength({min:6,max:20}).withMessage((val,{req})=>req.__('validation_length_password'))
     ,body('confirmpassword')
        .notEmpty().withMessage((val,{req})=>req.__('validation_field'))
        .isLength({min:6,max:20}).withMessage((val,{req})=>req.__('validation_length_password'))
        .custom((value:string,{req})=>{
         if (value !== req.body.password) throw new Error (`${req._('validation_password_match')}`)
        })
    ,validatorMiddleware
    ]
}

const usersvalidation = new Usersvalidation;

export default usersvalidation
