import React, { useEffect, useState } from "react";
import { getCartList, addCart, baseURL } from "../../axios";
import { InputNumber, message } from "antd";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cartList, setCartList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getCartList().then((res) => {
      if (res.status === 200) {
        setCartList(res.data);
      }
    });
  }, []);

  const handleAddCart = (goods, type) => {
    let cart;
    if (type === "add") {
      cart = {
        goodsId: goods.goodsId,
        count: goods.count + 1,
      };
    } else {
      cart = {
        goodsId: goods.goodsId,
        count: goods.count - 1,
      };
    }
    addCart(cart).then((res) => {
      if (res.status === 201) {
        setCartList(
          cartList
            .map((item) => {
              if (item.goodsId === cart.goodsId) {
                return {
                  ...item,
                  count: cart.count,
                };
              }
              return item;
            })
            .filter((item) => item.count !== 0)
        );
      }
    });
  };

  const createCartItem = (goods) => {
    return (
      <div
        key={goods.id}
        className="h-32 flex justify-start w-full my-3 overflow-hidden shadow-md shadow-slate-300 rounded-lg"
      >
        <div className="w-1/3 border-2 overflow-hidden border-orange-400 rounded-lg">
          <img
            className="w-full h-full"
            src={`${baseURL}/image/${goods.image}`}
          />
        </div>
        <div className="p-3 flex justify-between w-2/3">
          <div>
            <div className="font-bold">{goods.goods}</div>
            <div>
              <span className="text-orange-500 text-xs">￥</span>
              <span className="text-orange-600">{goods.price}</span>
            </div>

            {/* <div className="text-sm mt-3">{goods.price * goods.count}</div> */}
          </div>
          <div className="flex flex-col justify-between">
            <InputNumber
              value={goods.count}
              addonBefore={
                <span
                  onClick={(e) => {
                    handleAddCart(goods, "sub");
                  }}
                >
                  -
                </span>
              }
              addonAfter={
                <span
                  onClick={(e) => {
                    handleAddCart(goods, "add");
                  }}
                >
                  +
                </span>
              }
              width={50}
              style={{
                width: 120,
              }}
              readOnly
            />
          </div>
        </div>
      </div>
    );
  };

  const countAll = (cartList) => {
    return cartList
      .map((item) => item.count * item.price)
      .reduce((total, next) => total + next)
      .toFixed(2);
  };

  const handleBuy = () => {
    navigate("/buy", {
      state: cartList,
    });
  };

  return (
    <div>
      <div className="text-center p-4 pb-2 text-2xl border-b">
        <h3>购物车</h3>
      </div>
      {cartList.map((item) => createCartItem(item))}
      <div className="h-34 w-full bg-white"></div>
      <div className="fixed bottom-15 h-17 w-full bg-white border">
        <div className="w-full h-full flex justify-between items-center">
          <div className="flex justify-center items-center text-xl pl-6">
            <span>总计：</span>
            <span>
              <span className="text-orange-500 text-sm">￥ </span>
              {cartList && cartList.length && countAll(cartList)}
            </span>
          </div>
          <div
            onClick={handleBuy}
            className="h-full w-30 bg-orange-500 flex items-center justify-center text-white text-xl"
          >
            结算
          </div>
        </div>
      </div>
    </div>
  );
}
