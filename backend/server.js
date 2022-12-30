import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedsRoutes.js';
import productRouter from './routes/productRoutes.js';

dotenv.config();
mongoose.set('strictQuery', true);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to  db');
  })
  .catch((e) => {
    console.log(e.message);
  });

const app = express();
app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server listens to http://localhost:${port}`);
});
