import React, { useEffect, useReducer, useState } from "react";
// Style
import Box from '@mui/material/Box';
import { styled } from '@mui/system';
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
import { RankBookList } from "../../components/Lists/RankBookList";
import { RankUserList } from "../../components/Lists/RankUserList";

const Container = styled('box')(() => ({
  alignItems: 'center',
  border: 1,
  justifyContent: 'center',
  maxWidth: 1000,
  textAlign: 'center',
  width: '100%',
}));

const Title = styled('box')(({ theme }) => ({
  fontWeight: theme.typography.h2.fontWeight,
  letterSpacing: theme.typography.h2.letterSpacing,
  lineHeight: 2,
}));

const SubTitle = styled('box')(({ theme }) => ({
  fontWeight: theme.typography.h5.fontWeight,
  letterSpacing: theme.typography.h5.letterSpacing,
  lineHeight: 3,
}));

const TabBox = styled('box')(() => ({
  alignContent: 'center',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'spece_between',
}));

export const Ranking = () => {
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
    <Container>
      <Typography variant="h2" sx={{ width: '100%' }}>
        <Title>≪ ランキング ≫</Title>
      </Typography>
      <TabContext value={tab}>
        <Box>
          <TabList
            onChange={(event, newTab) => { setTab(newTab) }}
            variant="fullWidth"
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
            <SubTitle>【ユーザー平均睡眠時間】</SubTitle>
          </Typography>
          <TabBox>
            {rankState.fetchState !== 'ok'
              ? <Loading />
              : rankState.sleepHours.map(sleepingHour =>
                <RankUserList
                  user={sleepingHour.user}
                  rank={sleepingHour.rank}
                  average={sleepingHour.average}
                />
              )
            }
          </TabBox>
        </TabPanel>
        <TabPanel value="reading">
          <Typography variant="h5" sx={{ width: '100%' }}>
            <SubTitle>【ユーザー読了数】</SubTitle>
          </Typography>
          <TabBox>
            {rankState.fetchState !== 'ok'
              ? <Loading />
              : rankState.reading.map(reading =>
                <RankUserList
                  user={reading.user}
                  rank={reading.rank}
                  count={reading.count}
                />
              )
            }
          </TabBox>
        </TabPanel>
        <TabPanel value="readBooks">
          <Typography variant="h5" sx={{ width: '100%' }}>
            <SubTitle>【読了人気本】</SubTitle>
          </Typography>
          <TabBox>
            {rankState.fetchState !== 'ok'
              ? <Loading />
              : rankState.readBooks.map(readBooks =>
                <RankBookList
                  book={readBooks.book}
                  rank={readBooks.rank}
                  countRead={readBooks.count}
                />
              )
            }
          </TabBox>
        </TabPanel>
        <TabPanel value="stackBooks">
          <Typography variant="h5" sx={{ width: '100%' }}>
            <SubTitle>【積読人気本】</SubTitle>
          </Typography>
          <TabBox>
            {rankState.fetchState !== 'ok'
              ? <Loading />
              : rankState.stackBooks.map(stackBooks =>
                <RankBookList
                  book={stackBooks.book}
                  rank={stackBooks.rank}
                  countStack={stackBooks.count}
                />
              )
            }
          </TabBox>
        </TabPanel>
      </TabContext>
    </Container>


  )
}
