import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedsRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';

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

//Convert form data to JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Route for seeding the db with sample products
app.use('/api/seed', seedRouter);

//Route for product requests
app.use('/api/products', productRouter);

//Route for users
app.use('/api/users', userRouter);

//Error Handler
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server listens to http://localhost:${port}`);
});
