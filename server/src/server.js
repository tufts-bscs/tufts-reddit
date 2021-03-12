import express, { urlencoded, json } from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import cors from 'cors';

import { router } from './routes/routes';

dotenv.config();

export const configureServer = async () => {
    // start DB
    let dbName;
    switch (process.env.NODE_ENV) {
        case 'production':
            dbName = process.env.DB_CONNECT;
            break;
        case 'test':
            dbName = 'mongodb://127.0.0.1/tufts-reddit-test';
            break;
        default:
            dbName = 'mongodb://127.0.0.1/tufts-reddit';
    }
    await mongoose
        .connect(dbName, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        .then(() => {
            console.log('MongoDB database connected');
        });

    // build server
    const app = express();

    // middlewares
    app.use(
        cors({
            credentials: true,
            origin:
                process.env.NODE_ENV === 'production'
                    ? process.env.FRONTEND_HOST
                    : '*',
        })
    );
    app.use(helmet());
    app.use(cookieParser());
    app.use(json());
    app.use(urlencoded({ extended: true }));
    app.use('/api', router); // TODO: Change how this is done

    // return our configured server
    return { app };
};
