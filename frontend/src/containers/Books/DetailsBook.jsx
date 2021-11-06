import React from "react";
//styles
import Grid from "@mui/material/Grid";
import Skeleton from '@material-ui/lab/Skeleton';
import Button from "@material-ui/core/Button";


export const DetailsBook = () => {
  return (
    <Grid container sx={{ maxWidth: 1000, mx: "auto", bgcolor: 'grey.300' }}>
      <Grid item sm={12} sx={{ px: 2, bgcolor: 'grey.100' }}>
        <h1>書籍タイトル</h1>
      </Grid>
      <Grid item xs={12} sm={4} sx={{ px: 2, bgcolor: 'grey.200' }}>
        <Skeleton variant="rect" width={300} height={450} />
      </Grid>
      <Grid item xs={12} sm={8} sx={{ px: 2, bgcolor: 'grey.300' }}>
        <p>ジャンル名</p>
        <p>著者名</p>
        <p>出版社名</p>
        <p>出版日</p>
        <p>定価</p>
        <p>URL</p>
        <p>楽天レビュー平均</p>
        <p>楽天レビュー件数</p>
        <Button>
          この本を積む
        </Button>
        <Button>
          読了
        </Button>
      </Grid>
      <Grid item sm={12} sx={{ p: 2, bgcolor: 'grey.100' }}>
        <p>投稿内容を表示する</p>
      </Grid>
    </Grid>
  )
}
