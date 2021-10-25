import React from "react";
import { useHistory } from 'react-router-dom';
// ヘッダーのstyle
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import { Menu } from "@mui/material";
// アイコン
import HotelIcon from '@mui/icons-material/Hotel';
import PeopleIcon from '@mui/icons-material/People';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import AirlineSeatFlatAngledIcon from '@mui/icons-material/AirlineSeatFlatAngled';
import AccountCircle from '@mui/icons-material/AccountCircle';
// コンポーネント
import { LogInButton } from "./Buttons/LogInButton";
import { LogOutButton } from "./Buttons/LogOutButton";

export const Header = (props) => {
  const history = useHistory()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //返り値：ヘッダー画面
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>

          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}
            onClick={() => history.push(`/`)} >
            <HotelIcon sx={{ fontSize: 40 }} />
            <Typography variant="body1">睡眠負債</Typography>
          </IconButton>
          {(props.isLoggedIn) &&
            <IconButton color="inherit" aria-label="menu" sx={{ mr: 2 }}
              onClick={() => history.push(`/user/{props.user.id}`)} >
              <HotelIcon />
              <Typography variant="body1">マイページ</Typography>
            </IconButton>
          }
          {(props.isLoggedIn) &&
            <IconButton color="inherit" aria-label="menu" sx={{ mr: 2 }}
              onClick={() => history.push(`/users`)} >
              <PeopleIcon />
              <Typography variant="body1">フォロー</Typography>
            </IconButton>
          }
          <IconButton color="inherit" aria-label="menu" sx={{ mr: 2 }}
            onClick={() => history.push(`/`)} >
            <FormatListNumberedIcon />
            <Typography variant="body1">ランキング</Typography>
          </IconButton>

          <IconButton color="inherit" aria-label="menu" sx={{ mr: 2 }}
            onClick={() => history.push(`/`)} >
            <AirlineSeatFlatAngledIcon />
            <Typography variant="body1">About</Typography>
          </IconButton>

          {
            props.isLoggedIn ? (
              <LogOutButton
                handleLogOut={props.handleLogOut}
              />
            ) : (
              <LogInButton
                handleOpen={props.handleOpenLogIn}
                open={props.open}
                handleClose={props.handleClose}
                handleLogIn={props.handleLogIn}
              />
            )
          }

          <IconButton
            size="large" aria-label="account of current user"
            onClick={handleMenu} color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {/* 仮のonClickを記載 */}
            <MenuItem onClick={handleClose}>プロフィール</MenuItem>
            <MenuItem onClick={handleClose}>設定</MenuItem>
            <MenuItem onClick={handleClose}>ログアウト</MenuItem>
          </Menu>

        </Toolbar>
      </AppBar>
    </Box>
  )
}
