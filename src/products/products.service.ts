import {products} from "./products.interface";
import refactorService from "../refactor.service";
import productsSchema from './products.schema';
import { Request,Response,NextFunction } from "express";
import sharp from 'sharp'
import { uploadMultiFiles, uploadSingleFile } from "../middlewares/uploadFiles.middleware";

class ProductsService {
    getAll = refactorService.getAll<products>(productsSchema,'products');
    createOne = refactorService.createOne<products>(productsSchema);
    getOne = refactorService.getOne<products>(productsSchema);
    updateOne = refactorService.updateOne<products>(productsSchema);
    deleteOne = refactorService.deleteOne<products>(productsSchema);
    
    uploadImages = uploadMultiFiles(['image'],[{name:'cover',maxCount:1},{name:'images',maxCount:5}])
    saveImage= async ( req:Request,res:Response,next:NextFunction) => {
        if (req.files){
            if(req.files.cover){
                const filename:string=`product-${Date.now()}-cover.webp`
                sharp(req.files.cover[0].buffer)
                   .resize(1200,1200)
                   .webp({quality:95})
                   .toFile(`uploades/images/products/${filename}`)
               req.body.cover=filename
            }
            if(req.files.images){
                req.body.images=[]
                await Promise.all(
                    req.files.images.map(async (image:any,index:number)=>{
                        const filename:string=`product-${Date.now()}-image-N${index + 1}.webp`
                        await sharp(image.buffer)
                        .resize(1200,1200)
                        .webp({quality:95})
                        .toFile(`uploades/images/products/${filename}`)
                        req.body.images.push(filename)
                    })
                )
            }
            console.log(req.body)
        }
        next();
    }

}

const productsService = new ProductsService();
export default productsService;