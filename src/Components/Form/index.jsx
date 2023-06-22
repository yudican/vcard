import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useUpdateUserMutation } from "../../Redux/api/UserApi"
import { setUser } from "../../Redux/reducer/AuthReducer"
import { socialNetworkItem } from "../../utils/styles"
const ColorPicker = ({ color = "#dfe4ea", onClick, selected }) => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const [updateUser] = useUpdateUserMutation()
  const onFinish = (value) => {
    onClick(color)
    let formData = new FormData()
    formData.append("name", user.name)
    formData.append("job_title", user.job_title)
    formData.append("card_color", color)
    formData.append("description", user.description)
    updateUser(formData).then(({ error, data }) => {
      localStorage.removeItem("user")
      dispatch(setUser(data.data))
    })
  }
  return (
    <div
      style={{
        ...socialNetworkItem,
        backgroundColor: color,
        cursor: "pointer",
        border: `2px solid ${selected === color ? "#27ae60" : "#fff"}`,
      }}
      onClick={onFinish}
    />
  )
}

export { ColorPicker }
