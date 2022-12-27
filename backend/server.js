import express from 'express';
import data from './data.js';

const app = express();

app.get('/api/products/', (req, res) => {
  console.log('RQ CAME');
  res.send(data.products);
});

app.get('/api/product/sku/:sku', (req, res) => {
  const product = data.products.find((product) => {
    return product.sku == req.params.sku;
  });

  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server listens to http://localhost:${port}`);
});
