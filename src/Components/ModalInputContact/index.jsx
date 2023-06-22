import { Button, Col, Form, Input, message, Modal, Row, Select } from "antd"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  useAddContactLinkMutation,
  useUpdateContactLinkMutation,
} from "../../Redux/api/ContactLinkApi"
import {
  setContactLink,
  setContactModalVisible,
} from "../../Redux/reducer/ContactLinkReducer"
const icons = [
  "telepon",
  "email",
  "website",
  "linkdin",
  "instagram",
  "facebook",
  "twitter",
  "address",
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
const InputContact = ({ refetch }) => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [addContactLink, addLinkStatus] = useAddContactLinkMutation()
  const [updateContactLink, updateLinkStatus] = useUpdateContactLinkMutation()

  const { modalVisible, contactLink } = useSelector(
    (state) => state.contactLink
  )

  useEffect(() => {
    if (contactLink) {
      form.setFieldsValue(contactLink)
    }
  }, [contactLink])

  const onFinish = (value) => {
    addContactLink(value)
      .then(() => {
        dispatch(setContactModalVisible(false))
        form.resetFields()
        refetch()
        dispatch(setContactLink(null))
        message.success("Data berhasil ditambahkan")
      })
      .catch((err) => {
        dispatch(setContactModalVisible(false))
        message.error("Data gagal ditambahkan")
      })
  }
  const onFinishEdit = (value) => {
    updateContactLink({
      formData: { ...value, _method: "PUT" },
      id: contactLink?.id,
    })
      .then(() => {
        dispatch(setContactModalVisible(false))
        form.resetFields()
        refetch()
        dispatch(setContactLink(null))
        message.success("Data berhasil diupdate")
      })
      .catch((err) => {
        dispatch(setContactModalVisible(false))
        message.error("Data gagal diupdate")
      })
  }
  return (
    <div style={{ width: "100%" }}>
      <Button
        type="dashed"
        onClick={() => {
          form.resetFields()
          dispatch(setContactModalVisible(true))
          dispatch(setContactLink(null))
        }}
        style={{ width: "100%" }}
      >
        Add Contact Info
      </Button>
      <Modal
        title="Contact Info "
        visible={modalVisible}
        onOk={() => form.submit()}
        onCancel={() => {
          form.resetFields()
          dispatch(setContactModalVisible(false))
          dispatch(setContactLink(null))
        }}
        forceRender={true}
        width={"550px"}
        confirmLoading={addLinkStatus.isLoading || updateLinkStatus.isLoading}
      >
        <Form
          name="basic"
          layout="vertical"
          onFinish={(val) => {
            if (contactLink?.edit) {
              return onFinishEdit(val)
            }
            return onFinish(val)
          }}
          form={form}
          autoComplete="off"
        >
          <Row gutter={[20, 0]} wrap>
            <Col xs={24}>
              <Form.Item
                label="Type"
                name="icon_path"
                rules={[{ required: true, message: "Please iselect Icon" }]}
              >
                <Select
                  showSearch
                  placeholder="Select a icon"
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
                label="Value"
                name="name"
                rules={[{ required: true, message: "Please input your Url!" }]}
              >
                <Input placeholder="Alamat,telepon" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  )
}

export default InputContact
