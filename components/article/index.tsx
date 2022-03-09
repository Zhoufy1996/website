import {
  Box, BoxProps, Paper, PaperProps, Typography, TypographyProps,
} from '@mui/material';

export const Title = (props: TypographyProps) => {
  const { sx = {}, ...rest } = props;
  return (
    <Typography variant="h6" sx={{ textAlign: 'center', ...sx }} {...rest} />
  );
};

export const ContainerBox = (props: BoxProps) => {
  return (
    <Box
      sx={{
        height: '100%', display: 'flex', flexDirection: 'column', padding: 1,
      }}
      {...props}
    />
  );
};

export const FullBox = (props: BoxProps) => {
  return (
    <Box
      sx={{
        height: '100%', display: 'flex', flex: 1, justifyContent: 'center',
      }}
      {...props}
    />
  );
};

export const FullPaper = (props:PaperProps) => {
  return (
    <Paper sx={{ height: '100%' }} {...props} />

  );
};
