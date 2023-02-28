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

  const { data } = await supabase.from('orders').select('*').eq('profile_id', session.user.id);
  console.log('orders', data);

  return {
    props: {
      orders: data,
    },
  };
};

const Orders = ({ orders }) => {
  console.log(orders);
  return (
    <>
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
                  <Link href="/">{order.id}</Link>
                </TableCell>

                <TableCell align="right">{order.created_at}</TableCell>
                <TableCell align="right">{order.total_amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Orders;
