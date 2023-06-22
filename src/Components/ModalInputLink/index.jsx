import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Col, Form, Input, message, Modal, Row, Upload } from "antd"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  useAddLinkMutation,
  useUpdateLinkMutation,
} from "../../Redux/api/SocialLinkApi"
import {
  setModalVisible,
  setSocialLink,
} from "../../Redux/reducer/SocialLinkReducer"
import { addHttp, getBase64, getImg } from "../../utils/helper"

const InputLink = ({ refetch }) => {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState()
  const [editImage, setEditImage] = useState(false)
  const [fileList, setFileList] = useState([])
  const [addLink, addLinkStatus] = useAddLinkMutation()
  const [updateLink, updateLinkStatus] = useUpdateLinkMutation()

  const { modalVisible, socialLink } = useSelector((state) => state.socialLink)

  const handleChange = ({ fileList }) => {
    const list = fileList.pop()
    setLoading(true)
    setTimeout(() => {
      getBase64(list.originFileObj, (url) => {
        setLoading(false)
        setImageUrl(url)
        setEditImage(true)
      })
      setFileList(list.originFileObj)
    }, 1000)
  }

  useEffect(() => {
    if (socialLink) {
      form.setFieldsValue(socialLink)
      setImageUrl(getImg(socialLink.image_link))
    }
  }, [socialLink])

  const onFinish = (value) => {
    let formData = new FormData()
    formData.append("name", value.name)
    formData.append("url", addHttp(value.url))
    formData.append("icon_path", "#")

    addLink(formData)
      .then(() => {
        dispatch(setModalVisible(false))
        form.resetFields()
        refetch()
        dispatch(setSocialLink(null))
        message.success("Data berhasil ditambahkan")
      })
      .catch((err) => {
        dispatch(setModalVisible(false))
        message.error("Data gagal ditambahkan")
      })
  }
  const onFinishEdit = (value) => {
    let formData = new FormData()

    if (editImage) {
      formData.append("image_link", fileList)
    }
    formData.append("name", value.name)
    formData.append("url", addHttp(value.url))
    formData.append("_method", "PUT")
    updateLink({ formData, id: socialLink?.id })
      .then(() => {
        dispatch(setModalVisible(false))
        form.resetFields()
        refetch()
        dispatch(setSocialLink(null))
        message.success("Data berhasil diupdate")
      })
      .catch((err) => {
        dispatch(setModalVisible(false))
        message.error("Data gagal diupdate")
      })
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  )
  return (
    <div style={{ width: "100%" }}>
      <Button
        type="dashed"
        onClick={() => {
          form.resetFields()
          setImageUrl(null)
          dispatch(setSocialLink(null))
          dispatch(setModalVisible(true))
        }}
        style={{ width: "100%" }}
      >
        Tambah Link
      </Button>
      <Modal
        title="Link "
        visible={modalVisible}
        onOk={() => form.submit()}
        onCancel={() => {
          dispatch(setSocialLink(null))
          dispatch(setModalVisible(false))
        }}
        forceRender={true}
        width={"550px"}
        confirmLoading={addLinkStatus.isLoading || updateLinkStatus.isLoading}
      >
        <Form
          name="basic"
          layout="vertical"
          onFinish={(val) => {
            if (socialLink?.edit) {
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
                label="Title"
                name="name"
                rules={[
                  { required: true, message: "Please input your Title!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Url"
                name="url"
                rules={[{ required: true, message: "Please input your Url!" }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Image"
                name="image_link"
                rules={[
                  {
                    required: !socialLink,
                    message: "Please input image link!",
                  },
                ]}
              >
                <Upload
                  name="image_link"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  multiple={false}
                  // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  // beforeUpload={beforeUpload}
                  beforeUpload={() => false}
                  onChange={handleChange}
                >
                  {imageUrl ? (
                    loading ? (
                      <LoadingOutlined />
                    ) : (
                      <img
                        src={imageUrl}
                        alt="avatar"
                        style={{
                          width: "100%",
                        }}
                      />
                    )
                  ) : (
                    uploadButton
                  )}
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  )
}

export default InputLink
