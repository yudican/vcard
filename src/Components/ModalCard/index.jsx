import { LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Col, Form, Input, message, Modal, Row, Upload } from "antd"
import TextArea from "antd/lib/input/TextArea"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useUpdateUserMutation } from "../../Redux/api/UserApi"
import { setUser } from "../../Redux/reducer/AuthReducer"
import { getBase64 } from "../../utils/helper"

const ModalCard = ({ color = "#00000" }) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [imageUrl, setImageUrl] = useState()
  const [editImage, setEditImage] = useState(false)
  const [fileList, setFileList] = useState([])

  const [updateUser, { isLoading }] = useUpdateUserMutation()

  const { user } = useSelector((state) => state.auth)
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
    if (user) {
      form.setFieldsValue({
        name: user.name,
        job_title: user.job_title,
        description: user.description,
      })
      setImageUrl(user.photo || user.default_photo)
    }
  }, [user])

  const onFinish = (value) => {
    let formData = new FormData()

    if (editImage) {
      formData.append("profile_photo_path", fileList)
    }
    formData.append("name", value.name)
    formData.append("job_title", value.job_title)
    formData.append("card_color", color)
    formData.append("description", value.description)
    updateUser(formData)
      .then(({ error, data }) => {
        if (error) {
          setVisible(false)
          return message.error("Data gagal diupdate")
        }
        setVisible(false)
        form.resetFields()
        localStorage.removeItem("user")
        dispatch(setUser(data?.data))
        message.success("Data berhasil diupdate")
      })
      .catch((err) => {
        setVisible(false)
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
        onClick={() => setVisible(true)}
        style={{ width: "100%" }}
      >
        Update Card
      </Button>
      {/* <EditOutlined
        onClick={() => setVisible(true)}
        size={"large"}
        type={"large"}
      /> */}
      <Modal
        title="Update Card Info"
        visible={visible}
        onOk={() => form.submit()}
        onCancel={() => setVisible(false)}
        forceRender={true}
        width={"550px"}
        confirmLoading={isLoading}
      >
        <Form
          name="basic"
          layout="vertical"
          // initialValues={{ remember: true }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          form={form}
          autoComplete="off"
        >
          <Row gutter={[20, 0]} wrap>
            <Col xs={24}>
              <Form.Item
                label="Full Name"
                name="name"
                rules={[
                  { required: true, message: "Please input your Full Name!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Job title"
                name="job_title"
                rules={[
                  { required: true, message: "Please input your Job title!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="About US"
                name="description"
                rules={[
                  { required: true, message: "Please input your About US!" },
                ]}
              >
                <TextArea rows={5} />
              </Form.Item>

              <Form.Item
                label="Image"
                name="profile_photo_path"
                rules={[
                  { required: false, message: "Please input card photo!" },
                ]}
              >
                <Upload
                  name="profile_photo_path"
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

export default ModalCard
