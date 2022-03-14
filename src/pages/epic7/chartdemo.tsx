import { Button } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';
import EquipmentEnhancedChart from '../../components/epic7/ScoreChart';
import { randomSelect } from '../../utils/helper';

const scores = new Array(20).fill(0).map((_, index) => {
  return index + 40;
});

interface ChartDataItem {
  score: number;
  count: number;
}

const ChartDemo = () => {
  const [data, setData] = useState<ChartDataItem[]>([]);

  const createData = useCallback(() => {
    const map = new Map<number, number>();

    new Array(1000).fill(0).forEach(() => {
      const score = randomSelect(scores);
      if (!map.get(score)) {
        map.set(score, 0);
      }

      map.set(score, map.get(score) as number + 1);
    });

    const result: ChartDataItem[] = [];
    map.forEach((count, score) => {
      result.push({
        score,
        count,
      });
    });

    setData(result);
  }, []);

  useEffect(() => {
    createData();
  }, [createData]);

  return (
    <div>
      <div>
        <Button onClick={createData}>change</Button>
      </div>
      <EquipmentEnhancedChart data={data} />
    </div>
  );
};

export default ChartDemo;
