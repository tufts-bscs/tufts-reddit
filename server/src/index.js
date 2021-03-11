import { configureServer } from './server';

const startServer = async () => {
    // Setup database, middleware and routes
    const { app } = await configureServer();

    // Start the server
    const port = process.env.PORT || 4000;
    app.listen({ port }, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
};
startServer();
