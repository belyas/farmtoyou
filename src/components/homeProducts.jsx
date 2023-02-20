const HomeProducts = ({ productsData }) => {
  const products = productsData.data;
  const productItems = products.map(product => {
    return (
      <ul key={'products-in-home'}>
        <li key={product.id}>
          <h1>{product.title}</h1>
          <p>{product.items}</p>
          <p>{product.price}</p>
        </li>
      </ul>
    );
  });
  return (
    <div>
      <div>{productItems}</div>
    </div>
  );
};

export default HomeProducts;
