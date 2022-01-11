import React from "react";
// Style
import { styled } from '@mui/system';
// Component
import { SettingDialog } from "../Dialogs/SettingDialog";

const ContainedButton = styled('button')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  border: 0,
  borderRadius: theme.shape.borderRadius,
  color: theme.palette.primary.contrastText,
  cursor: 'pointer',
  fontWeight: 'bold',
  height: 30,
  padding: '0px 20px',
  marginTop: '10px',
}));

export const ProfileEditButton = ({
  dataUserFetch,
  open,
  setOpen,
}) => {

  return (
    <>
      <ContainedButton onClick={() => { setOpen(true) }}>
        プロフィール編集
      </ContainedButton>
      <SettingDialog
        dataUserFetch={dataUserFetch}
        handleClose={() => { setOpen(false) }}
        open={open}
      />
    </>
  );
};
