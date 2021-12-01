import React, { PureComponent } from "react";
// Style
import Box from '@mui/material/Box';
import { Emoji } from 'emoji-mart';
import Typography from "@mui/material/Typography";
import {
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Area,
  Scatter,
} from "recharts";

//表示させたいデータ群
const dataGraph = [
  { startStr: "2021/11/1", groupId: 6, title: 'dizzy_face', feelingLabel: 1 },
  { startStr: "2021/11/2", groupId: 7, title: 'neutral_face', feelingLabel: 2 },
  { startStr: "2021/11/3", groupId: 9, title: 'satisfied', feelingLabel: 3 },
  { startStr: "2021/11/4", groupId: 6.3, title: 'dizzy_face', feelingLabel: 1 },
  { startStr: "2021/11/5", groupId: 7.9, title: 'satisfied', feelingLabel: 3 },
  { startStr: "2021/11/6", groupId: 7, title: 'neutral_face', feelingLabel: 2 },
];

// Color
const colorSleepingTime = '#00aced'
const colorFeeling = '#ffe1c3'

// Tickのカスタマイズ
const XAxisTick = ({ x, y, payload }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="end" fill="#fff" transform="rotate(-30)" viewBox="0 0 1024 1024">
        {payload.value}
      </text>
    </g>
  );
}


// const YAxisTick = ({ payload }) => {
//   return (
//     <text>{payload.value}</text>
//     // <Emoji emoji={emoji} size={20} />
//   );
// }


export const SleepData = ({
  diaries,
}) => {
  return (
    <>
      <Typography variant="h6">
        <Box sx={{
          letterSpacing: 6,
          my: 3,
          color: '#42a5f5',
        }}>
          睡眠時間と感情の推移
        </Box>
      </Typography>

      <ComposedChart
        width={1000}
        height={400}
        data={dataGraph}
      >
        <XAxis
          dataKey="startStr"
          padding={{ left: 10, right: 10 }}
          tick={<XAxisTick />}
          hight={60}
        />
        <YAxis
          domain={[5, 'dataMax + 1']}
          label={{ value: "睡 眠 時 間", angle: -90, fill: colorSleepingTime, position: 'insideLeft' }}
          tick={{ stroke: colorSleepingTime }}
          tickCount={6}
          yAxisId={1}
        />
        <YAxis
          domain={[0.5, 3.5]}
          hide
          yAxisId={2}
        />
        <YAxis
          orientation="right"
          type="category"
          tick={{ stroke: colorFeeling }}
          padding={{ top: 60, bottom: 60 }}
          yAxisId={3}
        />
        <CartesianGrid
          stroke="#334b63"
          vertical={false}
        />


        <Area
          yAxisId={1}
          type="monotone"
          dataKey="groupId"
          stroke={colorSleepingTime}
          fillOpacity={1}
          fill="rgba(0, 172, 237, 0.2)"
        />
        <Scatter
          yAxisId={2}
          dataKey="feelingLabel"
          fill={colorFeeling}
          shape='diamond'
        />
        <Scatter
          yAxisId={3}
          dataKey="title"
          fill="rgba(255, 255, 195, 0)"
        />
      </ComposedChart>
    </>
  )
}
