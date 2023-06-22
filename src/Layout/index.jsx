import React from "react"

const Layout = ({ children }) => {
  return (
    <div
      style={{
        maxWidth: 568,
        width: "100%",
        backgroundColor: "#fff",
        margin: "auto",
        height: "100vh",
        borderLeft: "1px solid #eaeaea",
        borderRight: "1px solid #eaeaea",
      }}
    >
      {children}
    </div>
  )
}

export default Layout
