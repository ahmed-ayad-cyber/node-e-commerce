import {Document} from "mongoose";
import {Categories} from "../categories/categories.interface";
import { Subcategories } from "../subcategories/subcategories.interface";


export interface products extends Document {
    readonly name: string;
    readonly description:string;
    readonly category: Categories;
    readonly subcategory: Subcategories;
    readonly price :number;
    readonly discount:number;
    readonly priceAfterDiscount:number;
    readonly quantity:number;
    readonly sold:number;
    readonly rate:number;
    readonly rateAvg:number;
    cover: string;
    images:string[];
}