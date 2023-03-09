import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HomeProducts from '../homeProducts';
import { Footer } from './Footer';

export default function HomeLayout({ productsData }) {
  return (
    <>
      {/* Hero unit */}

      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="text.primary"
        gutterBottom
      >
        Fresh produce at your proximity
      </Typography>
      <Typography
        variant="h5"
        align="center"
        color="text.secondary"
        paragraph
      >
        Discover a new way of grocery shopping. <br></br>Farm to you brings fresh local produce directly to your
        kitchen.
      </Typography>
      <Stack
        sx={{ pt: 4 }}
        direction="row"
        spacing={2}
        justifyContent="center"
      >
        <Button variant="contained">Learn More</Button>
        <Button variant="outlined">About Us</Button>
      </Stack>

      <Container sx={{ py: 8 }}>
        {/* End hero unit */}
        <Grid
          container
          spacing={0}
        >
          <Typography
            component="h1"
            variant="h4"
            align="center"
            color="text.primary"
            gutterBottom
            sx={{ pb: 4 }}
          >
            Best product for you
          </Typography>
          <HomeProducts productsData={productsData} />
        </Grid>
      </Container>
    </>
  );
}
