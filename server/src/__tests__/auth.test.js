import supertest from 'supertest';
import { startServer } from '../server';
import mongoose from 'mongoose';

var server;

describe('Test User Auth', () => {
    beforeAll(async () => {
        // drop database
        await mongoose.connect(
            'mongodb://127.0.0.1/tufts-reddit',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
            },
            () => {
                mongoose.connection.db.dropDatabase();
            }
        );

        // start server
        server = await startServer();
    });

    it('Try to Register', async () => {
        const registrationData = {
            email: 'jane.doe@tufts.edu',
            password: '12345678',
            name: 'Jane Doe',
        };
        const response = await supertest(server)
            .post('/api/auth/register')
            .send(registrationData);

        // TODO: activate the account using this email link
        const emailLink = response.headers['email-link'];

        expect(response.status).toBe(200);
    });

    afterAll(async () => {
        // drop database
        await mongoose.connect(
            'mongodb://127.0.0.1/tufts-reddit',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
            },
            () => {
                mongoose.connection.db.dropDatabase();
            }
        );

        // close server and database
        server.close();
        mongoose.connection.close();
    });
});
