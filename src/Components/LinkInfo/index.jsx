import { DeleteOutlined, EditOutlined, RightOutlined } from "@ant-design/icons"
import { message, Popconfirm } from "antd"
import React from "react"
import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { useDeleteLinkMutation } from "../../Redux/api/SocialLinkApi"
import {
  setModalVisible,
  setSocialLink,
} from "../../Redux/reducer/SocialLinkReducer"
import { getImg } from "../../utils/helper"
import {
  contactInfoContainer,
  contactInfoContainerContent,
  contactInfoTitle,
} from "../../utils/styles"

const LinkInfo = ({ update = false, item, refetch }) => {
  const dispatch = useDispatch()
  const [deleteLink] = useDeleteLinkMutation()
  const handleDelete = useCallback(
    (id) => {
      deleteLink(id).then(({ error, data }) => {
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
      <a
        href={item?.url}
        style={{
          ...contactInfoContainerContent,
          alignItems: "flex-start",
          width: "90%",
          textDecoration: "none",
          color: "#000",
        }}
      >
        <img
          width={50}
          height={50}
          src={getImg(item?.image_link)}
          style={{ objectFit: "cover", borderRadius: 5 }}
        />
        <div>
          <span style={contactInfoTitle}>{item?.name}</span>
        </div>
      </a>
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
              dispatch(setSocialLink({ ...item, edit: true }))
              dispatch(setModalVisible(true))
            }}
          />
        </div>
      ) : (
        <RightOutlined />
      )}
    </div>
  )
}

export default LinkInfo
