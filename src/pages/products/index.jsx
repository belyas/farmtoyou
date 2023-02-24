import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import DeleteIcon from '@mui/icons-material/DeleteForever';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { getURL } from '@/utils';
import { useRouter } from 'next/navigation';

export async function getServerSideProps(ctx) {
  const supabase = createServerSupabaseClient(ctx);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  try {
    let { error, data: products = [] } = await supabase
      .from('products')
      .select('*, farmers ( profile_id )')
      .eq('farmers.profile_id', session.user.id);

    // TODO: improve the above query to only return rows related to current farmer
    if (products.length > 0) {
      products = products.filter(product => product.farmers?.profile_id === session.user.id);
    }

    if (error) {
      throw typeof error === 'string' ? new Error(error) : error;
    }

    return { props: { products, initialSession: session } };
  } catch (error) {
    return { props: { data: 'Internal Server Error.', error, initialSession: null } };
  }
}

export default function Products({ products }) {
  const route = useRouter();
  const deleteHandler = async id => {
    try {
      const res = await fetch(`${getURL()}api/products?id=${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        throw new Error(`Failed to delete product with ${res.statusText}.`);
      }

      route.push('/products');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h3>Products: </h3>
      <Button
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        onClick={() => route.push('/products/add')}
      >
        Add new product
      </Button>
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
                <TableCell align="center">
                  <Grid
                    item
                    xs={4}
                  >
                    <Button
                      onClick={() => {
                        deleteHandler(product.id);
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
    </>
  );
}
