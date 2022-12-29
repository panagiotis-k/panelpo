import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';

import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Store } from './Store';
import Badge from 'react-bootstrap/Badge';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';

function App() {
  const { state } = useContext(Store);
  const { cart } = state;

  return (
    <div className="d-flex flex-column site-container">
      <BrowserRouter>
        <header>
          <Navbar bg="dark" variant="dark">
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand>panelpo</Navbar.Brand>
              </LinkContainer>
              <Nav className="me-auto mt-1">
                <Link to="/cart" className="nav-link">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill id="bubble-mc" bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
              </Nav>
            </Container>
          </Navbar>
        </header>
        <main>
          <Container className="mt-3">
            <Routes>
              <Route path="/product/:sku" element={<ProductPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<HomePage />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <p className="text-center">&copy; Created by PK</p>
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
