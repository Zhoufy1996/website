import { Box, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { equipmentState } from '../../../store/epic7/equipment';
import { selectedTemplateState } from '../../../store/epic7/template';
import { calcEqipmentScore } from '../../../utils/epic7';

const CalcScore = () => {
  const equipmentValue = useRecoilValue(equipmentState);
  const personTemplate = useRecoilValue(selectedTemplateState);

  const score = useMemo(() => {
    return calcEqipmentScore({ subAttributes: equipmentValue.subAttributes, personTemplate });
  }, [equipmentValue, personTemplate]);

  return (
    <Box>
      <Typography variant="h6">结果</Typography>

      <Typography variant="body1">
        分数:
        {score}
      </Typography>
    </Box>
  );
};

export default CalcScore;
