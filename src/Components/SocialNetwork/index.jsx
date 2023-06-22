import { DeleteOutlined, EditOutlined } from "@ant-design/icons"
import { message, Popconfirm } from "antd"
import React, { useCallback } from "react"
import { useDispatch } from "react-redux"
import { useDeleteSocialNetworkMutation } from "../../Redux/api/SocialNetworkApi"
import {
  setSocialNetwork,
  setSocialNetworkModalVisible,
} from "../../Redux/reducer/SocialNetworkReducer"
import { socialNetworkItem } from "../../utils/styles"
import Icon from "../Icon"

const SocialNetwork = ({ type, color, update = false, refetch, item }) => {
  const dispatch = useDispatch()
  const [deleteSocialNetwork] = useDeleteSocialNetworkMutation()
  const handleDelete = useCallback(
    (id) => {
      deleteSocialNetwork(id).then(({ error, data }) => {
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
    <a href={item?.url} style={{ color: "#000" }}>
      <div>
        <div style={socialNetworkItem}>
          <Icon type={item?.icon_path} color={color} size={30} />
        </div>

        {update && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              width: 60,
            }}
          >
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
              onClick={() => {
                dispatch(setSocialNetwork({ ...item, edit: true }))
                dispatch(setSocialNetworkModalVisible(true))
              }}
            />
          </div>
        )}
      </div>
    </a>
  )
}

export default SocialNetwork
