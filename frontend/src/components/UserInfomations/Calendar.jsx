import React from "react";
// Style
import { Emoji } from 'emoji-mart';
import FullCalendar, { EventContentArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import Box from '@mui/material/Box';
// Component
import { DiaryDialog } from "../Dialogs/DiaryDialog"

export const Calendar = ({
  open,
  handleClose,
  handleOpen,
  recordState,
  recordDispatch,
  userId,
}) => {
  // 日記ダイアログを表示
  const handleClick = (eventInfo: EventContentArg) => {
    recordDispatch({
      type: 'preUpdate',
      payload: {
        id: eventInfo.event.id,
        date: eventInfo.event.startStr,
        sleepingHours: eventInfo.event.groupId,
        feeling: eventInfo.event.title,
      },
    });
    handleOpen();
  }

  // カレンダー内の日記一覧を表示
  const renderEventContent = (eventInfo: EventContentArg) => (
    <Box sx={{ cursor: 'pointer', textAlign: "center" }}>
      <Emoji
        emoji={eventInfo.event.title}
        size={20}
      />
    </Box>
  )

  return (
    <Box>
      <FullCalendar
        businessHours={true}
        contentHeight='auto'
        events={recordState.diaries}
        eventClick={handleClick}
        eventContent={renderEventContent}
        dayCellContent={(e) => { e.dayNumberText = e.dayNumberText.replace('日', '') }}
        initialView="dayGridMonth"
        locale="ja"
        plugins={[dayGridPlugin, interactionPlugin]}
      />
      <DiaryDialog
        handleClose={() => handleClose()}
        open={open}
        recordState={recordState}
        recordDispatch={recordDispatch}
        userId={userId}
      />
    </Box>
  )
}
