import React from "react"
import { ReactComponent as NotFound } from "../../Assets/Img/404.svg"

const PageNotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <NotFound />
    </div>
  )
}

export default PageNotFound
