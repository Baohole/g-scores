import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

export const connect = async (): Promise<void> => {
    try {
        const uri = process.env.MONGO_URL;
        await mongoose.connect(uri);
        console.log('Database connect success!')
    }
    catch (err) {
        console.log('Database connect failed!', err)
    }
}