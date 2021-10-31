import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
// styled
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Button } from "@mui/material";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import { Menu } from "@mui/material";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
// アイコン
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import AccountCircle from '@mui/icons-material/AccountCircle';
// api
import { deleteLogout } from "../apis/sessions"
// コンポーネント
import { LogInDialog } from "./Dialogs/LogInDialog";

export const Header = (props) => {
  const loginUserId = props.loginUser.id
  const history = useHistory()
  const [anchorEl, setAnchorEl] = useState(null);
  // アンカーを開閉する関数群
  const handleMenu = (event) => { setAnchorEl(event.currentTarget); };
  const handleClose = () => { setAnchorEl(null); };
  // ログアウトするコールバック関数
  const handleLogOut = () => {
    deleteLogout()
      .then(() => {
        props.handleLogOut();
        handleClose()
        history.push(`/`);
        alert('ログアウトを成功しました');
      })
  }
  //返り値：ヘッダー画面
  return (
    <Box>
      <AppBar position="static">
        <Toolbar sx={{ maxWidth: 1000, mx: "auto", px: 2 }}>
          <IconButton color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={() => history.push(`/`)} >
            <HealthAndSafetyIcon sx={{ fontSize: 40 }} />
          </IconButton>

          <Typography sx={{ mr: 4 }} variant="body1" onClick={() => history.push(`/`)}>
            ホーム
          </Typography>

          {/* <Accordion>
            <AccordionSummary
              aria-controls="panel1a-content"
              id="panel1a-header"
              variant="body1"
            >
              <Typography>プロフィール</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ mr: 4 }} variant="body1">
                睡眠記録
              </Typography>
              <Typography sx={{ mr: 4 }} variant="body1" onClick={() => history.push(`/users/${loginUserId}/microposts`)}>
                投稿一覧
              </Typography>
              <Typography sx={{ mr: 4 }} variant="body1">
                睡眠本
              </Typography>
              <Typography sx={{ mr: 4 }} variant="body1">
                睡眠グッズ
              </Typography>
            </AccordionDetails>
          </Accordion> */}

          {(props.isLoggedIn) &&
            <Typography sx={{ mr: 4 }} variant="body1" onClick={() => history.push(`/users/${loginUserId}`)}>
              プロフィール
            </Typography>
          }
          {(props.isLoggedIn) &&
            <Typography sx={{ mr: 4 }} variant="body1" onClick={() => history.push(`/users`)}>
              タイムライン
            </Typography>
          }
          <Typography sx={{ mr: 4, flexGrow: 1 }} variant="body1" onClick={() => history.push(`/`)}>
            ランキング
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {
              props.isLoggedIn ? (
                <IconButton color="inherit" onClick={handleMenu}>
                  <AccountCircle />
                </IconButton>
              ) : (
                <Button variant="inherit" onClick={() => props.handleOpenLogIn()}>
                  ログイン
                </Button>
              )
            }
            {/* ダイアログおよびアコーディオンメニュー */}
            <LogInDialog
              open={props.open}
              handleClose={props.handleCloseLogIn}
              handleLogIn={props.handleLogIn}
            />
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={() => history.push(`/users/${loginUserId}`)}>設定</MenuItem>
              <MenuItem onClick={() => history.push(`/contact`)}>お問い合わせ</MenuItem>
              <MenuItem onClick={handleLogOut}>ログアウト</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
