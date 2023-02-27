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

const theme = createTheme();

export default function CartOverview({ Items }) {
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
        maxWidth="sm"
        sx={{ mb: 4 }}
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
                  <TableCell>Item Image</TableCell>
                  <TableCell>Item Name</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Items.map(item => (
                  <TableRow key={item.id}>
                    <TableCell
                      component="th"
                      scope="row"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                      />
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell align="right">{item.price}</TableCell>
                    <TableCell align="right">{item.quantity}</TableCell>
                    <TableCell align="right">{item.price * item.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <React.Fragment>
            <Button variant="contained">Go to Checkout!</Button>
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
