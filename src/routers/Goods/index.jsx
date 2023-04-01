import React, { useEffect, useState, useRef } from "react";
import GoodsItem from "../../components/GoodsItem";
import { goodsList, addCart } from "../../asiox";
import { Input, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function Goods() {
  const [queryInfo, setQueryInfo] = useState("");
  const [dataSource, setDataSource] = useState([]);
  const input = useRef();
  const navigate = useNavigate();
  useEffect(() => {
    goodsList({ queryInfo }).then((res) => {
      setDataSource(res.data);
    });
  }, [queryInfo]);

  const handleSearch = (e) => {
    setQueryInfo(e.target.value);
  };

  const handleChange = (e) => {
    const {
      target: { value },
    } = e;
    if (value.trim() === "") {
      setQueryInfo(value.trim());
    }
  };

  const handleClick = () => {
    const { value } = input.current.input;
    if (value.trim() !== "") {
      setQueryInfo(value.trim());
    }
  };

  const handleAddCart = (e) => {
    const cart = {
      goodsId: e.id,
      count: 1,
    };
    addCart(cart).then((res) => {
      if (res.status === 201) {
        message.success(res.data.msg);
      }
    });
  };

  const hendleBuy = (e) => {
    const token = window.sessionStorage.getItem("token");
    if (token) {
      console.log("去购买页面");
      navigate("/buy", {
        state: [e],
      });
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <div className="p-3 bg-white shadow-lg pb-1 z-99 fixed top-0 w-full">
        <Input
          prefix={<SearchOutlined onClick={handleClick} />}
          onPressEnter={handleSearch}
          onChange={handleChange}
          ref={input}
          suffix={<span onClick={handleClick}>搜索</span>}
          placeholder="搜你所想"
        />
      </div>
      <div className="mt-16 px-2">
        {dataSource.map((item) => {
          return (
            <GoodsItem
              key={item.id}
              goods={item}
              buy={hendleBuy}
              addCart={handleAddCart}
            />
          );
        })}
      </div>
      <div className="w-full h-17"></div>
    </div>
  );
}
