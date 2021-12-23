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

const useStyles = makeStyles(() =>
  createStyles({
    tabBox: {
      background: '#001e3c',
      borderBottom: 1,
      borderColor: 'divider',
      marginBottom: 15,
    }
  }),
);
const colorSleepingTime = '#00aced'
const CustomXAxisTick = ({ x, y, payload }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16}
        textAnchor="end"
        fill="#fff"
        transform="rotate(-45)"
        viewBox="0 0 1024 1024"
        fontSize={12}
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
      </div>
    );
  }
  return null;
};

export const SleepData = ({
  diaries,
}) => {
  const classes = useStyles();
  // 表示データ範囲を選択
  const initialState = diaries.slice(-7);
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
              label="ALL"
              value="all"
              sx={{ typography: 'subtitle1' }}
            />
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
          tick={<CustomXAxisTick />}
          hight={60}
        />
        <YAxis
          domain={[5, 'dataMax + 1']}
          label={{
            value: "sleeping hours",
            angle: -90,
            fill: '#fff',
            position: 'insideLeft',
          }}
          tick={{ stroke: '#fff', fontSize: 12 }}
          tickCount={6}
          yAxisId={1}
        />
        <Tooltip content={<CustomTooltip />} />
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
