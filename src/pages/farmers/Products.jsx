import React from 'react';
import { useState, useEffect } from 'react';

export default function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch('localhost:3000/api/products/add');
      const data = await res.json();
      setProducts(data);
    }
    fetchData();
  }, []);
  return (
    <div>
      <h1>List of Farmers Products!</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>{product.quantity}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

