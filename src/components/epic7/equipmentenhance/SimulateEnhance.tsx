import { Box, MenuItem, Typography } from '@mui/material';
import { useEffect, useMemo, useRef, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useRecoilValue } from 'recoil';
import { Equipment, EquipmentAttributeCode } from '../../../types/epic7';
import { calcEqipmentScore, enhanceMax } from '../../../utils/epic7';
import EquipmentEnhancedChart from './ScoreChart';
import { equipmentAttributeOptions } from '../../../data/epic7';
import CustomTextField from '../../biz/CustomTextFiled';
import { equipmentState } from '../../../store/epic7/equipment';
import { selectedTemplateState } from '../../../store/epic7/template';

interface ChartDataItem {
  score: number;
  count: number;
}

const SimulateEnhance = () => {
  const [simulateCount, setSimulateCount] = useState<string>('10000');

  const [enhancedData, setEnhancedData] = useState<Equipment[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  const [chartDataType, setChartDataType] = useState('score');

  const workerRef = useRef<Worker>();

  const equipmentValue = useRecoilValue(equipmentState);

  const personTemplate = useRecoilValue(selectedTemplateState);

  useEffect(() => {
    if (window.Worker) {
      workerRef.current = new Worker(new URL('../../../utils/enhance.worker.ts', import.meta.url));
      workerRef.current.addEventListener('message', (e) => {
        setEnhancedData(e.data);
        setLoading(false);
      });

      workerRef.current.addEventListener('error', () => {
        setLoading(false);
      });

      return () => {
        workerRef.current?.terminate();
      };
    }
    return () => {};
  }, [setEnhancedData]);

  const enhance = () => {
    const equipment: Equipment = {
      ...equipmentValue,
      subAttributes: Object.entries(equipmentValue.subAttributes)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([code, value]) => {
          return value !== '';
        })
        .map(([code, value]) => {
          return {
            code: code as EquipmentAttributeCode,
            value: Number(value),
          };
        }),
    };
    setLoading(true);
    if (workerRef.current) {
      workerRef.current?.postMessage({
        equipment,
        count: simulateCount,
      });
    } else {
      try {
        setEnhancedData(
          new Array(Number(simulateCount)).fill(1).map(() => {
            return enhanceMax(equipment);
          })
        );
      } finally {
        setLoading(false);
      }
    }
  };

  const chartData = useMemo(() => {
    const scoreMap = new Map<number, number>();
    const result: ChartDataItem[] = [];
    if (chartDataType === 'score') {
      enhancedData
        .map((item) => {
          return calcEqipmentScore({
            subAttributes: Object.fromEntries(item.subAttributes.map((data) => [data.code, data.value])),
            personTemplate,
          });
        })
        .forEach((score) => {
          if (scoreMap.get(score) == null) {
            scoreMap.set(score, 1);
          } else {
            scoreMap.set(score, (scoreMap.get(score) as number) + 1);
          }
        });
    } else {
      enhancedData
        .map((equipment) => {
          return equipment.subAttributes.find((attribute) => attribute.code === chartDataType)?.value || 0;
        })
        .forEach((score) => {
          if (scoreMap.get(score) == null) {
            scoreMap.set(score, 1);
          } else {
            scoreMap.set(score, (scoreMap.get(score) as number) + 1);
          }
        });
    }
    scoreMap.forEach((count, score) => {
      result.push({
        count,
        score,
      });
    });
    return result;
  }, [enhancedData, personTemplate, chartDataType]);

  return (
    <div>
      <Typography variant="h6">模拟强化</Typography>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <CustomTextField
          id="chartDataType"
          label="图像x轴"
          type="select"
          select
          value={chartDataType}
          onChange={(e) => {
            setChartDataType(e.target.value as EquipmentAttributeCode | 'score');
          }}
        >
          <MenuItem value="score">分数</MenuItem>
          {Object.entries(equipmentAttributeOptions)
            .sort((left, right) => {
              return left[1].sortNo - right[1].sortNo;
            })
            .map(([code, options]) => {
              return (
                <MenuItem value={code} key={code}>
                  {options.label}
                </MenuItem>
              );
            })}
        </CustomTextField>
        <CustomTextField
          id="simulateCount"
          label="强化次数"
          type="number"
          inputProps={{
            min: 0,
          }}
          value={simulateCount}
          onChange={(e) => {
            setSimulateCount(e.target.value);
          }}
          sx={{
            mr: 1,
          }}
        />
        <LoadingButton
          loading={loading}
          onClick={enhance}
          variant="contained"
          loadingPosition="end"
          endIcon={<ArrowForwardIcon />}
        >
          强化
        </LoadingButton>
      </Box>
      {chartData.length > 0 && <EquipmentEnhancedChart data={chartData} />}
    </div>
  );
};

export default SimulateEnhance;
