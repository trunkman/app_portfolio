import React, { useEffect, useState, useReducer } from "react";
import { useCallback } from 'react';
// Style
import { Emoji } from 'emoji-mart';
import FullCalendar, { EventContentArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import Box from '@mui/material/Box';
// Api
import { fetchUserDiaries } from "../../apis/users";
// Reducer
import { dialogReducer, dialogInitialState } from '../../reducer/DialogReducer'
import { recordReducer, recordInitialState } from '../../reducer/RecordReducer'
// Component
import { DiaryDialog } from "../Dialogs/DiaryDialog"

export const Calendar = ({
  userId,
  open,
}) => {
  const [diaries, setDiaries] = useState([]);
  const [dialogState, dialogDispatch] = useReducer(dialogReducer, dialogInitialState);
  const [recordState, recordDispatch] = useReducer(recordReducer, recordInitialState);

  // カレンダーイベントの表記内容
  const renderEventContent = (eventInfo: EventContentArg) => (
    <Box sx={{
      textAlign: "center",
    }}>
      <Emoji
        emoji={eventInfo.event.title}
        size={24}
      />
    </Box>
  )
  // イベントダイアログを表示
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
    dialogDispatch({ type: 'diary' });
  }

  useEffect(() => {
    fetchUserDiaries(userId)
      .then(data => {
        setDiaries(data.diaries)
      })
  }, [dialogState.diary])


  return (
    <Box>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale="ja"
        events={diaries}
        eventClick={handleClick}
        eventContent={renderEventContent}
        businessHours={true}
        dayCellContent={(e) => { e.dayNumberText = e.dayNumberText.replace('日', '') }}
      // dayMaxEvents={true}
      />

      < DiaryDialog
        handleClose={() => dialogDispatch({ type: 'close' })}
        open={dialogState.diary}
        recordState={recordState}
        recordDispatch={recordDispatch}
      />
    </Box>
  )
}
