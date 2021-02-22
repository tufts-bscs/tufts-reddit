import express from 'express';
import helmet from 'helmet';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import path from 'path';
import fs from 'fs';

dotenv.config();

const startServer = async () => {
    const app = express();

    if (fs.existsSync(path.join(__dirname + '/web-build'))) {
        app.use(express.static(path.join(__dirname, '/web-build')));
    }
    app.use(helmet());
    app.use(cookieParser());

    // Checks if this is a production build
    if (fs.existsSync(path.join(__dirname + '/web-build/index.html'))) {
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname + '/web-build/index.html'));
        });
    } else {
        app.get('/', (req, res) => {
            res.send('hello');
        });

        app.get('*', (req, res) => {
            res.send('404');
        });
    }

    const port = process.env.PORT || 4000;
    app.listen({ port }, () =>
        console.log(`Server running at http://localhost:${port}`)
    );
};

startServer();
