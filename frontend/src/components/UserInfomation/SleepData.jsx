import React from "react";
import {
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  Line,
} from "recharts";

//表示させたいデータ群
const dataGraph = [
  { date: "2021/11/1", sleeping_hours: 7.5, feeling: '不調' },
  { date: "2021/11/2", sleeping_hours: 9, feeling: '普通' },
  { date: "2021/11/3", sleeping_hours: 8, feeling: '好調' },
  { date: "2021/11/4", sleeping_hours: 6.5, feeling: '不調' },
  { date: "2021/11/5", sleeping_hours: 7, feeling: '好調' },
  { date: "2021/11/6", sleeping_hours: 6, feeling: '普通' },
];

export const SleepData = ({

}) => {
  return (
    <>
      <h3>
        Testさんの睡眠時間と感情の変移
      </h3>

      <ComposedChart
        width={1000}
        height={280}
        data={dataGraph}
        margin={{ top: 20, right: 60, bottom: 0, left: 0 }}
      >
        <XAxis
          dataKey="date"
        />
        <YAxis
          yAxisId={1}
          domain={[5, 'dataMax + 1']}
          label={{ value: "睡眠時間", angle: -90 }}
          tickCount={6}
          type="number"
        />
        <YAxis
          yAxisId={2}
          orientation="right"
          tickCount={4}
          type="category"
        />
        <Tooltip />
        <Legend />
        <CartesianGrid
          stroke="#f5f5f5"
          vertical={false}
        />
        <Area
          yAxisId={1}
          type="monotone"
          dataKey="sleeping_hours"
          stroke="#00aced"
          fillOpacity={1}
          fill="rgba(0, 172, 237, 0.2)"
        />

        <Line
          yAxisId={2}
          type="monotoneX"
          dataKey="feeling"
          stroke="#2250A2"
        />
      </ComposedChart>
    </>
  )
}
