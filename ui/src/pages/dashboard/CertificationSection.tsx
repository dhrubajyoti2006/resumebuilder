import { useState } from 'react';

import Stack from "@mui/material/Stack";
import Typography from '@mui/material/Typography';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';

import { Iconify } from '../../components/iconify';

type Props = {
  data: {
    id: number;
    title: string;
    organization: string;
    date: string;
    description: string;
  }[];
};

export default function CertificationSection({ data }: Props) {
  const [certifications] = useState(data);

  // const handleRemoveCertification = (index: number) => {
  //   const updatedCertifications = certifications.filter((_, i) => i !== index);
  //   setCertifications(updatedCertifications);
  // };

  return (
    <Stack sx={{ p: 2 }}>
      {certifications.map((certification, index) => (
        <Accordion key={certification.id}>
          <AccordionSummary
            expandIcon={<Iconify icon="ic:baseline-expand-more" />}
            aria-controls={`panel-${certification.id}-content`}
            id={`panel-${certification.id}-header`}
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <Typography variant="body1" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
              {certification.title} from {certification.organization}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="subtitle2" color="text.secondary">
              {certification.date}
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
              {certification.description}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Stack>
  );
}
