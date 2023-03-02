import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Link from 'next/link';
import { Typography } from '@mui/material';

export const getServerSideProps = async ctx => {
  const supabase = createServerSupabaseClient(ctx);

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  //check user type
  try {
    const { data, error } = await supabase.from('profiles').select('user_type').eq('id', session.user.id).single();
    console.log('user type', data);
    if (data.user_type.toUpperCase() === 'FARMER') {
      //get farmer id
      try {
        const { data, error } = await supabase.from('farmers').select('id').eq('profile_id', session.user.id).single();

        const farmerId = data.id;
        console.log('farmer id ', farmerId);
        //query orders data with farmer id
        if (data) {
          const { data } = await supabase.from('orders').select('*').eq('farmer_id', farmerId);
          console.log('farmer orders', data);
          return {
            props: {
              orders: data,
            },
          };
        }
      } catch (error) {
        return { props: { data: 'Internal Server Error.', error } };
      }
    }
  } catch (error) {
    return { props: { data: 'Internal Server Error.', error } };
  }

  const { data } = await supabase.from('orders').select('*').eq('profile_id', session.user.id);
  console.log('customer orders', data);

  return {
    props: {
      orders: data,
    },
  };
};

const Orders = ({ orders }) => {
  return (
    <>
      {orders.length ? (
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650 }}
            aria-label="orders table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Order id</TableCell>
                <TableCell align="right">Created at</TableCell>
                <TableCell align="right">Total Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                  >
                    <Link href={`/orders/${order.id}`}>{order.id}</Link>
                  </TableCell>

                  <TableCell align="right">{order.created_at}</TableCell>
                  <TableCell align="right">{order.total_amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div>
          <Typography variant="h5">You have not ordered anything yet. </Typography>
          <Link href="/">
            <Typography variant="body1">Back to home</Typography>
          </Link>
        </div>
      )}
    </>
  );
};

export default Orders;
