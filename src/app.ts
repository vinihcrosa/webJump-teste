import express, { Router } from 'express';
import morgan from 'morgan';
import { router } from './routes';

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/public', express.static('public'))

app.use(router)

export { app }