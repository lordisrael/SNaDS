"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const db_1 = __importDefault(require("./config/db"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';
app.get('/', (req, res) => {
    res.status(200).json({ message: 'API is working!' });
});
const start = async () => {
    try {
        let mongoUri;
        if (NODE_ENV === 'production') {
            mongoUri = process.env.MONGO_URI_PROD;
        }
        else {
            mongoUri = process.env.MONGO_URI_DEV;
        }
        if (!mongoUri) {
            throw new Error(`Mongo URI for ${NODE_ENV} not found in .env`);
        }
        // const mongoUri = process.env.MONGO_URI;
        await (0, db_1.default)(mongoUri);
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    }
    catch (error) {
        console.log(error);
    }
};
start();
//# sourceMappingURL=app.js.map