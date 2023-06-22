import { Button, Col, Form, Input, message, Modal, Row, Select } from "antd"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  useAddSocialNetworkMutation,
  useUpdateSocialNetworkMutation,
} from "../../Redux/api/SocialNetworkApi"
import {
  setSocialNetwork,
  setSocialNetworkModalVisible,
} from "../../Redux/reducer/SocialNetworkReducer"
import { addHttp } from "../../utils/helper"
const icons = [
  "website",
  "linkdin",
  "instagram",
  "facebook",
  "twitter",
  "github",
  "gitlab",
  "dribble",
  "sketch",
  "reddit",
  "youtube",
  "gplus",
  "whatsapp",
  "telegram",
  "tiktok",
  "vimeo",
  "spotify",
  "nimotv",
  "pinterest",
  "snackvideo",
]
const ModalInputSocialNetwork = ({ refetch }) => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [addSocialNetwork, addLinkStatus] = useAddSocialNetworkMutation()
  const [updateSocialNetwork, updateLinkStatus] =
    useUpdateSocialNetworkMutation()

  const { modalVisible, socialNetwork } = useSelector(
    (state) => state.socialNetwork
  )

  useEffect(() => {
    if (socialNetwork) {
      form.setFieldsValue(socialNetwork)
    }
  }, [socialNetwork])

  const onFinish = (value) => {
    addSocialNetwork({ ...value, url: addHttp(value.url) })
      .then(() => {
        dispatch(setSocialNetworkModalVisible(false))
        form.resetFields()
        refetch()
        dispatch(setSocialNetwork(null))
        message.success("Data berhasil ditambahkan")
      })
      .catch((err) => {
        dispatch(setSocialNetworkModalVisible(false))
        message.error("Data gagal ditambahkan")
      })
  }
  const onFinishEdit = (value) => {
    updateSocialNetwork({
      formData: { ...value, url: addHttp(value.url), _method: "PUT" },
      id: socialNetwork?.id,
    })
      .then(() => {
        dispatch(setSocialNetworkModalVisible(false))
        form.resetFields()
        refetch()
        dispatch(setSocialNetwork(null))
        message.success("Data berhasil diupdate")
      })
      .catch((err) => {
        dispatch(setSocialNetworkModalVisible(false))
        message.error("Data gagal diupdate")
      })
  }
  return (
    <div style={{ width: "100%" }}>
      <Button
        type="dashed"
        onClick={() => {
          form.resetFields()
          dispatch(setSocialNetworkModalVisible(true))
        }}
        style={{ width: "100%" }}
      >
        Add Social Network
      </Button>
      <Modal
        title="Social Network"
        visible={modalVisible}
        onOk={() => form.submit()}
        onCancel={() => {
          form.resetFields()
          dispatch(setSocialNetworkModalVisible(false))
        }}
        forceRender={true}
        width={"550px"}
        confirmLoading={addLinkStatus.isLoading || updateLinkStatus.isLoading}
      >
        <Form
          name="basic"
          layout="vertical"
          // initialValues={{ remember: true }}
          onFinish={(val) => {
            if (socialNetwork?.edit) {
              return onFinishEdit(val)
            }
            return onFinish(val)
          }}
          // onFinishFailed={onFinishFailed}
          form={form}
          autoComplete="off"
        >
          <Row gutter={[20, 0]} wrap>
            <Col xs={24}>
              <Form.Item
                label="Social Network Type"
                name="icon_path"
                rules={[
                  {
                    required: true,
                    message: "Please select Social Network Type",
                  },
                ]}
              >
                <Select
                  showSearch
                  placeholder="Select a Social Network"
                  optionFilterProp="children"
                >
                  {icons.map((icon) => (
                    <Select.Option value={icon} key={icon}>
                      {icon}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please input your Name!" }]}
              >
                <Input placeholder="Facebook" />
              </Form.Item>
              <Form.Item
                label="Url"
                name="url"
                rules={[{ required: true, message: "Please input your Url!" }]}
              >
                <Input placeholder="https://facebook.com" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  )
}

export default ModalInputSocialNetwork
