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
import getFarmerId from '@/utils/getFarmerId';

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
  const farmerId = await getFarmerId(session.user.id);

  if (farmerId) {
    const { data } = await supabase.from('orders').select('*').eq('farmer_id', farmerId);
    return {
      props: {
        orders: data,
        initialSession: session,
      },
    };
  }

  const { data } = await supabase.from('orders').select('*').eq('profile_id', session.user.id);

  return {
    props: {
      orders: data,
      initialSession: session,
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
          <Typography variant="h5">You do not have orders yet. </Typography>
          <Link href="/">
            <Typography variant="body1">Back to home</Typography>
          </Link>
        </div>
      )}
    </>
  );
};

export default Orders;
