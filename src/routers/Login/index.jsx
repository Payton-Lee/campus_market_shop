import React from "react";
import { Button, Form, Input, message } from "antd";
import { login } from "../../axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values) => {
    login(values).then((res) => {
      if (res.status === 200) {
        window.sessionStorage.setItem("token", res.data.token);
        window.sessionStorage.setItem("username", res.data.username);
        form.resetFields();
        navigate(-1);
      } else {
        message.error(res.message);
      }
    });
  };

  return (
    <div
      style={{
        backgroundImage: "url(/bg.jpg)",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        backgroundPositionX: "-420px",
      }}
      className="h-full w-full"
    >
      <div
        style={{
          height: `${window.innerHeight}px`,
        }}
        className="flex flex-col justify-center"
      >
        <div className="bg-white mx-2 p-2 rounded-lg">
          <Form
            layout="horizontal"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            form={form}
            onFinish={onFinish}
          >
            <Form.Item
              label="用户名"
              rules={[{ required: true, message: "请输入你的用户名" }]}
              name="username"
            >
              <Input
                className="rounded-md"
                size="small"
                placeholder="请输入用户名"
              />
            </Form.Item>
            <Form.Item
              label="密码"
              name="password"
              rules={[{ required: true, message: "请输入你的密码" }]}
            >
              <Input.Password placeholder="请输入密码" type="password" />
            </Form.Item>
            <Form.Item wrapperCol={{ span: 24 }}>
              <Button
                style={{ width: "100%" }}
                type="primary"
                htmlType="submit"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
