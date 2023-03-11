import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function SearchInput() {
  const router = useRouter();
  const [input, setInput] = useState('');
  console.log(input);
  const handleKeyDown = event => {
    if (event.key == 'Enter') {
      router.push({ pathname: '/search', query: { q: input } });
    }
  };
  return (
    <Box
      sx={{
        width: 500,
        maxWidth: '100%',
        display: 'flex',

        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <input
        label="search"
        id="search-mobile"
        class="search-input"
        placeholder="search"
        value={input}
        onChange={event => {
          setInput(event.target.value);
        }}
        onKeyDown={handleKeyDown}
      />
    </Box>
  );
}
