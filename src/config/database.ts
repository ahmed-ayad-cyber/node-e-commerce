import mongoose from "mongoose";

const dbConnection = () => {
    mongoose.connect(process.env.DB!)
        .then(() => {
            console.log("Connected to DB");
        })
};

export default dbConnection;