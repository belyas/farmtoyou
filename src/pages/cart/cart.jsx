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
import DeleteIcon from '@mui/icons-material/DeleteForever';
import { useState, useEffect } from 'react';

const theme = createTheme();

export default function CartOverview() {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    if (localStorage.getItem('cart')) {
      setCart(JSON.parse(localStorage.getItem('cart')));
    }
  }, []);

  //WIP
  //  const handleRemoveItem = () => {
  //     cart.remove(item.id);
  //  }

  const totalPrice = cart.reduce((accumulator, cart) => accumulator + cart.price * cart.quantity, 0);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
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
                  <TableCell>Item Photo</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Total</TableCell>
                  <TableCell align="center">Options</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cart.map(item => (
                  <TableRow key={item.id}>
                    <TableCell
                      component="th"
                      scope="row"
                    >
                      <img
                        src={item.photo}
                        alt={item.title}
                      />
                    </TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell align="right">{item.price}</TableCell>
                    <TableCell align="right">{item.quantity}</TableCell>
                    <TableCell align="right">{item.price * item.quantity}</TableCell>
                    <TableCell align="center">
                      <Grid
                        item
                        xs={4}
                      >
                        <Button
                          onClick={() => {
                            handleRemoveItem(item.id);
                          }}
                        >
                          <DeleteIcon />
                        </Button>
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
          <h3>Total Price: {totalPrice} </h3>
          <Button variant="contained">Go to Checkout!</Button>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
