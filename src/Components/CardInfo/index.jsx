import React from "react"
import { useSelector } from "react-redux"
import {
  cardInfoContainer,
  cardInfoContentImage,
  cardInfoContentSubTitle,
  cardInfoContentTitle,
} from "../../utils/styles"
import ModalCard from "../ModalCard"

const CardInfo = ({ edit = false, color = "#000" }) => {
  const { user } = useSelector((state) => state.auth)
  return (
    <div>
      <div
        style={{
          ...cardInfoContainer,
          marginBottom: 10,
          background: color,
        }}
      >
        <img
          src={user?.photo || user?.default_photo}
          alt="profile"
          style={cardInfoContentImage}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: 15,
            paddingTop: 15,
            justifyContent: "center",
            alignItems: "flex-start",
            height: 230,
            width: "100%",
          }}
        >
          <p style={cardInfoContentTitle}>{user?.name}</p>
          <p style={cardInfoContentSubTitle}>{user?.job_title}</p>
        </div>
      </div>
      {edit && <ModalCard color={color} />}
    </div>
  )
}

export default CardInfo
