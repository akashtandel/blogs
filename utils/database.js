import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log("MongoDB is already connected");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: 'share_promp',
            useNewUrlParser: true,
            useUnifiedTopology : true,
        })
        isConnected = true;
        console.log("Mongo DB connected");
    } catch (error) {
        console.log(error);
    }
}