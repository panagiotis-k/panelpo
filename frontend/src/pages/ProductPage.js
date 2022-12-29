import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import { useParams, useNavigate } from 'react-router-dom';
import Rating from '../components/Rating';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import { Helmet } from 'react-helmet-async';
import LoadingSpinner from '../components/LoadingSpinner';
import AlertMessage from '../components/AlertMessage';
import { getError } from '../error';
import { Store } from '../Store';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_RQ':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function ProductPage() {
  const params = useParams();
  const navigate = useNavigate();
  const { sku } = params;

  const [state, dispatch] = useReducer(reducer, {
    product: {},
    loading: true,
    error: '',
  });

  useEffect(() => {
    //Fetching products from backend
    const fetchData = async () => {
      dispatch({ type: 'FETCH_RQ' });
      try {
        const result = await axios.get(`/api/product/sku/${sku}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (e) {
        dispatch({ type: 'FETCH_FAIL', payload: getError(e) });
      }

      // setProducts(result.data);
    };
    fetchData();
  }, [sku]);

  const { state: ctxState, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = ctxState;

  const add2cart = async () => {
    console.log('add2cart from product page');
    const existedItem = cart.cartItems.find((prod) => {
      return prod.sku === state.product.sku;
    });

    const quantity = existedItem ? existedItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/product/sku/${state.product.sku}`);
    if (data.countInStock < quantity) {
      window.alert('Product out of stock!');
      return;
    }
    ctxDispatch({
      type: 'ADD_TO_CART',
      payload: { ...state.product, quantity },
    });

    navigate('/cart');
  };

  return state.loading ? (
    <LoadingSpinner />
  ) : state.error ? (
    <AlertMessage variant="danger">{state.error}</AlertMessage>
  ) : (
    <div>
      <Row>
        <Col md={6}>
          <img
            className="img-large"
            src={state.product.image}
            alt={state.product.name}
          ></img>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{state.product.name}</title>
              </Helmet>
              <h1>{state.product.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                rating={state.product.rating}
                numReviews={state.product.numReviews}
              >
                {state.product.name}
              </Rating>
            </ListGroup.Item>
            <ListGroup.Item>
              Price: <strong>&euro; {state.product.price}</strong>
            </ListGroup.Item>
            <ListGroup.Item>
              Description: {state.product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>&euro; {state.product.price}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {state.product.countInStock > 0 ? (
                        <Badge bg="success">In Stock</Badge>
                      ) : (
                        <Badge bg="danger">Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {state.product.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button onClick={add2cart} variant="primary">
                        Add to cart
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
