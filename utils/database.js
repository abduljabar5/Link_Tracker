import mongoose from "mongoose";


let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log('mongodb is connected');
        return;
    }
    try {
        console.log('go');
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "LinkTracker",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        isConnected = true;

        console.log("mongodb connected");
    } catch (error) {

        console.log(error, ';keys messed up');
    }
}  