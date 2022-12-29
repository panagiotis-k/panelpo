import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Rating from './Rating';
import { useContext } from 'react';
import { Store } from '../Store';
import axios from 'axios';

export default function Product({ product }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems } = cart;

  const add2cart = async (product) => {
    const existedItem = cartItems.find((prod) => {
      return prod.sku === product.sku;
    });

    const quantity = existedItem ? existedItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/product/sku/${product.sku}`);
    if (data.countInStock < quantity) {
      window.alert('Product out of stock!');
      return;
    }
    dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity } });
  };

  return (
    <Card>
      <Link to={`/product/${product.sku}`}>
        <img src={product.image} alt={product.name} className="card-img-top" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.sku}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating>
        <Card.Text>
          <strong>&euro; {product.price}</strong>
        </Card.Text>
        {product.countInStock === 0 ? (
          <Button disabled variant="light">
            Out of stock
          </Button>
        ) : (
          <Button onClick={() => add2cart(product)}>Add to cart</Button>
        )}
      </Card.Body>
    </Card>
  );
}
