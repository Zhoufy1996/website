import {
  Box, MenuItem, Typography,
} from '@mui/material';
import {
  useEffect, useMemo, useRef, useState,
} from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import LoadingButton from '@mui/lab/LoadingButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {
  chartDataTypeState, enhancedDataState, equipmentErrorsState, equipmentState, personTemplateState,
} from '../../../store/epic7/equipment';
import { EquipmentAttributeCode } from '../../../types/epic7';
import { calcEqipmentScore, enhanceMax } from '../../../utils/epic7';
import EquipmentEnhancedChart from './ScoreChart';
import { equipmentAttributeOptions } from '../../../data/epic7';
import CustomTextField from '../../biz/CustomTextFiled';

interface ChartDataItem {
  score: number;
  count: number;
}

const SimulateEnhance = () => {
  const [simulateCount, setSimulateCount] = useState<string>('10000');
  const equipmentErrors = useRecoilValue(equipmentErrorsState);
  const equipmentValue = useRecoilValue(equipmentState);
  const personTemplate = useRecoilValue(personTemplateState);

  const [enhancedData, setEnhancedData] = useRecoilState(enhancedDataState);

  const [loading, setLoading] = useState<boolean>(false);

  const [chartDataType, setChartDataType] = useRecoilState(chartDataTypeState);

  const workerRef = useRef<Worker>();

  useEffect(() => {
    if (window.Worker) {
      workerRef.current = new Worker(new URL('../../../utils/enhance.worker.ts', import.meta.url));
      workerRef.current.addEventListener('message', (e) => {
        setEnhancedData(e.data);
        setLoading(false);
      });

      return () => {
        workerRef.current?.terminate();
      };
    }
    return () => {};
  }, [setEnhancedData]);

  const enhance = () => {
    setLoading(true);
    if (workerRef.current) {
      workerRef.current?.postMessage({
        equipment: equipmentValue,
        count: simulateCount,
      });
    } else {
      setEnhancedData(new Array(Number(simulateCount)).fill(1).map(() => {
        return enhanceMax(equipmentValue);
      }));
      setLoading(false);
    }
  };

  const chartData = useMemo(() => {
    const scoreMap = new Map<number, number>();
    const result: ChartDataItem[] = [];
    if (chartDataType === 'score') {
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
    } else {
      enhancedData.map((equipment) => {
        return equipment.subAttributes.find((attribute) => attribute.code === chartDataType)?.value
         || 0;
      }).forEach((score) => {
        if (scoreMap.get(score) == null) {
          scoreMap.set(score, 1);
        } else {
          scoreMap.set(score, scoreMap.get(score) as number + 1);
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
          {
            Object.entries(equipmentAttributeOptions).sort((left, right) => {
              return left[1].sortNo - right[1].sortNo;
            }).map(([code, options]) => {
              return (
                <MenuItem value={code} key={code}>
                  {options.label}
                </MenuItem>
              );
            })
          }
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
          disabled={equipmentErrors.length > 0}
          variant="contained"
          loadingPosition="end"
          endIcon={(
            <ArrowForwardIcon />
          )}
        >
          强化

        </LoadingButton>
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
