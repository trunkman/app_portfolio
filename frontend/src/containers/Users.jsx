import React, { Fragment, useEffect } from "react";
// api
import { fetchUsers } from "../apis/users";


export const Users = () => {

  useEffect(() => {
    fetchUsers()
      .then((data) =>
        console.log(data)
      )
  }, [])

  return (
    <Fragment>
      UserPage
    </Fragment>
  )
}
