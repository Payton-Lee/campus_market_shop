import React, { useEffect, useState } from "react";
import {
  HomeOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";

export default function Home() {
  const [currentClick, setCurrentClick] = useState(1);

  const navigate = useNavigate();

  const handleTabClick = (tabId, path) => {
    setCurrentClick(tabId);
    navigate(`/home/${path}`);
  };

  useEffect(() => {
    navigate("/home/goods");
  }, []);

  return (
    <div>
      <div>
        <Outlet />
      </div>
      <div className="fixed bottom-0 w-full opacity-95 bg-light-500">
        <div className="flex items-center justify-between shadow-md px-4 py-3 border-t-1 rounded-md border-slate-300">
          <div
            className={`text-center no-underline ${
              currentClick === 1 ? "text-red-400" : "text-dark-500"
            }`}
            onClick={() => {
              handleTabClick(1, "goods");
            }}
          >
            <HomeOutlined className="text-xl" />
            <div>首页</div>
          </div>
          <div
            className={`text-center no-underline ${
              currentClick === 2 ? "text-red-400" : "text-dark-500"
            }`}
            onClick={() => {
              handleTabClick(2, "cart");
            }}
          >
            <ShoppingCartOutlined className="text-xl" />
            <div>购物车</div>
          </div>
          <div
            className={`text-center ${
              currentClick === 3 ? "text-red-400" : "text-dark-500"
            }`}
            onClick={() => {
              handleTabClick(3, "user");
            }}
          >
            <UserOutlined className="text-xl" />
            <div>我的</div>
          </div>
        </div>
      </div>
    </div>
  );
}
