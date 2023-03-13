import { createTable } from './controller/Projeto.js';

import express from 'express';
import router from './routes.js'
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(3000);