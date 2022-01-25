import React, { useEffect, useReducer, useState } from 'react';
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
import { Loading } from '../Items/Loading'
import { RankBookList } from '../Lists/RankBookList';
import { RankUserList } from '../Lists/RankUserList';

const Container = styled('box')(() => ({
  alignItems: 'center',
  border: 1,
  justifyContent: 'center',
  maxWidth: 1000,
  textAlign: 'center',
  width: '100%',
}));

const Title = styled('box')(({ theme }) => ({
  fontSize: theme.typography.h3.fontSize,
  fontWeight: theme.typography.h3.fontWeight,
  letterSpacing: theme.typography.h3.letterSpacing,
  lineHeight: 3,
}));

const SubTitle = styled('box')(({ theme }) => ({
  fontSize: theme.typography.h5.fontSize,
  fontWeight: theme.typography.h5.fontWeight,
  letterSpacing: theme.typography.h5.letterSpacing,
  lineHeight: 3,
}));

const TabBox = styled('box')(() => ({
  alignContent: 'center',
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space_between',
}));

const TabLabel = styled(Tab)(({ theme }) => ({
  fontSize: theme.typography.subtitle1.fontSize,
  fontWeight: theme.typography.subtitle1.fontWeight,
  letterSpacing: 1,
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
      <Typography>
        <Title>≪ ランキング ≫</Title>
      </Typography>
      <TabContext value={tab}>
        <Box>
          <TabList
            onChange={(event, newTab) => { setTab(newTab) }}
            variant="fullWidth"
          >
            <TabLabel
              label="平均睡眠時間"
              value="sleepingHours"
            />
            <TabLabel
              label="読了数"
              value="reading"
            />
            <TabLabel
              label="読了人気本"
              value="readBooks"
            />
            <TabLabel
              label="積読人気本"
              value="stackBooks"
            />
          </TabList>
        </Box>
        <TabPanel value="sleepingHours">
          <Typography>
            <SubTitle>~ ユーザー平均睡眠時間 ~</SubTitle>
          </Typography>
          <TabBox>
            {rankState.fetchState !== 'ok' && <Loading />}

            {rankState.fetchState === 'ok' &&
              <RankUserList
                users={rankState.sleepHours}
              />
            }
          </TabBox>
        </TabPanel>
        <TabPanel value="reading">
          <Typography>
            <SubTitle>~ ユーザー読了数 ~</SubTitle>
          </Typography>
          <TabBox>
            {rankState.fetchState !== 'ok' && <Loading />}

            {rankState.fetchState === 'ok' &&
              <RankUserList
                users={rankState.reading}
              />
            }
          </TabBox>
        </TabPanel>
        <TabPanel value="readBooks">
          <Typography>
            <SubTitle>~ 読了人気本 ~</SubTitle>
          </Typography>
          <TabBox>
            {rankState.fetchState !== 'ok' && <Loading />}

            {rankState.fetchState === 'ok' &&
              <RankBookList
                books={rankState.readBooks}
              />
            }
          </TabBox>
        </TabPanel>
        <TabPanel value="stackBooks">
          <Typography>
            <SubTitle>~ 積読人気本 ~</SubTitle>
          </Typography>
          <TabBox>
            {rankState.fetchState !== 'ok' && <Loading />}

            {rankState.fetchState === 'ok' &&
              <RankBookList
                books={rankState.stackBooks}
              />
            }
          </TabBox>
        </TabPanel>
      </TabContext>
    </Container>


  )
}
