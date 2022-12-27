import React, { useEffect, useReducer } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
      <h1>Main Products</h1>
      <div className="products">
        {state.loading ? (
          <div>Loading...</div>
        ) : state.error ? (
          <div>{state.error}</div>
        ) : (
          state.products.map((product) => {
            return (
              <div className="product" key={product.sku}>
                <Link to={`/product/${product.sku}`}>
                  <img src={product.image} alt={product.name} />
                </Link>

                <div className="product-info">
                  <Link to={`/product/${product.sku}`}>
                    <p>{product.name}</p>
                  </Link>
                  <p>
                    <strong>&euro; {product.price}</strong>
                  </p>
                  <button>Add to cart</button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default HomePage;
