import { useState } from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';

import { Iconify } from '../../components/iconify';

type Props = {
  data: {
    title: string,
    content: Array<string>,
  }[];
};

export default function EducationSection({ data }: Props) {
  const [education] = useState(data);

  // const handleRemoveEducation = (index: number) => {
  //   const updatedEducation = education.filter((_, i) => i !== index);
  //   setEducation(updatedEducation);
  // };

  return (
    <Stack sx={{ p: 2 }}>
      {education.map((edu, index) => (
        <Accordion>
          <AccordionSummary
            expandIcon={<Iconify icon="ic:baseline-expand-more" />}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Typography variant="body1" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              {edu.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="subtitle2" color="text.secondary">
              {edu.content[0]}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Stack>
  );
}
