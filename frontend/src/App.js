import { BrowserRouter, Route, Routes, Link } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <Link to="/">Panelpo</Link>
        </header>
        <main>
          <Routes>
            <Route path="/product/:sku" element={<ProductPage />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
