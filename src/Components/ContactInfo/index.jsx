import { DeleteOutlined, EditOutlined, RightOutlined } from "@ant-design/icons"
import { message, Popconfirm } from "antd"
import React, { useCallback } from "react"
import { useDispatch } from "react-redux"
import { useDeleteContactLinkMutation } from "../../Redux/api/ContactLinkApi"
import {
  setContactLink,
  setContactModalVisible,
} from "../../Redux/reducer/ContactLinkReducer"
import {
  contactInfoContainer,
  contactInfoContainerContent,
  contactInfoTitle,
} from "../../utils/styles"
import Icon from "../Icon"

const ContactInfo = ({ item, update = false, refetch }) => {
  const dispatch = useDispatch()
  const [deleteContactLink] = useDeleteContactLinkMutation()
  const handleDelete = useCallback(
    (id) => {
      deleteContactLink(id).then(({ error, data }) => {
        if (error) {
          message.error("Data gagal dihapus")
        } else {
          message.success("Data berhasil dihapus")
          refetch()
        }
      })
    },
    [refetch]
  )
  return (
    <div style={contactInfoContainer}>
      <div style={{ ...contactInfoContainerContent, width: "90%" }}>
        <Icon type={item?.icon_path} color={"#000"} size={20} />
        <span style={contactInfoTitle}>{item?.name}</span>
      </div>
      {update ? (
        <div style={{ marginLeft: 10 }}>
          <Popconfirm
            title="Are you sure to delete this task?"
            onConfirm={() => handleDelete(item?.id)}
            // onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined />
          </Popconfirm>
          <EditOutlined
            style={{ marginLeft: 10 }}
            onClick={() => {
              dispatch(setContactLink({ ...item, edit: true }))
              dispatch(setContactModalVisible(true))
            }}
          />
        </div>
      ) : (
        <RightOutlined />
      )}
    </div>
  )
}

export default ContactInfo
