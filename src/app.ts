import express from 'express';
import { config } from 'dotenv';
import dbConnect from './config/db';
import notFound from './middleware/not-found';
import eventRoute from './api/routes/event.routes';
import prefrenceRoute from './api/routes/prefrence.routes';
import userRoute from './api/routes/user.routes';

config();

const app = express();


// const notFound = require('./middleware/not-found');
// const eventRoute = require('./api/routes/event.routes');
// const prefrenceRoute = require('./api/routes/prefrence.routes');
// const userRoute = require('./api/routes/user.routes');

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.use(express.json());

app.use('/api/preferences', prefrenceRoute);
app.use('/api/users', userRoute);
app.use('/api/events', eventRoute);

app.use(notFound)
app.get('/', (req, res) => {
    res.status(200).json({ message: 'API is working!' });
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