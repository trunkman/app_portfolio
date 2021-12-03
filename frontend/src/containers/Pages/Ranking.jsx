import React, { useEffect, useReducer, useState } from "react";
// Style
import Box from '@mui/material/Box';
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Typography from '@mui/material/Typography';
// Api
import { fetchSleepHoursRank, fetchReadingRank, fetchReadBooksRank, fetchStackBooksRank } from '../../apis/rankings'
// Reducer
import { rankReducer, rankInitialState } from '../../reducer/RankingReducer'
// Component
import { Loading } from "../../components/Loading"
import { RankUser } from "../../components/Lists/RankUser";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      alignItems: 'center',
      border: 1,
      justifyContent: 'center',
      maxWidth: 1000,
      textAlign: 'center',
      width: '100%',
    },
    tabBox: {
      alignContent: 'center',
      display: 'flex',
      justifyContent: 'spece_between',
    },
  }),
);

export const Ranking = () => {
  const classes = useStyles();
  const [tab, setTab] = useState('sleepingHours');
  const [rankState, rankDispatch] = useReducer(rankReducer, rankInitialState);

  // 睡眠時間平均上位6名を取得する
  const SleepHoursRank = () => {
    rankDispatch({ type: 'fetching' })
    fetchSleepHoursRank()
      .then(data => {
        rankDispatch({
          type: 'fetchSuccessSleepHours',
          payload: data.sleeping_hours_rank,
        });
      });
  }

  // 読了数上位6名を取得する

  // 読了本の人気6冊を取得する

  // 積読本の人気6冊を取得する



  useEffect(() => {
    SleepHoursRank();
  }, [])

  return (
    <Box className={classes.root}>
      <Typography variant="h3" sx={{ width: '100%' }}>
        <Box sx={{ letterSpacing: 10, pb: 2 }}><b>睡眠時間のランキング</b></Box>
      </Typography>
      <TabContext value={tab}>
        <Box>
          <TabList
            onChange={(event, newTab) => { setTab(newTab) }}
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab
              label="ユーザー平均睡眠時間"
              value="sleepingHours"
              sx={{ typography: 'h6', fontWeight: 'bold' }}
            />
            <Tab
              label="ユーザー読了数"
              value="reading"
              sx={{ typography: 'h6', fontWeight: 'bold' }}
            />
            <Tab
              label="読了人気本"
              value="read_books"
              sx={{ typography: 'h6', fontWeight: 'bold' }}
            />
            <Tab
              label="積読人気本"
              value="stack_books"
              sx={{ typography: 'h6', fontWeight: 'bold' }}
            />
          </TabList>
        </Box>
        <TabPanel value="sleepingHours">
          <Box className={classes.tabBox}>
            {
              rankState.fetchState != 'ok' ? <Loading /> :
                rankState.sleepHours.map(sleepingHour =>
                  <RankUser
                    user={sleepingHour.user}
                    rank={sleepingHour.rank}
                    average={sleepingHour.average}
                  />
                )
            }
          </Box>
        </TabPanel>
        <TabPanel value="reading">
          <p>ここにランキングを表示</p>
          {/* {
            rankState.fetchState != 'ok' ? <Loading /> :
              rankState.reading.map(user =>
              )
          } */}
        </TabPanel>
        <TabPanel value="read_books">
          <p>ここにランキングを表示</p>
          {/* {
            rankState.fetchState != 'ok' ? <Loading /> :
              rankState.read_books.map(user =>
              )
          } */}
        </TabPanel>
        <TabPanel value="stack_books">
          <p>ここにランキングを表示</p>
          {/* {
            rankState.fetchState != 'ok' ? <Loading /> :
              rankState.stack_books.map(user =>
              )
          } */}
        </TabPanel>
      </TabContext>
    </Box>


  )
}
