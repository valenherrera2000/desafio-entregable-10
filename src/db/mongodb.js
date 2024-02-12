import mongoose from "mongoose";
import config from '../config/config.js';

export const init = async () => {
    try{
        const URI = config.MONGO_URI;
        await mongoose.connect(URI);
        console.log('Database connected')
    } catch(error){
        console.log('An error has occurred', error.message)
    }
};

