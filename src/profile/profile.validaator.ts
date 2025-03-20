import { body, param } from "express-validator"
import validatorMiddleware from "../middlewares/validator.middleware"
import bcrypt from 'bcryptjs'


class Profilevalidation {
    updateOne = [
        body('name')
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

    createPasswrd=[
    body('password')
        .notEmpty().withMessage((val,{req})=>req.__('validation_field'))
        .isLength({min:6,max:20}).withMessage((val,{req})=>req.__('validation_length_password'))
    ,body('confirmpassword')
        .notEmpty().withMessage((val,{req})=>req.__('validation_field'))
        .isLength({min:6,max:20}).withMessage((val,{req})=>req.__('validation_length_password'))
        .custom((value:string,{req})=>{
         if (value !== req.body.password) throw new Error (`${req._('validation_password_match')}`)
            return true
        }),validatorMiddleware
    ]

    changePasswrd=[
    body('currentpassword').notEmpty().withMessage((val,{req})=>req.__('validation_field')).isLength({min:6,max:20}).withMessage((val,{req})=>req.__('validation_length_password'))
        .custom(async (value:string,{req})=>{
            const isvalidPassword= await bcrypt.compare(value,req.user.password)
            if (!isvalidPassword) throw new Error (`${req._('validation_value')}`)
            return true
        })
    ,body('password').notEmpty().withMessage((val,{req})=>req.__('validation_field')).isLength({min:6,max:20}).withMessage((val,{req})=>req.__('validation_length_password'))
    ,body('confirmpassword').notEmpty().withMessage((val,{req})=>req.__('validation_field')).isLength({min:6,max:20}).withMessage((val,{req})=>req.__('validation_length_password'))
        .custom((value:string,{req})=>{
         if (value !== req.body.password) throw new Error (`${req._('validation_password_match')}`)
            return true
        })
    ,validatorMiddleware
    ]
}

const profilevalidation = new Profilevalidation;

export default profilevalidation
