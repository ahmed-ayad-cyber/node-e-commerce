import mongoose from "mongoose";
import {users} from "./users.interface";
import bcrypt from 'bcryptjs'

const usersSchema = new mongoose.Schema<users>({
    username:{type:String,required:true,unique:true},
    email:{type:String,required:true,unique:true},
    name: {type: String, required: true},
    active: {type: Boolean, default: true},
    password: {type: String},
    role: {type: String, enum:['user', 'admin','employee'],default:"user"},
    googleId: String,
    image: { type: String, default: 'user.jpg' }, 
    hasPassword:{type: Boolean, default: true},
    passwordChangedAt:Date,
    passwordResetCode:String,
    passwordResetCodeExpires:Date,
    passwordResetCodeVerify:Boolean
}, {timestamps: true});


const imagesUrl= (document:users) => {
    if(document.image && document.image.startsWith('user')) document.image = `${process.env.BASE_URL}/images/users/${document.image}`
    
} 

usersSchema
    .post('init',imagesUrl)
    .post('save',imagesUrl)


usersSchema.pre<users>('save', async function (next) {
        if (!this.isModified('password')) return next();
        this.password = await bcrypt.hash(this.password, 13);
        next();
    })

export default mongoose.model<users>('users', usersSchema);
