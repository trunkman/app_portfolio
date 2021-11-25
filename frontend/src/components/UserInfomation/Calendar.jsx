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
// Component
import { DiaryDialog } from "../Dialogs/DiaryDialog"

export const Calendar = (props) => {
  const [diaries, setDiaries] = useState([])
  const [dialogState, dialogDispatch] = useReducer(dialogReducer, dialogInitialState);
  const handleClose = () => dialogDispatch({ type: 'close' })

  const handleDateClick = useCallback((DateClickArg) => {
    dialogDispatch({ type: 'diary' })
  }, [])

  const renderEventContent = (eventInfo: EventContentArg) => (
    <Emoji
      emoji={eventInfo.event.title}
      size={32}
      onClick={() => dialogDispatch({ type: 'diary' })}
    />
  )

  useEffect(() => {
    fetchUserDiaries(props.userId)
      .then(data => {
        setDiaries(data.diaries)
      })
  }, [dialogState.record, dialogState.diary])


  return (
    <Box>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale="ja"
        events={diaries}
        dateClick={handleDateClick}
        eventContent={renderEventContent}
      />


      < DiaryDialog
        handleClose={handleClose}
        open={dialogState.diary}
      // date={arg.dateStr}
      />
    </Box>
  )
}
