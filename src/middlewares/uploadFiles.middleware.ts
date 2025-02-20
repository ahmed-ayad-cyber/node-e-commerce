import {Request} from "express";
import multer , { StorageEngine } from 'multer';
import ApiErrors from '../utils/apisErorrs';

// const storage:StorageEngine = multer.diskStorage(
//     {
//         destination:(req,file,cb)=>{
//             cb(null,'uploades/images/products')
//         },
//         filename:(req,file,cb)=>{
//             const ext:string =file.mimetype.split('/')[1]
//             const filename:string=`product-${Date.now()}-cover.${ext}`
//             cb(null,filename)
//         }
//     }
// )

interface Fields {
    name: string;
    maxCount: number;
}


const uploadOptions = (fileTypes: string[]): multer.Multer => {
    const multerStorage: multer.StorageEngine = multer.memoryStorage();
    const multerFilter = function (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback): void {
        const isValidType: boolean = fileTypes.some((type) => file.mimetype.startsWith(type));
        if (isValidType) {
            cb(null, true);
        } else {
            cb(new ApiErrors('the file type is not allowed', 400))
        }

    };
    return multer({storage: multerStorage, fileFilter: multerFilter});
};


export const uploadSingleFile = (filetype:string[],fieldName:string)=> uploadOptions(filetype).single(fieldName)
export const uploadMultiFiles  = (filetype:string[],fields:Fields[])=> uploadOptions(filetype).fields(fields)
