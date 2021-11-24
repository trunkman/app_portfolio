import React from "react"

export const SleepInfo = ({
  userName,
  sleepDebt,
  sleepSaving,
}) => {

  return (
    <>
      {
        sleepDebt &&
        <>
          <h3>{userName}さんの睡眠負債は</h3>
          <h1>{sleepDebt} 時間</h1>
          <h3>もっと睡眠をとり、</h3>
          <h3>着実に返済していきましょう</h3>
        </>
      }
      {
        sleepSaving &&
        <>
          <h3>{userName}さんは目標より</h3>
          <h1>{sleepSaving} 時間</h1>
          <h3>睡眠をとっています</h3>
          <h3>この調子で睡眠時間を確保していきましょう</h3>
        </>
      }
    </>
  )
}
