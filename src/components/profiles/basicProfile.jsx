import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from 'next/link';

export default function BasicProfile({ profile }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      {profile.avatar_url ? (
        <CardMedia
          sx={{ height: 140 }}
          image={`/${profile.avatar_url}`}
          title="profile avatar"
          alt="profile avatar"
        />
      ) : (
        <CardMedia
          sx={{ height: 140 }}
          image={'/images/default-veggie.jpg'}
          title="profile avatar"
          alt="profile avatar"
        />
      )}

      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
        >
          Welcome back {profile.firstname} {profile.lastname} !
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
        >
          more user info
        </Typography>
      </CardContent>
      <CardActions>
        <Link href="/profiles/edit">Edit</Link>
      </CardActions>
    </Card>
  );
}
