import { TextFieldProps, TextField } from '@mui/material';

const CustomTextField = (props: TextFieldProps) => {
  return (
    <TextField
      size="small"
      {...props}
    />
  );
};

export default CustomTextField;
