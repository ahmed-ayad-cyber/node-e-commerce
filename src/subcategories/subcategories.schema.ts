import mongoose from "mongoose";
import {Subcategories} from "./subcategories.interface";

const subcategoriesSchema = new mongoose.Schema<Subcategories>({
    name: {type: String, required: true, trim: true},
    category: {type: mongoose.Schema.Types.ObjectId, ref: 'categories'},
    image: String
}, {timestamps: true});

subcategoriesSchema.pre<Subcategories>(/^find/, function (next) {
    this.populate({path: 'category', select: 'name image'});
    next();
})

export default mongoose.model<Subcategories>('subcategories', subcategoriesSchema);