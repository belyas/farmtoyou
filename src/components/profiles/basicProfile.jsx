import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

export default function BasicProfile({ profile }) {
  return (
    <React.Fragment>
      <Typography
        component="p"
        variant="h4"
      >
        {profile.firstname} {profile.lastname}
      </Typography>
      <Typography
        color="text.secondary"
        sx={{ flex: 1 }}
      >
        {profile.email}
      </Typography>
      <Link href="/profile/edit">Edit</Link>
    </React.Fragment>
  );
}
