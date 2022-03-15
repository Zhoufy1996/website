import { Box, Button, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { equipmentErrorsState, equipmentState, personTemplateState } from '../../store/epic7/equipment';
import { calcEqipmentScore } from '../../utils/epic7';

const CalcScore = () => {
  const equipmentErrors = useRecoilValue(equipmentErrorsState);
  const equipmentValue = useRecoilValue(equipmentState);
  const personTemplate = useRecoilValue(personTemplateState);

  const [score, setScore] = useState<number>(0);

  const handleCalcScore = useCallback(() => {
    if (equipmentErrors.length > 0) {
      return 0;
    }

    return calcEqipmentScore({ equipmentProperty: equipmentValue, personTemplate });
  }, [equipmentValue, equipmentErrors, personTemplate]);

  const handleSetScore = useCallback(() => {
    setScore(handleCalcScore());
  }, [handleCalcScore]);

  const hasError = equipmentErrors.length > 0;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Button
          variant="outlined"
          onClick={handleSetScore}
          sx={{
            mr: 1,
          }}
          disabled={hasError}
        >
          算分
        </Button>

        {
            !hasError && (
              <Typography variant="body1">
                分数:
                {score}
              </Typography>
            )
          }

      </Box>
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
          ) : null
      }

    </Box>
  );
};

export default CalcScore;
