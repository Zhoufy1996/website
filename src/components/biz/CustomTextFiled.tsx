import { TextField, TextFieldProps, useTheme, useMediaQuery } from '@mui/material';

const CustomTextField = (props: TextFieldProps) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return <TextField size={matches ? 'medium' : 'small'} {...props} />;
};

export default CustomTextField;
