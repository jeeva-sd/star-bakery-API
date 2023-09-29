import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import orderRoute from './controller/order.js';
import authRoute from './controller/auth.js';
import MongoDBConnection from '../src/database/connection.js';

const app = express();
const port = process.env.PORT || 3001;
const corsOptions = {
    origin: '*'
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/order', orderRoute);

app.get('/', (_req, res) => res.send('Ready to serve!'));

const connectDatabase = () => {
    const database = new MongoDBConnection();
    database.getConnection();
};

app.listen(port, () => {
    connectDatabase();
    console.log(`Chef at ${port}`);
});
