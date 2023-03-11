import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import React from 'react';
import GlobalStyles from '@mui/material/GlobalStyles';
import { Container } from '@mui/system';

const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Locations'],
  },
  {
    title: 'Features',
    description: ['Cool stuff', 'Random feature', 'Team feature', 'Developer stuff', 'Another one'],
  },
  {
    title: 'Resources',
    description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
  },
];

export const Footer = () => {
  return (
    <>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: theme => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <Grid
          container
          spacing={4}
          justifyContent="space-evenly"
        >
          {footers.map(footer => (
            <Grid
              item
              xs={6}
              sm={3}
              key={footer.title}
            >
              <Typography
                variant="h6"
                color="text.primary"
                gutterBottom
              >
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map(item => (
                  <li key={item}>
                    <Link
                      href="#"
                      variant="subtitle1"
                      color="text.secondary"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

