import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from 'next/link';

export default function BreadCrumbs({ child, grandChild }) {
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link href="/">Home</Link>
        <Link href={`/${child.toLowerCase()}`}>{child}</Link>
        {grandChild ? <Typography color="text.primary">{grandChild}</Typography> : null}
      </Breadcrumbs>
    </>
  );
}
