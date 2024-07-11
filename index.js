import express from 'express';
import router from './src/router/index.js';
import errorHandler from './src/middlewares/errorHandler.js';
import cors from 'cors';
import 'dotenv/config';

const app = express();

const PORT = process.env.PORT || 3333;
app.use(cors('*'));
app.use(express.static('client/dist'));

app.use(express.json());

app.use(router);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
