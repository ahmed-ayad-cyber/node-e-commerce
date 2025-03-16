import { Request, Response, NextFunction } from "express";
import { users } from "./users.interface";
import refactorService from "../refactor.service";
import usersSchema from "./users.schema";
import asyncHandler from "express-async-handler";
import ApiErrors from "../utils/apisErorrs";
import { uploadSingleFile } from "../middlewares/uploadFiles.middleware";
import sharp from "sharp";
import bcrypt from 'bcryptjs'

class UsersService {
    getAll = refactorService.getAll<users>(usersSchema);
    createOne = refactorService.createOne<users>(usersSchema);
    getOne = refactorService.getOne<users>(usersSchema);
    updateOne = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const user: users | null = await usersSchema.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            image: req.body.image,
            active: req.body.active
        }, { new: true })
        if (!user) return next(new ApiErrors(`${req.__('not_found')}`, 404));
        res.status(200).json({ data: user })
    })
    changePassword = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const user: users | null = await usersSchema.findByIdAndUpdate(req.params.id, {
            password: await bcrypt.hash(req.body.password, 13),
            passwordChangedAt: Date.now(),
            active: req.body.active
        }, { new: true })
        if (!user) return next(new ApiErrors(`${req.__('not_found')}`, 404));
        res.status(200).json({ data: user })
    })
    deleteOne = refactorService.deleteOne<users>(usersSchema);

    uploadImage = uploadSingleFile(['image'], 'image')
    saveImage = async (req: Request, res: Response, next: NextFunction) => {
        if (req.file) {
            const fileName: string = `user-${Date.now()}-image.webp`;
            await sharp(req.file.buffer)
                .resize(1200, 1200)
                .webp({quality: 95})
                .toFile(`uploades/images/users/${fileName}`);
            req.body.image = fileName;
        }
        next();
    }
}

const usersService = new UsersService();
export default usersService;








