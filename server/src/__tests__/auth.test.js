import supertest from 'supertest';
import mongoose from 'mongoose';

import { configureServer } from '../server';
import { User } from '../models/User';
import { Token } from '../models/Token';

let server;

beforeAll(async (done) => {
    // start server
    const { app } = await configureServer();
    server = app.listen(5000);
    done();
});

test('ATTEMPT TO REGISTER', async () => {
    const registrationData = {
        email: 'jane.doe@tufts.edu',
        password: '12345678',
    };

    const response = await supertest(server)
        .post('/api/auth/register')
        .send(registrationData);

    expect(response.status).toBe(200);
    expect(response.text).toEqual('Successful registration');

    const user = await User.updateOne(
        { email: registrationData.email },
        { isVerified: true }
    );
    await Token.deleteOne({ userId: user._id });
});

afterAll(async (done) => {
    // close server and database
    await server.close();
    await dropAllCollections();
    await mongoose.connection.close().then(() => done());
});

const dropAllCollections = async () => {
    const collections = Object.keys(mongoose.connection.collections);
    for (const collectionName of collections) {
        const collection = mongoose.connection.collections[collectionName];
        try {
            await collection.drop();
        } catch (error) {
            if (error.message === 'ns not found') return;
            if (
                error.message.includes(
                    'a background operation is currently running'
                )
            )
                return;

            console.log(error.message);
        }
    }
};
