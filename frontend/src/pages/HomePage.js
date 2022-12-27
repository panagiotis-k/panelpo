import React, { useEffect, useReducer } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_RQ':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomePage() {
  // const [products, setProducts] = useState([]);
  const [state, dispatch] = useReducer(reducer, {
    products: [],
    loading: true,
    error: '',
  });
  console.log('render');

  useEffect(() => {
    fetchData();
  }, []);

  //Fetching products from backend
  const fetchData = async () => {
    dispatch({ type: 'FETCH_RQ' });
    try {
      const result = await axios.get('/api/products');
      dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
    } catch (e) {
      dispatch({ type: 'FETCH_FAIL', payload: e.message });
    }

    // setProducts(result.data);
  };

  return (
    <div>
      <Helmet>
        <title>panelpo</title>
      </Helmet>
      <h1>Main Products</h1>
      <div className="products">
        {state.loading ? (
          <div>Loading...</div>
        ) : state.error ? (
          <div>{state.error}</div>
        ) : (
          <Row>
            {state.products.map((product) => {
              return (
                <Col key={product.sku} m={6} md={4} lg={3} className="mb-3">
                  <Product product={product}></Product>
                </Col>
              );
            })}
          </Row>
        )}
      </div>
    </div>
  );
}

export default HomePage;
