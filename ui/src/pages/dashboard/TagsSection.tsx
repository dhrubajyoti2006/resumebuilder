import { useState } from 'react';

import Stack from '@mui/material/Stack';
import { Chip, Grid, TextField } from '@mui/material';

import { Iconify } from '../../components/iconify';

type Props = {
  data: string[];
};

export default function TagsSection({ data }: Props) {
  const [tags, setTags] = useState(data);
  const [inputValue, setInputValue] = useState('');

  // Handle adding a tag when pressing Enter
  const handleAddTag = (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      setTags([...tags, inputValue.trim()]);
      setInputValue('');
    }
  };

  // Handle removing a tag
  const handleRemoveTag = (index: number) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
  };

  return (
    <Stack sx={{ p: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleAddTag}
            label="Add a tag"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12}>
          <Stack direction="row" flexWrap="wrap" spacing={1}>
            {tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                onDelete={() => handleRemoveTag(index)}
                deleteIcon={<Iconify icon="ic:baseline-close" />}
                variant="outlined"
                sx={{ cursor: 'pointer' }}
              />
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
