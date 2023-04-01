import { Button } from "antd";
import React, { useEffect } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
export default function GoodsItem(props) {
  const navigate = useNavigate();
  const handleBuy = () => {
    const { buy } = props;
    if (typeof buy === "function") {
      buy({
        ...props,
        goodsId: props.id,
        count: 1,
      });
    }
    // const token = window.sessionStorage.getItem("token");
    // if (token) {
    //   navigate("/buy", {
    //     state: [
    //       {
    //         ...props,
    //         goodsId: props.id,
    //         count: 1,
    //       },
    //     ],
    //   });
    //   console.log("去购买页面");
    // } else {
    //   navigate("/login");
    // }
  };

  const { goods } = props;

  const handleAddCart = () => {
    const { addCart } = props;
    const token = window.sessionStorage.getItem("token");
    if (token) {
      if (typeof addCart === "function") {
        addCart(goods);
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="h-32 flex justify-start w-full my-3 overflow-hidden shadow-md shadow-slate-300 rounded-lg">
      <div className="w-1/3 border-2 overflow-hidden border-orange-400 rounded-lg">
        <img
          className="w-full h-full"
          src={`http://localhost:9999/shop/api/v1/image/${goods.image}`}
        />
      </div>
      <div className="p-3 flex justify-between w-2/3">
        <div>
          <div className="font-bold">{goods.goods}</div>
          <div>
            <span className="text-orange-500 text-xs">￥</span>
            <span className="text-orange-600">{goods.price}</span>
          </div>

          <div className="text-sm mt-3">{goods.goodsIntroduce}</div>
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <span className="text-xs p-1 py-0 rounded-sm border-orange-400 border-1 text-orange-400">
              快速送达
            </span>
          </div>
          <div className="space-x-3">
            {/* <Button danger size="small" onClick={handleBuy}>
              购买
            </Button> */}
            <Button danger size="small" onClick={handleAddCart}>
              <ShoppingCartOutlined />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
