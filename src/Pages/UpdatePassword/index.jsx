import React from "react"
import { Button, Card, Form, Input, message } from "antd"
import LoadingOverlay from "react-loading-overlay"
import { useNavigate } from "react-router-dom"
import Header from "../../Components/Header"
import { useUpdatePasswordMutation } from "../../Redux/api/UserApi"
const UpdatePassword = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const [updatePassword, { isLoading }] = useUpdatePasswordMutation()

  const onFinish = (e) => {
    updatePassword(e).then(({ error, data }) => {
      if (error) {
        return message.error(error.data.message)
      }
      message.success("Password updated successfully")
      return navigate("/update-profile")
    })
  }

  if (isLoading) {
    return (
      <LoadingOverlay
        styles={{ height: "100vh" }}
        active={isLoading}
        spinner
        text="Loading your content..."
      >
        <div style={{ height: "100vh", backgroundColor: "#fff" }}></div>
      </LoadingOverlay>
    )
  }
  // state
  return (
    <div style={{ paddingBottom: 20 }}>
      <Header
        actionTitle="Tutup"
        paddingBottom={10}
        onClick={() => {
          return navigate("/update-profile")
        }}
        type={"light"}
      />
      <div style={{ paddingRight: 20, paddingLeft: 20 }}>
        <Card>
          <Form form={form} onFinish={onFinish} layout="vertical">
            <Form.Item
              label="Old Password"
              name="old_password"
              rules={[
                { required: true, message: "Please input Old Password!" },
              ]}
            >
              <Input placeholder=" Old Password" />
            </Form.Item>
            <Form.Item
              label="New Password"
              name="new_password"
              rules={[
                { required: true, message: "Please input New Password!" },
              ]}
            >
              <Input placeholder="New Password" />
            </Form.Item>
            <Form.Item
              label="New Password"
              name="confirm_password"
              rules={[
                {
                  required: true,
                  message: "Please input Confirm New Password!",
                },
              ]}
            >
              <Input placeholder="Confirm New Password" />
            </Form.Item>
          </Form>

          <Button onClick={() => form.submit()}>Update Password</Button>
        </Card>
      </div>
    </div>
  )
}

export default UpdatePassword
