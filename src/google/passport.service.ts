import passport from "passport";
import dotenv from "dotenv";
import {Strategy as GoogleStrategy} from "passport-google-oauth20";
import usersSchema from "../users/users.schema";
import createTokens from "../utils/token";


dotenv.config();

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL: process.env.GOOGLE_CALLBACK!
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await usersSchema.findOne({googleId: profile.id});
            if (!user) {
                let checkUser = await usersSchema.findOne({email: profile._json.email});
                if (checkUser) {
                    console.log(checkUser)
                    if ((!checkUser.image || checkUser.image.split('/').pop() === 'user-default.jpg') && profile._json.picture) checkUser.image = profile._json.picture
                    else checkUser.image = checkUser.image
                    checkUser.googleId = profile.id;
                    await checkUser.save({validateModifiedOnly: true});
                } else {
                    checkUser = await usersSchema.create({
                        name: profile._json.name,
                        email: profile._json.email,
                        image: profile._json.picture,
                        hasPassword: false,
                        googleId: profile.id
                    });
                }
                console.log(checkUser)
                user = checkUser;
            }
            const token = createTokens.accessToken(user?._id, user?.role!)
            done(null, {token});
        } catch (err) {
            done(err, false)
        }
    })
)