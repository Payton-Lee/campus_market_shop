import { Button } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function User() {
  const navigate = useNavigate();
  const [userName] = useState(window.sessionStorage.getItem("username"));
  useEffect(() => {
    const token = window.sessionStorage.getItem("token");
    if (token) {
      // navigate("/buy", {
      //   state: [
      //     {
      //       ...props,
      //       count: 1,
      //     },
      //   ],
      // });
    } else {
      navigate("/login");
    }
  }, []);

  const logout = () => {
    window.sessionStorage.removeItem("username");
    window.sessionStorage.removeItem("token");
    navigate("/home/goods");
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

      <div></div>
    </div>
  );
}
