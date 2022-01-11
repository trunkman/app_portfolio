import React, { useState } from "react";
// Style
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { theme } from '../../styled/theme'
import Typography from "@mui/material/Typography";
// Rechart
import {
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
  Tooltip,
} from "recharts";

const TabBox = styled('box')(() => ({
  background: '#001e3c',
  borderBottom: 1,
  borderColor: 'divider',
}));

const SubTitle = styled('box')(({ theme }) => ({
  fontWeight: theme.typography.h5.fontWeight,
  letterSpacing: theme.typography.h5.letterSpacing,
  lineHeight: 2,
}));

const CustomXAxisTick = ({ x, y, payload }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16}
        textAnchor="end"
        fill="#fff"
        transform="rotate(-45)"
        viewBox="0 0 1024 1024"
        fontSize={10}
      >
        {payload.value}
      </text>
    </g>
  );
}
const CustomTooltip = ({ payload, label }) => {
  if (payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p>日付 : {`${label}`}</p>
        <p>睡眠時間 : {`${payload[0].value}`} 時間</p>
      </div >
    );
  }
  return null;
};

export const SleepGraph = ({ diaries }) => {
  const [dataGraph, setDataGraph] = useState(null);
  const [tab, setTab] = useState('week');

  // タブ移動する
  const handleChange = (event, newValue) => {
    setTab(newValue);
    newValue === 'week' && setDataGraph(diaries.slice(-7));
    newValue === 'month' && setDataGraph(diaries.slice(-30));
  }

  return (
    <>
      <Typography variant="h5">
        <SubTitle>《睡眠時間の推移》</SubTitle>
      </Typography>
      <TabContext value={tab}>
        <TabBox>
          <TabList
            value={tab}
            onChange={handleChange}
            variant="fullWidth"
          >
            <Tab
              label="週間"
              value="week"
              sx={{ typography: 'subtitle1' }}
            />
            <Tab
              label="月間"
              value="month"
              sx={{ typography: 'subtitle1' }}
            />
          </TabList>
        </TabBox>
      </TabContext>
      <Box sx={{ pt: 5 }}>
        <ComposedChart
          width={1000}
          height={450}
          data={dataGraph || diaries.slice(-7)}
        >
          <XAxis
            dataKey="startStr"
            height={50}
            tick={<CustomXAxisTick />}
          />
          <YAxis
            domain={[5, 'dataMax + 1']}
            label={{
              value: '[ 睡 眠 時 間 ]',
              angle: -90,
              fill: '#fff',
              position: 'insideLeft',
            }}
            tick={{ stroke: '#fff', fontSize: 12 }}
            tickCount={6}
            yAxisId={1}
          />
          <Tooltip content={<CustomTooltip />} />
          <CartesianGrid
            stroke={theme.palette.primary.dark}
            vertical={false}
          />
          <Area
            yAxisId={1}
            type="monotone"
            dataKey="groupId"
            dot={{ strokeWidth: 5 }}
            stroke={theme.palette.secondary.main}
            fillOpacity={1}
            fill="rgba(0, 172, 237, 0.2)"
          />
        </ComposedChart>
      </Box>
    </>
  )
}
