import React from "react";
// Component
import { RankUserItem } from "../Items/RankUserItem";
// Style
import Grid from '@mui/material/Grid';
import { styled } from '@mui/system'

const ListWrapper = styled(Grid)(() => ({
  display: 'flex',
  justifyContent: 'space-evenly',
  width: '100%',
}));

export const RankUserList = ({ users }) => {

  return (
    <ListWrapper container spacing={2}>
      {
        users.map(user =>
          <Grid
            item sm={6} md={4}
            key={user.user.id.toString()}
            display='flex'
            justifyContent='center'
          >
            <RankUserItem
              user={user.user}
              rank={user.rank}
              count={user.count}
              average={user.average}
            />
          </Grid>
        )
      }
    </ListWrapper>
  );
}
