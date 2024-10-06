import Stack from "@mui/material/Stack";
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';

import { Iconify } from '../../components/iconify';

type Props = {
  data: {
    title: string;
    content: string[];
  }[];
};

export default function ExperienceSection({ data }: Props) {
  return (
    <Stack sx={{ p: 2 }}>
      {data.map((experience, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<Iconify icon="ic:baseline-expand-more" />}
            aria-controls={`panel-${index}-content`}
            id={`panel-${index}-header`}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <IconButton>
              <Iconify icon="mi:reorder-alt" />
            </IconButton>
            <Typography variant="body1" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              {experience.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            {experience.content.map((detail, detailIndex) => (
              <Typography key={detailIndex} variant="body2" sx={{ mt: 2 }}>
                {detail}
              </Typography>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </Stack>
  );
}
