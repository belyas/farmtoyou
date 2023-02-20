import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getURL } from '@/utils';
import { useSession, useUser } from '@supabase/auth-helpers-react';
import Link from 'next/link';

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const user = useUser();

  useEffect(() => {
    if (!user) {
      return;
    }
    console.log('user', user);
    async function fetchData() {
      const res = await fetch(`${getURL()}api/products?id=${user.id}`);
      const { data } = await res.json();

      setProducts(data);
    }

    fetchData();
  }, [user]);

  return products;
};

export default function Products() {
  const products = useProducts();
  const session = useSession();

  if (!session) {
    return <Link href="/">Click here to login</Link>;
  }

  return (
    <>
      <h3>Products: </h3>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, maxWidth: 990 }}
          aria-label="products"
        >
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map(product => (
              <TableRow
                key={product.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                >
                  {product.id}
                </TableCell>
                <TableCell align="center">{product.title}</TableCell>
                <TableCell align="center">{product.description}</TableCell>
                <TableCell align="center">{product.price}</TableCell>
                <TableCell align="center">{product.quantity}</TableCell>
                <TableCell align="center">&nbsp;</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
