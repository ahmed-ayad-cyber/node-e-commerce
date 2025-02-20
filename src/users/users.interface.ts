import {Document} from "mongoose";

export interface users extends Document {
    readonly username: string;
    readonly email: string;
    readonly name: string;
    password: string;
    readonly role: Role;
    readonly active: boolean;
    readonly googleId: string;
    hasPassword: boolean;
    passwordChangedAt: Date | number;
    passwordResetCode: string | undefined;
    passwordResetCodeExpires: Date | number | undefined;
    passwordResetCodeVerify: boolean | undefined;
    image: string;
}

type Role= "admin"|'employee'|'user'