import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from 'next/link';

export default function BreadCrumbs() {
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link href="/">Home</Link>
        <Link href={`/${child}`}>{child}</Link>
        <Typography color="text.primary">{grandChild}</Typography>
      </Breadcrumbs>
    </>
  );
}
