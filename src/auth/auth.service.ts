import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import usersSchema from "../users/users.schema";
import bcrypt from "bcryptjs"
import ApiErrors from "../utils/apisErorrs";
import createTokens from "../utils/token";
import sanitization from "../utils/sanitizatin";
import jwt from "jsonwebtoken";


class AuthService {
    signup = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const user = await usersSchema.create({
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            email: req.body.email,
            image: req.body.image
        });
        const token = createTokens.accessToken(user._id, user.role);
        res.status(201).json({token, data: sanitization.User(user)});
    });

    login = asyncHandler( async (req: Request, res: Response, next: NextFunction)=>{
        const user = await usersSchema.findOne(
            {$or: [{username: req.body.username}, {email: req.body.email}]})
        if(!user || user.hasPassword ==false || !(await bcrypt.compare(req.body.password,user.password)))
            return next (new ApiErrors(`${req.__('invalid_login')}`,400))
        const token = createTokens.accessToken(user._id, user.role);
        res.status(200).json({token,data:sanitization.User(user)})
    })

    protectedRoutes = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        let token: string = '';
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
            token = req.headers.authorization.split(' ')[1];
        else return next(new ApiErrors(`ahmed`, 401));
        
        console.log(`Extracted Token:${token}`);
        
        
        const decoded: any = await jwt.verify(token, process.env.JWT_KEY!);
        const user = await usersSchema.findById(decoded._id);
        if (!user) return next(new ApiErrors(`${req.__('check_login')}`, 401));
        
        console.log("Extracted decod:", decoded);
        if (user.passwordChangedAt instanceof Date) {
            const changedPasswordTime: number = Math.trunc(user.passwordChangedAt.getTime() / 1000);
            if (changedPasswordTime > decoded.iat) return next(new ApiErrors(`${req.__('check_password_changed')}`, 401));
        }
        req.user = user;
        next();
    })

    allowedTo = (...roles: string[]) =>
        asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        if (!roles.includes(req.user.role)) return next(new ApiErrors(`${req.__('allowed_to')}`, 403));
        next();
    })

    checkActive = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        if (!req.user.active) return next(new ApiErrors(`${req.__('check_active')}`, 403));
        next();
    })
}

const authService = new AuthService;
export default authService