import { Box, Button } from '@mui/material';
import {
  useEffect, useMemo, useRef, useState,
} from 'react';
import { useRecoilValue } from 'recoil';
import { equipmentErrorsState, equipmentState, personTemplateState } from '../../store/epic7/equipment';
import { Equipment } from '../../types/epic7';
import { calcEqipmentScore, enhanceMax } from '../../utils/epic7';
import CustomTextField from './CustomTextField';
import EquipmentEnhancedChart from './ScoreChart';

interface ChartDataItem {
  score: number;
  count: number;
}

const SimulateEnhance = () => {
  const [simulateCount, setSimulateCount] = useState<string>('100');
  const equipmentErrors = useRecoilValue(equipmentErrorsState);
  const equipmentValue = useRecoilValue(equipmentState);
  const personTemplate = useRecoilValue(personTemplateState);

  const [enhancedData, setEnhancedData] = useState<Equipment[]>([]);

  const workerRef = useRef<Worker>();
  useEffect(() => {
    workerRef.current = new Worker('./test.worker.js');
    workerRef.current.onmessage = (e) => {
      setEnhancedData(e.data);
    };
    workerRef.current.onerror = (e) => {
      console.log(e);
    };
    console.log(workerRef);
    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const enhance = () => {
    if (Number(simulateCount) > 10000) {
      workerRef.current?.postMessage({
        equipment: equipmentValue,
        count: simulateCount,
      });
    } else {
      setEnhancedData(new Array(Number(simulateCount)).fill(1).map(() => {
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
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <CustomTextField
          id="simulateCount"
          label="强化次数"
          type="number"
          inputProps={{
            min: 0,
            max: 10000,
          }}
          value={simulateCount}
          onChange={(e) => {
            setSimulateCount(e.target.value);
          }}
        />
        <Button onClick={enhance} disabled={equipmentErrors.length > 0}>强化</Button>
      </Box>
      {
        chartData.length > 0 && (
          <EquipmentEnhancedChart data={chartData} />
        )
      }

    </div>
  );
};

export default SimulateEnhance;
