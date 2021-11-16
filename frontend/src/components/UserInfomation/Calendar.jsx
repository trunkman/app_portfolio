import React, { useEffect, useState } from "react";
import { useCallback } from 'react';
// styles
import { Emoji } from 'emoji-mart';
import Button from "@mui/material/Button";
import FullCalendar, { EventContentArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import Box from '@mui/material/Box';
// api
import { fetchUserDiaries } from "../../apis/users";
// コンポーネント
import { DiaryDialog } from "../Dialogs/DiaryDialog"
import { DiaryShowDialog } from "../Dialogs/DiaryShowDialog"

export const Calendar = (props) => {
  const [diaries, setDiaries] = useState([])
  const [open, setOpen] = useState(false)
  const [openShow, setShowOpen] = useState(false)
  // 日記Dialogを開閉する関数群
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    fetchUserDiaries(props.userId)
      .then(data => {
        setDiaries(data.diaries)
      })
  }, [])

  const handleDateClick = useCallback((arg: DateClickArg) => {
    setShowOpen(true)
  }, [])

  const renderEventContent = (eventInfo: EventContentArg) => (
    <>
      <Emoji
        emoji={eventInfo.event.title}
        size={32}
        onClick={() => setShowOpen(true)}
      />
    </>
  )

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

      <Button variant="inherit" onClick={handleOpen}>
        日記を書く
      </Button>

      <DiaryDialog
        open={open}
        handleClose={handleClose}
      />
      < DiaryShowDialog
        open={openShow}
        handleClose={() => setShowOpen(false)}
      // date={arg.dateStr}
      />
    </Box>
  )
}
