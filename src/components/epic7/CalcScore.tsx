import { Button, Typography } from '@mui/material';
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

  return (
    <div>
      <Button onClick={() => {
        handleSetScore();
      }}
      >
        算分
      </Button>
      {
          equipmentErrors.length > 0 ? (
            <div>
              {
                    equipmentErrors.map((error) => {
                      return (
                        <Typography variant="body1" key={error}>{error}</Typography>
                      );
                    })
                }
            </div>
          ) : null
      }
      <Typography variant="body1">
        分数:
        {score}
      </Typography>
    </div>
  );
};

export default CalcScore;
