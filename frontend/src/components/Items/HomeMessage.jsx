import React from "react"
// Style
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/system'
import Typography from '@mui/material/Typography';
// Image
import SubImage0 from "../../images/SubImage0.png";
import SubImage1 from "../../images/SubImage1.png";
import SubImage2 from "../../images/SubImage2.png";
import SubImage3 from "../../images/SubImage3.png";

const MessageWrapper = styled('box')(() => ({
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: 50,
  textAlign: 'center',
  width: '100%',
  padding: '0px 10px'
}));

const SubTitle = styled('box')(({ theme }) => ({
  fontSize: theme.typography.h4.fontSize,
  fontWeight: theme.typography.h4.fontWeight,
  letterSpacing: theme.typography.h4.letterSpacing,
  lineHeight: 2,
}));

const ThirdTitle = styled('box')(({ theme }) => ({
  fontSize: theme.typography.h5.fontSize,
  fontWeight: theme.typography.h5.fontWeight,
  letterSpacing: theme.typography.h5.letterSpacing,
  lineHeight: 2,
}));

const SubBody = styled('box')(({ theme }) => ({
  fontSize: theme.typography.subtitle1.fontSize,
  fontWeight: theme.typography.subtitle1.fontWeight,
  letterSpacing: theme.typography.subtitle1.letterSpacing,
  lineHeight: 2,
}));

export const HomeMessage = () => {

  return (
    <MessageWrapper>
      <Typography>
        <Box sx={{ pt: 6 }}>
          <SubTitle>
            ~ 睡眠負債とは ~
          </SubTitle>
        </Box>
      </Typography>
      <Typography>
        <Box item sm={12} md={4} sx={{ pb: 15 }}>
          <CardMedia
            alt='SubImage1'
            component='img'
            image={SubImage0}
            sx={{ pb: 3, width: 300, mx: 'auto' }}
          />
          <SubBody>
            "睡眠負債"とは睡眠不足が借金のように積み重なること。<br />
            健康に多大な被害を及ぼすことになるので、<br />
            日々の睡眠時間を確保することがなにより大切です。
          </SubBody>
        </Box>
      </Typography>

      <Typography>
        <Box>
          <SubTitle>
            ~ 睡眠補完計画のコンセプト ~
          </SubTitle>
        </Box>
      </Typography>
      <Typography>
        <Grid container>
          <Grid item sm={12} md={4} sx={{ py: 4 }}>
            <SubBody>
              1. 記録したデータを見える化
            </SubBody>
            <CardMedia
              alt='SubImage1'
              component='img'
              image={SubImage1}
              sx={{ width: '70%', mx: 'auto' }}
            />
          </Grid>
          <Grid item sm={12} md={4} sx={{ py: 4 }}>
            <SubBody>
              2. 良い睡眠本をみんなで共有
            </SubBody>
            <CardMedia
              alt='SubImage1'
              component='img'
              image={SubImage2}
              sx={{ width: '70%', mx: 'auto' }}
            />
          </Grid>
          <Grid item sm={12} md={4} sx={{ py: 4 }}>
            <SubBody>
              3. 同じ境遇の仲間と励まし合う
            </SubBody>
            <CardMedia
              alt='SubImage1'
              component='img'
              image={SubImage3}
              sx={{ width: '70%', mx: 'auto' }}
            />
          </Grid>
        </Grid>
      </Typography>
      <Typography>
        <Box sx={{ pb: 10 }}>
          <SubBody>
            手軽に、簡単に、継続して睡眠時間を記録し、<br />
            良質な睡眠生活を目指しましょう。
          </SubBody>
        </Box>
      </Typography>
    </MessageWrapper >
  )
}
