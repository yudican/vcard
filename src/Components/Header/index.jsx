import { Button } from "antd-mobile"
import React from "react"
import { headerContainer, headerContent } from "../../utils/styles"

const Header = ({
  actionTitle = "Get Card",
  onClick,
  paddingBottom = 70,
  type = "dark",
  extra = null,
}) => {
  return (
    <div
      style={{
        ...headerContainer,
        backgroundColor: type === "dark" ? "#fff" : "#222",
      }}
    >
      <div style={{ ...headerContent, paddingBottom }}>
        <div style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
          <img
            src={`https://i.ibb.co/SXy5L9t/Screenshot-2023-01-14-at-18-20-25-removebg-preview.png`}
            style={{ height: 30 }}
            alt="Logo"
          />
        </div>
        <div>
          {extra}
          {onClick ? (
            <Button size="small" fill="outline" color="#fff" onClick={onClick}>
              {actionTitle}
            </Button>
          ) : null}
        </div>
      </div>

      {/* card */}
    </div>
  )
}

export default Header
