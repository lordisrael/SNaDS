import express from 'express';
import { config } from 'dotenv';
import dbConnect from './config/db';

config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.get('/', (req, res) => {
    res.status(200).json({ message: 'AP is working!' });
});

const start = async () => {
    try {
        let mongoUri;
        if (NODE_ENV === 'production') {
            mongoUri = process.env.MONGO_URI_PROD;
        } else {
            mongoUri = process.env.MONGO_URI_DEV;
        }

        if (!mongoUri) {
            throw new Error(`Mongo URI for ${NODE_ENV} not found in .env`);
        }
        // const mongoUri = process.env.MONGO_URI;
        await dbConnect(mongoUri);
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()