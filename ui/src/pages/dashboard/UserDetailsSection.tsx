import type {IUserItem} from 'src/types/user';

import {z as zod} from 'zod';
import {useMemo} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

import {Grid} from "@mui/material";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import {Label} from 'src/components/label';
import {toast} from 'src/components/snackbar';
import {Form, Field, schemaHelper} from 'src/components/hook-form';

import TagsSection from "./TagsSection";
import {fData} from "../../utils/format-number";

// ----------------------------------------------------------------------

export type NewUserSchemaType = zod.infer<typeof NewUserSchema>;

export const NewUserSchema = zod.object({
  imageUrl: schemaHelper.file({ message: { required_error: 'Avatar is required!' } }),
  name: zod.string().min(1, { message: 'Name is required!' }),
  email: zod
    .string()
    .min(1, { message: 'Email is required!' })
    .email({ message: 'Email must be a valid email address!' }),
});

// ----------------------------------------------------------------------

type Props = {
  data: IUserItem;
};

export function UserDetailsSection({ data }: Props) {
  const defaultValues = useMemo(
    () => ({
      imageUrl: data.imageUrl || null,
      name: data.name || '',
      tags: data.tags || '',
      email: data.email || ''
    }),
    [data]
  );

  const methods = useForm<NewUserSchemaType>({
    mode: 'onSubmit',
    resolver: zodResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (formData) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      toast.success(data ? 'Update success!' : 'Create success!');
      console.info('DATA', formData);
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3} sx={{m: 1}}>
        <Grid xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            {data && (
              <Label
                color={(values.status === 'active' && 'success') || (values.status === 'banned' && 'error') || 'warning'}
                sx={{ position: 'absolute', top: 24, right: 24 }}
              >
                {values.status}
              </Label>
            )}

            <Box sx={{ mb: 5 }}>
              <Field.UploadAvatar
                name="imageUrl"
                maxSize={3145728}
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 3,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.disabled',
                    }}
                  >
                    Allowed *.jpeg, *.jpg, *.png, *.gif
                    <br /> max size of {fData(3145728)}
                  </Typography>
                }
              />
            </Box>
          </Card>
        </Grid>

        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
            >
              <Field.Text name="name" label="Full name" />
              <Field.Text name="email" label="Email address" />
            </Box>
          </Card>
        </Grid>
      </Grid>

      <Typography variant="subtitle1" sx={{ mt: 3, mb: 2 }}>Tagline</Typography>
      <TagsSection data={data.tags}/>

      <Typography variant="subtitle1" sx={{ mt: 3, mb: 2 }}>About</Typography>
      <Field.Editor name="about" sx={{ maxHeight: 680 }} />

      <Typography variant="subtitle1" sx={{ mt: 3, mb: 2 }}>Profile Summary</Typography>
      <Field.Editor name="profileSummary" sx={{ maxHeight: 680 }} />

      <Stack alignItems="flex-end" sx={{ mt: 3 }}>
        <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
          {data ? 'Save changes' : 'Create user'}
        </LoadingButton>
      </Stack>
    </Form>
  );
}
