const HomeProducts = ({ productsData }) => {
  const products = productsData.data;
  const productItems = products.map(product => {
    return (
      <li key={product.id}>
        <h1>{product.title}</h1>
        <p>{product.items}</p>
        <p>{product.price}</p>
      </li>
    );
  });
  return (
    <>
      <ul>{productItems}</ul>
    </>
  );
};

export default HomeProducts;
