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


const footers = []

export const Footer = () => {
  return ( 
    <>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <Container className={styles.footer}
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
    <GitHubIcon />
    <EmailIcon />
    <FacebookIcon/>
    <TwitterIcon/>
    <InstagramIcon/>
    <Typography> 
                &copy;FarmToYou.com
                     </Typography>
     </Grid>
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


// import Link from "next/link";
// import { useRouter } from "next/router";
// import { makeStyles } from "@mui/material";
// import { Container, Grid, Typography } from "@mui/material";


// const makeStyles = useStyles() => ({
//   footer: {
//     backgroundColor: theme.palette.primary.main,
//     width: `100%`,
//     position: "relative",
//     overflow: "hidden",
//     marginTop: "6em",
//     padding: "2em 0 ",
//   },
//   link: {
//     fontSize: "1.25em",
//     color: "#fff",
//     "&:hover": {
//       color: theme.palette.info.main,
//     },
//   },
//   copylight: {
//     color: "#fff",
//     fontSize: "1em",
//     "&:hover": {
//       color: theme.palette.info.main,
//     },
//   },
// });

// const Footer = () => {
//   const classes = useStyles();
//   const path = routes;
//   const router = useRouter();
//   return (
//     <footer className={classes.footer}>
//       <Container maxWidth="lg">
//         <Grid container spacing={3} justify="center">
//           {path.map(({ name, link }) => (
//             <Grid item key={link}>
//               <Link href={link}>
//                 <Typography
//                   className={classes.link}
//                   style={{
//                     fontWeight: router.pathname === link && "bold",
//                     borderBottom:
//                       router.pathname === link && "1px solid #757ce8",
//                   }}
//                 >
//                   {name}
//                 </Typography>
//               </Link>
//             </Grid>
//           ))}
//         </Grid>
//         <Grid container direction="column" style={{ margin: "1.2em 0" }}>
//           <Social />
//         </Grid>
//         <Grid
//           item
//           container
//           component={"a"}
//           target="_blank"
//           rel="noreferrer noopener"
//           href="https://satoruakiyama.com"
//           justify="center"
//           style={{
//             textDecoration: "none",
//           }}
//         >

//         </Grid>
//       </Container>
//     </footer>
//   );
// };

// export default Footer;