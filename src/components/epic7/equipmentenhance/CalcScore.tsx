import { Box, Typography } from '@mui/material';
import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { equipmentErrorsState, equipmentState, personTemplateState } from '../../../store/epic7/equipment';
import { calcEqipmentScore } from '../../../utils/epic7';

const CalcScore = () => {
  const equipmentErrors = useRecoilValue(equipmentErrorsState);
  const equipmentValue = useRecoilValue(equipmentState);
  const personTemplate = useRecoilValue(personTemplateState);

  const hasError = equipmentErrors.length > 0;
  const score = useMemo(() => {
    if (hasError) {
      return 0;
    }

    return calcEqipmentScore({ equipmentProperty: equipmentValue, personTemplate });
  }, [hasError, equipmentValue, personTemplate]);

  return (
    <Box>
      <Typography variant="h6">结果</Typography>
      {
          hasError ? (
            <div>
              {
                  equipmentErrors.map((error) => {
                    return (
                      <Typography variant="error" key={error}>{error}</Typography>
                    );
                  })
              }
            </div>
          ) : (
            <Typography variant="body1">
              分数:
              {score}
            </Typography>
          )
        }
    </Box>
  );
};

export default CalcScore;
