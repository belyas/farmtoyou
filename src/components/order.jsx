const Order = ({ order }) => {
  console.log('order in Order', order);
  return <div>{order.product_title}</div>;
};

export default Order;
