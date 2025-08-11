import mongoose from 'mongoose';

const dbConnect = (url: string) => {
    return mongoose.connect(url);
}

export default dbConnect;