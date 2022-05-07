import { MenuItem, TextFieldProps } from '@mui/material';
import CustomTextField from '../biz/CustomTextFiled';

export type SelectProps = TextFieldProps & {
  dataSource: {
    value: string | number;
    label: string;
  }[];
};

const Select = (props: SelectProps) => {
  const { dataSource, ...rest } = props;
  return (
    <CustomTextField {...rest} select>
      {dataSource.map((item) => {
        return (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        );
      })}
    </CustomTextField>
  );
};

export default Select;
