import React from 'react';
import { useHistory } from 'react-router';
// Style
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/system'
import Typography from '@mui/material/Typography';
// Component
import { BookSearchButton } from '../../components/Buttons/BookSearchButton';
import { SearchForm } from '../Forms/SearchForm';

const Wrapper = styled('box')(() => ({
  alignItems: 'flex-start',
  display: 'flex',
  flexDirection: 'column',
  marginLeft: 20,
  paddingBottom: '20px'
}));

const UserWrapper = styled('box')(() => ({
  display: 'flex',
  justifyContent: 'center',
  paddingBottom: 8,
}));

const UserName = styled('box')(({ theme }) => ({
  fontSize: theme.typography.h6.fontSize,
  fontWeight: theme.typography.h6.fontWeight,
  letterSpacing: theme.typography.h6.letterSpacing,
  lineHeight: 3,
}));

export const BookSearch = ({
  bookState,
  handleChange,
  handleSubmit,
  keyword,
}) => {
  const history = useHistory();

  return (
    <Wrapper>
      <UserWrapper>
        <Avatar
          src={bookState.user.avatar_url}
          sx={{ cursor: 'pointer', height: 35, mt: 0.4, mr: 2, width: 35 }}
          onClick={() => history.push(`/users/${bookState.user.id}`)}
        />
        <Typography>
          <UserName>{bookState.user.name}</UserName>
        </Typography>
      </UserWrapper>
      <SearchForm
        handleChange={handleChange}
        keyword={keyword}
      />
      <BookSearchButton
        handleSubmit={handleSubmit}
      />
    </Wrapper>
  )
}
