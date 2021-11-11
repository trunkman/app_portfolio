import React, { useEffect, useState } from "react";
import { useCallback } from 'react';
// styles
// import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import FullCalendar, { EventContentArg } from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
// api
import { fetchUserDiaries } from "../../apis/users";
// コンポーネント
import { DiaryDialog } from "../Dialogs/DiaryDialog"
import { DiaryShowDialog } from "../Dialogs/DiaryShowDialog"

export const Calendar = (props) => {
  const [diaries, setDiaries] = useState([{ title: "good", start: "2021-11-09" }])
  const [open, setOpen] = useState(false)
  const [openShow, setShowOpen] = useState(false)
  // 日記Dialogを開閉する関数群
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    fetchUserDiaries(1)
      .then(data => {
        setDiaries(data.diaries)
      })
  }, [])

  const handleDateClick = useCallback((arg: DateClickArg) => {
    setShowOpen(true)
  }, [])

  const renderEventContent = (eventInfo: EventContentArg) => (
    <b>{eventInfo.event.title}</b>
  )

  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale="ja"
        events={diaries}
        dateClick={handleDateClick}
        eventContent={renderEventContent}
      />

      <Button variant="inherit" onClick={handleOpen}>
        記録する
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
    </>
  )
}
