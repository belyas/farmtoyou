import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';

const OrderSummary = ({ order }) => {
  const createdDate = order.created_at.toString().slice(0, 10);
  return (
    <List>
      <ListItem>
        <Typography variant="h5">Product {order.product_title}</Typography>
      </ListItem>
      <ListItem>
        <Typography variant="body1">Order ID: {order.id}</Typography>
      </ListItem>
      <ListItem>
        <Typography variant="body1">Created at: {createdDate}</Typography>
      </ListItem>
      <ListItem>
        <Typography variant="body1">Product Price: € {order.product_price}</Typography>
      </ListItem>
      <ListItem>
        <Typography variant="body1">Product Quantity: {order.product_quantity}</Typography>
      </ListItem>
      <ListItem>
        <Typography variant="body1">Sub Total: {order.total_price}</Typography>
      </ListItem>
      <Divider />
    </List>
  );
};

export default OrderSummary;
