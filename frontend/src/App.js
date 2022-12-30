import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
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
import ShippingAddressPage from './pages/ShippingAddressPage.js';
import SignUpPage from './pages/SignUpPage';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_LOGOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
  };

  return (
    <div className="d-flex flex-column site-container">
      <BrowserRouter>
        <ToastContainer position="bottom-center" limit={1}></ToastContainer>
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

                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>
                        <i class="fas fa-user"></i> User Profile
                      </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={signoutHandler}
                    >
                      Log out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                )}
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
              <Route path="/shipping" element={<ShippingAddressPage />} />
              <Route path="/signup" element={<SignUpPage />} />
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
