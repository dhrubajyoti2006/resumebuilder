import {useState} from 'react';

import Stack from '@mui/material/Stack';
import {Chip, Grid, TextField} from '@mui/material';

import {Iconify} from '../../components/iconify';

type Props = {
  data: string[];
};

export default function SkillSection({data}: Props) {
  const [skills, setSkills] = useState(data);
  const [inputValue, setInputValue] = useState('');

  // Handle adding a skill when pressing Enter
  const handleAddSkill = (e) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      setSkills([...skills, inputValue.trim()]);
      setInputValue('');
    }
  };

  // Handle removing a skill
  const handleRemoveSkill = (index: number) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  return (
    <Stack sx={{p: 2}}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleAddSkill}
            label="Add a skill"
            variant="outlined"
          />
        </Grid>

        <Grid item xs={12}>
          <Stack direction="row" flexWrap="wrap" spacing={1}>
            {skills.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                onDelete={() => handleRemoveSkill(index)}
                deleteIcon={<Iconify icon="ic:baseline-close"/>}
                variant="outlined"
                sx={{cursor: 'pointer'}}
              />
            ))}
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
}
