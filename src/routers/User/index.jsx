import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Form, Input, Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getConsigneeList,
  getAreaList,
  addNewConsignee,
  getOrderList,
  getOrderItemList,
} from "../../asiox";
import { Modal } from "antd-mobile";

export default function User() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [userName] = useState(window.sessionStorage.getItem("username"));
  const [consigneeList, setConsigneeList] = useState([]);
  const [orderList, setOrderList] = useState([]);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const token = window.sessionStorage.getItem("token");
    if (token) {
      getConsigneeList().then((res) => {
        if (res.status === 200) {
          setConsigneeList(res.data);
        }
      });
      getOrderList().then((res) => {
        if (res.status === 200) {
          setOrderList(res.data);
        }
      });
    } else {
      navigate("/login");
    }
  }, []);

  const logout = () => {
    window.sessionStorage.removeItem("username");
    window.sessionStorage.removeItem("token");
    navigate("/home/goods");
  };

  const createMenu = (consignee) => {
    if (consignee && consignee.length) {
      return consignee.map((item, index) => ({
        label: (
          <div>
            <span>{item.receiver}</span>+<span>{item.telephone}</span>+
            <span>{item.area}</span>
            <span>{item.address}</span>
          </div>
        ),
        key: `${item.id}_${index}`,
      }));
    }
    return [
      {
        label: <div>还没有收货地址，请添加</div>,
        key: "0",
      },
    ];
  };

  const handleCommitConsignee = () => {
    return form
      .validateFields()
      .then((res) => {
        return new Promise((resolve, reject) => {
          addNewConsignee(res)
            .then((result) => {
              if (result.status === 200) {
                setConsigneeList(res.data.consignee);
                resolve(res.data);
              } else {
                reject(result);
              }
            })
            .catch((e) => {
              reject(e);
            });
        });
      })
      .catch((e) => {
        return new Error();
      });
  };

  const createOrderList = (order) => {
    return (
      <div
        key={order.id}
        className="h-6 overflow-hidden flex items-center m-2.5 rounded-lg shadow-slate-300 shadow-md p-5 py-6 bg-light-500 opacity-95"
        onClick={() => {
          getOrderItemList(order.id).then((res) => {
            if (res.status === 200 && res.data.length > 0) {
              Modal.show({
                closeOnMaskClick: true,
                content: (
                  <div className="max-h-160 overflow-auto">
                    {res.data.map((item) => (
                      <div className="h-40 flex items-center justify-between m-1.5 rounded-lg shadow-slate-300 shadow-md p-2 py-3 bg-light-500 opacity-95">
                        <img
                          className="w-3/5 h-full"
                          src={`http://localhost:9999/shop/api/v1/image/${item.image}`}
                          alt={`${item.goods}`}
                        />
                        <div className="flex flex-col justify-between h-20">
                          <span>{item.goods}</span>
                          <span>
                            <span className="text-orange-500 text-xs">￥</span>
                            <span>{(item.price * item.count).toFixed(2)}</span>
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ),
              });
            }
          });
        }}
      >
        <div className="flex w-full justify-between items-center">
          <span>订单编号：{order.orderNumber}</span>
          <span>
            订单价格：
            <span className="text-orange-500 text-xs">￥</span>
            {order.orderPrice}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="text-center p-4 pb-2 text-2xl border-b">
        <h3>个人中心</h3>
      </div>
      <div className="flex justify-between items-center m-2.5 rounded-lg shadow-slate-300 shadow-md p-5 py-6 bg-light-500 opacity-95">
        <div>当前用户：{userName}</div>
        <Button danger onClick={logout}>
          退出登录
        </Button>
      </div>
      <div className="flex justify-between items-center m-2.5 rounded-lg shadow-slate-300 shadow-md p-5 py-6 bg-light-500 opacity-95">
        <div>
          <Dropdown menu={{ items: createMenu(consigneeList) }}>
            <Button type="link" className="pl-0">
              <Space>
                点击查看
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </div>
        <Button
          danger
          onClick={() => {
            getAreaList().then((res) => {
              if (res.status === 200) {
                Modal.alert({
                  closeOnMaskClick: true,
                  content: (
                    <Form form={form}>
                      <Form.Item
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: "请输入收货人姓名",
                          },
                        ]}
                      >
                        <Input
                          className="rounded-md"
                          placeholder="请输入收货人姓名"
                        />
                      </Form.Item>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "请选择收货区域",
                          },
                        ]}
                        name="area"
                      >
                        <Select placeholder="请选择收货区域">
                          {res.data.map((item) => (
                            <Select.Option key={item.id}>
                              {item.area}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "请输入详细地址",
                          },
                        ]}
                        name="address"
                      >
                        <Input placeholder="请输入详细地址" />
                      </Form.Item>
                      <Form.Item
                        rules={[
                          {
                            required: true,
                            message: "请输入电话号码",
                          },
                        ]}
                        name="telephone"
                      >
                        <Input placeholder="请输入电话号码" />
                      </Form.Item>
                    </Form>
                  ),
                  confirmText: "添加收货地址",
                  onConfirm: handleCommitConsignee,
                });
              }
            });
          }}
        >
          +添加收货地址
        </Button>
      </div>
      <div className="w-full overflow-hidden">
        {orderList &&
          orderList.length &&
          orderList.map((item) => createOrderList(item))}
      </div>
      <Modal
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
        closeOnMaskClick
      ></Modal>
    </div>
  );
}
