import { Request, Response, Express } from "express";
import express from 'express'

import { customErrorHandler, DefaultErrorHandler } from "./middleware/errorHandler";
import dataSource from "./db/dbConfig";

const app: Express = express();
const PORT: Number = 3000;

app.use(express.json());
//app.use('/', );

app.use(customErrorHandler);
app.use(DefaultErrorHandler);

dataSource.initialize().then(() => {
    console.log('Connected to DB');
}).catch(err => {
    console.error('Failed to connect to DB: ' + err);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
