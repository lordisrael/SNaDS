import express from 'express';
import { config } from 'dotenv';
import dbConnect from './config/db';
import notFound from './middleware/not-found';
import eventRoute from './api/routes/event.routes';
import prefrenceRoute from './api/routes/prefrence.routes';
import userRoute from './api/routes/user.routes';
import logRoute from './api/routes/log.routes';
import { initKafka } from './services/queue.service';
import { startWorker } from './jobs/notification.consumer';
import { initLogProducer } from './services/logger.service';
import { startLogConsumer } from './jobs/logs.consumer';
import errorHandlerMiddleware from './middleware/errorhandler';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import * as YAML from 'yamljs';
import * as swaggerUi from 'swagger-ui-express';


config();

const app = express();


app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100
    })
)


// const notFound = require('./middleware/not-found');
// const eventRoute = require('./api/routes/event.routes');
// const prefrenceRoute = require('./api/routes/prefrence.routes');
// const userRoute = require('./api/routes/user.routes');

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/api/preferences', prefrenceRoute);
app.use('/api/users', userRoute);
app.use('/api/events', eventRoute);
app.use('/api/logs', logRoute);

app.get('/', (req, res) => {
    res.send(
    '<h1>Smart Notification and Deivery System API</h1><a href="/api-docs">Documentation</a>'
  );
});

const swaggerDocument = YAML.load('./swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(notFound);
app.use(errorHandlerMiddleware);


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
        console.log(`Connected to MongoDB in ${NODE_ENV} mode`);

        // ✅ Connect to Kafka producer & consumer before starting server
        await initKafka();
        await initLogProducer()
        console.log("Kafka connected");
        startWorker();
        startLogConsumer()
        
        
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()