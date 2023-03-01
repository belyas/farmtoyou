import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

const OrderSummary = ({ order }) => {
  return (
    <List>
      <ListItem>{order.product_title}</ListItem>
      <ListItem>Order ID:{order.id}</ListItem>
      <ListItem>Created at:{order.created_at}</ListItem>
      <ListItem>Product Price:{order.product_price}</ListItem>
      <ListItem>Product Quantity:{order.product_quantity}</ListItem>
      <ListItem>Shpping: free farmer delivery</ListItem>
      <ListItem>Total:{order.total_price}</ListItem>
    </List>
  );
};

export default OrderSummary;
