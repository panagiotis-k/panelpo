import './App.css';
import data from './data';

function App() {
  return (
    <div className="App">
      <header><a href="/">Panelpo</a></header>
      <main>
        <h1>Main Products</h1>
        <div className="products">
          {data.products.map(product=>{
              return (
                <div className='product' key={product.sku}>
                    <a href={`/product/${product.sku}`}>
                      <img src={product.image} alt={product.name}></img>
                    </a>
                    
                    <div className="product-info">
                      <a href={`/product/${product.sku}`}>
                        <p>{product.name}</p>
                      </a>
                      <strong>&euro; {product.price}</strong>
                    </div>
                </div>
              );
          })}
        </div>
      </main>
    </div>
  );
}

export default App;
