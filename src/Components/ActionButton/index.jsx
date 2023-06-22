import { Button } from "antd-mobile"
import React from "react"

const ActionButton = ({
  width = "58%",
  color = "#fff",
  backgroundColor = "#f39c12",
  borderColor = "#f39c12",
  title = "button",
  fontSize = 16,
  onClick,
  fontWeight = 500,
}) => {
  return (
    <Button
      onClick={onClick}
      style={{
        padding: 15,
        width,
        borderRadius: 5,
        backgroundColor,
        border: `2px solid ${borderColor}`,
        fontWeight,
        color,
        fontSize,
      }}
    >
      {title}
    </Button>
  )
}

export default ActionButton
