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
import { Loading } from "../Items/Loading"
import { RankBook } from "../../components/Lists/RankBook";
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
      flexWrap: 'wrap',
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
    fetchSleepHoursRank()
      .then(data => {
        rankDispatch({
          type: 'fetchSuccessSleepHours',
          payload: data.sleeping_hours_rank,
        });
      });
  }
  // 読了数上位6名を取得する
  const ReadingRank = () => {
    fetchReadingRank()
      .then(data => {
        rankDispatch({
          type: 'fetchSuccessReading',
          payload: data.reading_rank,
        });
      });
  }
  // 読了本の人気6冊を取得する
  const ReadBooksRank = () => {
    fetchReadBooksRank()
      .then(data => {
        rankDispatch({
          type: 'fetchSuccessReadBooks',
          payload: data.read_books_rank,
        });
      });
  }
  // 積読本の人気6冊を取得する
  const StackBooksRank = () => {
    fetchStackBooksRank()
      .then(data => {
        rankDispatch({
          type: 'fetchSuccessStackBooks',
          payload: data.stack_books_rank,
        });
      });
  }

  useEffect(() => {
    rankDispatch({ type: 'fetching' })
    tab === 'sleepingHours' && SleepHoursRank();
    tab === 'reading' && ReadingRank();
    tab === 'readBooks' && ReadBooksRank();
    tab === 'stackBooks' && StackBooksRank();
  }, [tab])

  return (
    <Box className={classes.root}>
      <Typography variant="h3" sx={{ width: '100%' }}>
        <Box sx={{ letterSpacing: 10, pb: 3 }}><b>ランキング</b></Box>
      </Typography>
      <TabContext value={tab}>
        <Box>
          <TabList
            onChange={(event, newTab) => { setTab(newTab) }}
            variant="fullWidth"
          // textColor="primary"
          // indicatorColor="primary"
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
              value="readBooks"
              sx={{ typography: 'h6', fontWeight: 'bold' }}
            />
            <Tab
              label="積読人気本"
              value="stackBooks"
              sx={{ typography: 'h6', fontWeight: 'bold' }}
            />
          </TabList>
        </Box>
        <TabPanel value="sleepingHours">
          <Typography variant="h5" sx={{ width: '100%' }}>
            <Box sx={{ letterSpacing: 6, py: 2 }}><b>【ユーザー平均睡眠時間】</b></Box>
          </Typography>
          <Box className={classes.tabBox}>
            {rankState.fetchState !== 'ok'
              ? <Loading />
              : rankState.sleepHours.map(sleepingHour =>
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
          <Typography variant="h5" sx={{ width: '100%' }}>
            <Box sx={{ letterSpacing: 6, py: 2 }}><b>【ユーザー読了数】</b></Box>
          </Typography>
          <Box className={classes.tabBox}>
            {rankState.fetchState !== 'ok'
              ? <Loading />
              : rankState.reading.map(reading =>
                <RankUser
                  user={reading.user}
                  rank={reading.rank}
                  count={reading.count}
                />
              )
            }
          </Box>
        </TabPanel>
        <TabPanel value="readBooks">
          <Typography variant="h5" sx={{ width: '100%' }}>
            <Box sx={{ letterSpacing: 6, py: 2 }}><b>【読了人気本】</b></Box>
          </Typography>
          <Box className={classes.tabBox}>
            {rankState.fetchState !== 'ok'
              ? <Loading />
              : rankState.readBooks.map(readBooks =>
                <RankBook
                  book={readBooks.book}
                  rank={readBooks.rank}
                  countRead={readBooks.count}
                />
              )
            }
          </Box>
        </TabPanel>
        <TabPanel value="stackBooks">
          <Typography variant="h5" sx={{ width: '100%' }}>
            <Box sx={{ letterSpacing: 6, py: 2 }}><b>【積読人気本】</b></Box>
          </Typography>
          <Box className={classes.tabBox}>
            {rankState.fetchState !== 'ok'
              ? <Loading />
              : rankState.stackBooks.map(stackBooks =>
                <RankBook
                  book={stackBooks.book}
                  rank={stackBooks.rank}
                  countStack={stackBooks.count}
                />
              )
            }
          </Box>
        </TabPanel>
      </TabContext>
    </Box>


  )
}
