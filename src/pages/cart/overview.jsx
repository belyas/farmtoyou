import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import RemoveFromCartButton from '@/components/cart/RemoveFromCartButton';
import { CartContext } from '@/components/cart/cartContext';
import { useContext } from 'react';
import { CardMedia } from '@mui/material';
import Link from 'next/link';
import Box from '@mui/material/Box';
import BreadCrumbs from '@/components/breadCrumbs';

const theme = createTheme();

const CartOverview = () => {
  const { cart } = useContext(CartContext);

  console.log(cart.cart);

  const totalPrice = cart.cart.reduce((accumulator, cart) => accumulator + cart.price * cart.quantity, 0);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ pb: 3 }}>
        <BreadCrumbs child={'Cart'} />
      </Box>
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: t => `1px solid ${t.palette.divider}`,
        }}
      ></AppBar>
      <Container
        component="main"
        sx={{ width: 900, margin: '0 auto' }}
      >
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography
            component="h1"
            variant="h4"
            align="center"
          >
            Cart Overview
          </Typography>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="right">ID</TableCell>
                  <TableCell align="right">Item Photo</TableCell>
                  <TableCell align="right">Title</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Total</TableCell>
                  <TableCell align="center">Options</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.cart.map(item => (
                  <TableRow key={item.id}>
                    <TableCell align="right">{item.id}</TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                    >
                      <CardMedia
                        sx={{ height: 50, backgroundSize: 'contain' }}
                        image={
                          item.photo && item.photo.endsWith('.jpg')
                            ? `/uploads/products/${item.photo}`
                            : '/images/default-veggie.jpg'
                        }
                        title="placeholder kitten"
                      />
                    </TableCell>
                    <TableCell align="right">{item.title}</TableCell>
                    <TableCell align="right">{item.price}</TableCell>
                    <TableCell align="right">{item.quantity}</TableCell>
                    <TableCell align="right">{item.price * item.quantity}</TableCell>
                    <TableCell align="center">
                      <Grid
                        item
                        xs={4}
                      >
                        <RemoveFromCartButton id={item.id} />
                      </Grid>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
      <Container
        component="child"
        sx={{ width: 900, margin: '0 auto' }}
      >
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <h3>Total quantity: {cart.totalQuantity()}</h3>
          <h3>Total Price: {totalPrice} </h3>

          {cart.cart.length > 0 && (
            <Button
              style={{ textDecoration: 'none' }}
              onClick={cart.clear}
            >
              Clear cart
            </Button>
          )}
          {cart.cart.length > 0 && (
            <Link
              href="/checkout"
              style={{ textDecoration: 'none' }}
            >
              {' '}
              <Button variant="contained">Go to Checkout!</Button>{' '}
            </Link>
          )}
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default CartOverview;
