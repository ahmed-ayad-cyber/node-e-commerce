
import {body} from "express-validator";
import usersSchema from "../users/users.schema";
import validatorMiddleware from "../middlewares/validator.middleware";

class AuthValidation {
    signup = [
        body('username').notEmpty().withMessage((val, {req}) => req.__('validation_field'))
            .isLength({min: 2, max: 50}).withMessage((val, {req}) => req.__('validation_length_short'))
            .custom(async (val: string, {req}) => {
                const user = await usersSchema.findOne({username: val});
                if (user) throw new Error(`${req.__('validation_email_check')}`);
                return true;
            }),
        body('email').notEmpty().withMessage((val, {req}) => req.__('validation_field'))
            .isEmail().withMessage((val, {req}) => req.__('validation_value'))
            .custom(async (val: string, {req}) => {
                const user = await usersSchema.findOne({email: val});
                if (user) throw new Error(`${req.__('validation_email_check')}`);
                return true;
            }),
        body('name')
            .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
            .isLength({min: 2, max: 50}).withMessage((val, {req}) => req.__('validation_length_short')),
        body('password')
            .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
            .isLength({min: 6, max: 20}).withMessage((val, {req}) => req.__('validation_length_password')),
        body('confirmPassword')
            .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
            .isLength({min: 6, max: 20}).withMessage((val, {req}) => req.__('validation_length_password'))
            .custom((val: string, {req}) => {
                if (val !== req.body.password) throw new Error(`${req.__('validation_password_match')}`);
                return true;
            }),
        validatorMiddleware
    ]
    login = [
        // body('username').notEmpty().withMessage((val, {req}) => req.__('validation_field')),
        body().custom((value, { req }) => {
            if (!req.body.username && !req.body.email) {
                throw new Error(req.__('validation_field')); // رسالة خطأ عامة إذا لم يتم إدخال أي منهما
            }
            return true;
        }),
        body('password')
            .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
            .isLength({min: 6, max: 20}).withMessage((val, {req}) => req.__('validation_length_password')),
        validatorMiddleware
    ]
    forgetPassword = [
        body('email')
        .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
        .isEmail().withMessage((val, {req})=> req.__('validation_value'))
        ,validatorMiddleware
    ]
    changePassword = [
        body('password')
            .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
            .isLength({min: 6, max: 20}).withMessage((val, {req}) => req.__('validation_length_password')),
        body('confirmPassword')
            .notEmpty().withMessage((val, {req}) => req.__('validation_field'))
            .isLength({min: 6, max: 20}).withMessage((val, {req}) => req.__('validation_length_password'))
            .custom((val: string, {req}) => {
                if (val !== req.body.password) throw new Error(`${req.__('validation_password_match')}`);
                return true;
            }),
        validatorMiddleware
    ]
}

const authValidation = new AuthValidation();

export default authValidation;