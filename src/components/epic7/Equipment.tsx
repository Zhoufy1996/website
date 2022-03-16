import {
  Divider, Typography,
} from '@mui/material';
import EnhancedLevel from './equipment/EnhancedLevel';
import SubProperty from './equipment/SubProperty';
import Quality from './equipment/Quality';
import Type from './equipment/Type';
import PrimaryProperty from './equipment/PrimaryProperty';
import Level from './equipment/Level';

const Equipment = () => {
  return (
    <div>
      <Typography variant="h6">装备</Typography>
      <Type />
      <Level />
      <Quality />
      <PrimaryProperty />
      <EnhancedLevel />
      <Divider />
      <SubProperty />
    </div>
  );
};

export default Equipment;
