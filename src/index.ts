import 'dotenv/config';
import express from 'express';
import routes from '@routes/index';
import connectDB from './db/connect';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

// conect mongodb
void connectDB();

// settings
const PORT = process.env.PORT ?? 4000;

// middlewares
app.use(morgan('dev'));
app.use(cors());

// create routes
app.use('/api', routes);
app.use('/', (req, res) => {
	res.send('Welcome to SIMPLE FACTURA API Server');
});

// up server
app.listen(PORT, () => {
	// eslint-disable-next-line no-console
	console.log('Server on port: ', PORT);
});
