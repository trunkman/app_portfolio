import React from "react"
// Style
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/system'
import Typography from '@mui/material/Typography';
// Image
import SubImage1 from "../../images/SubImage1.png";
import SubImage2 from "../../images/SubImage2.png";
import SubImage3 from "../../images/SubImage3.png";

const MessageWrapper = styled('box')(({ theme }) => ({
  alignItems: 'center',
  justifyContent: 'center',
  mx: 'auto',
  paddingTop: 50,
  textAlign: 'center',
  width: '100%',
}));

const SubTitle = styled('box')(({ theme }) => ({
  fontWeight: theme.typography.h5.fontWeight,
  letterSpacing: theme.typography.h5.letterSpacing,
  lineHeight: 3,
}));

const SubBody = styled('box')(({ theme }) => ({
  fontWeight: theme.typography.subtitle1.fontWeight,
  letterSpacing: theme.typography.subtitle1.letterSpacing,
  lineHeight: 2,
}));

export const HomeMessage = () => {

  return (
    <MessageWrapper>
      <Typography variant="h4">
        <SubTitle>《 About 》</SubTitle>
      </Typography>
      <Typography variant="h5">
        <SubBody>
          日々の睡眠不足が借金のようにじわじわ積み重なる「睡眠負債」<br />
          健康に多大な被害を及ぼす前に、このアプリで解消していきましょう。
        </SubBody>
      </Typography>
      <Typography variant="h6">
        <Box sx={{ pt: 15 }}>
          <SubBody>
            ~ "睡眠補完計画" 3つの特徴 ~
          </SubBody>
        </Box>
      </Typography>
      <Typography variant="subtitle1">
        <Grid container>
          <Grid item sm={12} md={4} sx={{ py: 3 }}>
            <SubBody>
              1. 簡単かつ見やすい睡眠日記
            </SubBody>
            <CardMedia
              alt='SubImage1'
              component='img'
              image={SubImage1}
              sx={{ pb: 3, width: '70%', mx: 'auto' }}
            />
          </Grid>
          <Grid item sm={12} md={4} sx={{ py: 3 }}>
            <SubBody>
              2. 良い睡眠本の共有
            </SubBody>
            <CardMedia
              alt='SubImage1'
              component='img'
              image={SubImage2}
              sx={{ pb: 3, width: '70%', mx: 'auto' }}
            />
          </Grid>
          <Grid item sm={12} md={4} sx={{ py: 3 }}>
            <SubBody>
              3. 同じ境遇の仲間とコミュニケーション
            </SubBody>
            <CardMedia
              alt='SubImage1'
              component='img'
              image={SubImage3}
              sx={{ pb: 3, width: '70%', mx: 'auto' }}
            />
          </Grid>
        </Grid>
      </Typography>
    </MessageWrapper >
  )
}
