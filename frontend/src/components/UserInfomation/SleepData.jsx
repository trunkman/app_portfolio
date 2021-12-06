import React, { useState } from "react";
// Style
import Box from '@mui/material/Box';
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Typography from "@mui/material/Typography";
// Rechart
import {
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
  Tooltip,
  Legend,
} from "recharts";

// Color
const colorSleepingTime = '#00aced'
// Tickのカスタマイズ
const XAxisTick = ({ x, y, payload }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="end" fill="#fff" transform="rotate(-45)" viewBox="0 0 1024 1024">
        {payload.value}
      </text>
    </g>
  );
}

const useStyles = makeStyles(() =>
  createStyles({
    tabBox: {
      background: '#001e3c',
      borderBottom: 1,
      borderColor: 'divider',
      marginBottom: 3
    }
  }),
);

export const SleepData = ({
  diaries,
}) => {
  const classes = useStyles();
  // 表示データ範囲を選択
  const initialState = diaries.slice(-7, -1);
  const [dataGraph, setDataGraph] = useState(initialState);
  const [tab, setTab] = useState('week');
  const handleChange = (event, newValue) => {
    setTab(newValue);
    newValue === 'week' && setDataGraph(initialState);
    newValue === 'all' && setDataGraph(diaries);
  }

  return (
    <>
      <Typography variant="h5">
        <Box sx={{
          letterSpacing: 6,

          color: '#42a5f5',
        }}>
          <b>睡眠時間の推移</b>
        </Box>
      </Typography>
      <TabContext value={tab}>
        <Box className={classes.tabBox}>
          <TabList value={tab} onChange={handleChange} >
            <Tab label="週間" value="week" />
            <Tab label="全て" value="all" />
          </TabList>
        </Box>
      </TabContext>
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
          label={{
            value: "sleeping hours",
            angle: -90,
            fill: colorSleepingTime,
            position: 'insideLeft',
          }}
          tick={{ stroke: colorSleepingTime }}
          tickCount={6}
          yAxisId={1}
        />
        <Tooltip />
        <Legend
          height={30}
          iconSize={0}
          payload={{ value: '' }}
        />
        <CartesianGrid
          stroke="#334b63"
          vertical={false}
        />
        <Area
          yAxisId={1}
          type="monotone"
          dataKey="groupId"
          dot={{ strokeWidth: 5 }}
          stroke={colorSleepingTime}
          fillOpacity={1}
          fill="rgba(0, 172, 237, 0.2)"
        />
      </ComposedChart>
    </>
  )
}
