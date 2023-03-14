import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import React from 'react';
import GlobalStyles from '@mui/material/GlobalStyles';
import { Container } from '@mui/system';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import styles from '@/styles/Footer.module.css';
import InstagramIcon from '@mui/icons-material/Instagram';

const footers = [];

export const Footer = () => {
  return (
    <>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <Container
        className={styles.footer}
    
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
          <Link>
          <GitHubIcon  href="https://github.com/belyas/farmtoyou" target="blank"/></Link>
          <EmailIcon />
          <FacebookIcon />
          <TwitterIcon />
          <InstagramIcon />
          <Typography>&copy;FarmToYou,2023.All rights reserved.</Typography>
        </Grid>   
      </Container>
    </>
  );
};
