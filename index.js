import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import { createServer } from 'http';
import supabase from './config/database.js';
import routes from './routes/index.js';

const port = process.env.PORT;

const app = express();
const server = createServer(app);


app.use(cors());

// JSON middleware for all other routes
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to Ruh!');
});

app.use('/api', routes);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;