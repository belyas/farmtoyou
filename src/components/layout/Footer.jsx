import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import React from 'react';
import GlobalStyles from '@mui/material/GlobalStyles';
import { Container } from '@mui/system';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import styles from '@/styles/Footer.module.css';
import { ClassNames } from '@emotion/react';

const footers = [
  {
    title: <HelpOutlineIcon />,
  },
  {
    title: <GitHubIcon />,
  },
  {
    title: <EmailIcon />,
  },
  {
    title: <LocationOnIcon />,
  },
];

export const Footer = () => {
  return (
    <>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <Container
        maxWidth="xl"
        component="footer"
        sx={{
          borderTop: theme => `1px solid ${theme.palette.divider}`,
          mt: 4,
          py: [2, 4],
        }}
      >
        <Grid
          container
          justifyContent="center"
        >
          {footers.map(footer => (
            <Grid
              item
              xs={6}
              sm={3}
              key={footer.title}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              <Typography
                variant="h6"
                color="text.primary"
                gutterBottom
              >
                {footer.title}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};
