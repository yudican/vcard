import { Button, Checkbox, Form, Input, message } from "antd"
import React from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import Header from "../../Components/Header"
import { useLoginMutation } from "../../Redux/api/AuthApi"
import { setToken, setUser } from "../../Redux/reducer/AuthReducer"

const LoginView = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const [login, { isLoading }] = useLoginMutation()
  const onFinish = (value) => {
    login(value)
      .then(({ error, data }) => {
        if (error) {
          form.resetFields()
          return message.error(error.data.message)
        }
        form.resetFields()
        console.log(data)
        dispatch(setToken(`${data.data.token_type} ${data.data.access_token}`))
        dispatch(setUser(data.data.user))
        message.success("Login Berhasil")
        return (window.location.href = "/" + data?.data?.user?.username)
      })
      .catch((err) => {
        message.error("Login Gagal")
      })
  }
  return (
    <div>
      <Header paddingBottom={5} />
      <p style={{ marginLeft: "4%", fontSize: 30, fontWeight: "bold" }}>
        {" "}
        Log in
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          marginTop: "25%",
        }}
      >
        <div style={{ width: "95%" }}>
          <Form
            name="basic"
            layout={"vertical"}
            autoComplete="off"
            form={form}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input
                size="large"
                style={{ borderTop: 0, borderLeft: 0, borderRight: 0 }}
                placeholder="Username"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password
                size="large"
                style={{ borderTop: 0, borderLeft: 0, borderRight: 0 }}
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: "100%",
                  borderRadius: 10,
                  backgroundColor: "#ff643a",
                  borderColor: "#ff643a",
                  fontSize: 15,
                  fontWeight: "bold",
                }}
                size={"large"}
                loading={isLoading}
              >
                Log in
              </Button>
              <p
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: 10,
                  fontSize: 16,
                  fontWeight: 400,
                }}
              >
                <span>No Account?</span>
                <span
                  style={{
                    fontWeight: 700,
                    color: "#ff643a",
                    marginLeft: 5,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    return (window.location.href = "https://zetocard.com")
                  }}
                >
                  Get Your Card
                </span>
              </p>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default LoginView
