import { Button, TextField } from '@mui/material';
import { useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { equipmentErrorsState, equipmentState, personTemplateState } from '../../store/epic7/equipment';
import { Equipment } from '../../types/epic7';
import { calcEqipmentScore, enhanceMax } from '../../utils/epic7';
import EquipmentEnhancedChart from './ScoreChart';

interface ChartDataItem {
  score: number;
  count: number;
}

const SimulateEnhance = () => {
  const [simulateCount, setSimulateCount] = useState<number>(1);
  const equipmentErrors = useRecoilValue(equipmentErrorsState);
  const equipmentValue = useRecoilValue(equipmentState);
  const personTemplate = useRecoilValue(personTemplateState);

  const [enhancedData, setEnhancedData] = useState<Equipment[]>([]);

  const enhance = () => {
    if (equipmentErrors.length > 0) {
      setEnhancedData(new Array(simulateCount).fill(1).map(() => {
        return enhanceMax(equipmentValue);
      }));
    }
  };

  const chartData = useMemo(() => {
    const scoreMap = new Map<number, number>();
    enhancedData.map((item) => {
      return calcEqipmentScore({
        equipmentProperty: item,
        personTemplate,
      });
    }).forEach((score) => {
      if (scoreMap.get(score) == null) {
        scoreMap.set(score, 1);
      } else {
        scoreMap.set(score, scoreMap.get(score) as number + 1);
      }
    });

    const result: ChartDataItem[] = [];
    scoreMap.forEach((count, score) => {
      result.push({
        count,
        score,
      });
    });

    return result;
  }, [enhancedData, personTemplate]);

  return (
    <div>
      <div>
        <TextField
          id="simulateCount"
          label="强化次数"
          type="number"
          inputProps={{
            min: 0,
          }}
          value={simulateCount}
          onChange={(e) => {
            setSimulateCount(Number(e.target.value));
          }}
        />
        <Button onClick={enhance}>强化</Button>
      </div>
      {
        chartData.length > 0 && (
          <EquipmentEnhancedChart data={chartData} />
        )
      }

    </div>
  );
};

export default SimulateEnhance;
