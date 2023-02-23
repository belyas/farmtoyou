
const handleDelete = async () => {
  try {
    //const res = await fetch(`http://api/products/${productId}`, {
      const res = await fetch(`${getURL()}api/products?id=${product.id}`, {
      method: 'DELETE',
    });
    if (res.status === 200) {
      router.push('/products');
    } else {
      throw new Error(`Failed to delete product ${productId}.`);
    }
  } catch (error) {
    console.error(error);
    // handle error
  }
};
export default handleDelete;