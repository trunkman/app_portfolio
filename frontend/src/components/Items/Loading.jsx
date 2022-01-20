import React from 'react';
import { styled } from '@mui/system'
import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingWrapper = styled('box')(() => ({
  alignItems: 'center',
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
  width: '100%',
  padding: 100,
  '& > * + *': {
    margin: 0
  },
}));

export const Loading = () => {

  return (
    <LoadingWrapper>
      <CircularProgress />
    </LoadingWrapper>
  );
}

export default Loading
