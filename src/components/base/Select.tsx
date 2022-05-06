import { MenuItem, TextFieldProps } from '@mui/material';
import CustomTextField from '../biz/CustomTextFiled';

export type SelectProps = TextFieldProps & {
  dataSource: {
    value: string | number | readonly string[];
    label: string;
  }[];
};

const Select = (props: SelectProps) => {
  const { dataSource, ...rest } = props;
  return (
    <CustomTextField {...rest} select>
      {dataSource.map((item) => {
        return <MenuItem value={item.value}>{item.label}</MenuItem>;
      })}
    </CustomTextField>
  );
};

export default Select;
