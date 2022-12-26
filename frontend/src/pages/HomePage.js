import React from "react";
import { Link } from "react-router-dom";
import data from "../data.js";

export default function HomePage() {
  return (
    <div>
      <h1>Main Products</h1>
      <div className="products">
        {data.products.map((product) => {
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
        })}
      </div>
    </div>
  );
}
