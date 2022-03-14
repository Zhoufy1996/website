import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
} from 'chart.js';
import { useEffect, useRef } from 'react';

interface ChartDataItem {
  score: number;
  count: number;
}

interface EquipmentEnhancedChartProps {
  data: ChartDataItem[]
}
Chart.register(
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
);
/**
   *
   */
const EquipmentEnhancedChart = ({ data }: EquipmentEnhancedChartProps) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current != null) {
      const countSum = data.reduce((acc, cur) => {
        return acc + cur.count;
      }, 0);
      const scoreCountMap = new Map<number, number>();
      data.forEach((item) => {
        scoreCountMap.set(item.score, item.count);
      });

      const getGreaterOrEqualCountSum = (score: number) => {
        let result = 0;
        scoreCountMap.forEach((value, key) => {
          if (key >= score) {
            result += value;
          }
        });
        return result;
      };

      const sortData = data.sort((l, r) => {
        return r.score - l.score;
      }).map((dataItem) => {
        return {
          score: dataItem.score,
          count: dataItem.count,
          rate: Number((dataItem.count / countSum).toFixed(2)),
          accumulatedRate: Number((getGreaterOrEqualCountSum(dataItem.score) / countSum)
            .toFixed(2)),
        };
      });

      const chart = new Chart(ref.current, {
        type: 'bar',
        data: {
          datasets: [
            {
              label: '概率',
              data: sortData.map((item) => item.rate),
              // yAxisID: 'y',
              backgroundColor: 'red',
            },
            {
              label: '累计概率',
              data: sortData.map((item) => item.accumulatedRate),
              type: 'line',
              backgroundColor: 'blue',
              // yAxisID: 'y2',
            },
          ],
          labels: sortData.map((item) => item.score),
        },
        options: {
          scales: {
            y: {
              type: 'linear',
              position: 'left',
            },
            y2: {
              type: 'linear',
              position: 'right',
            },
          },
        },
      });
      return () => {
        chart.destroy();
      };
    }
    return () => {};
  }, [data]);
  return (
    <div style={{ width: 400, height: 300 }}>
      <canvas ref={ref} />
    </div>
  );
};

export default EquipmentEnhancedChart;
