import React, { useEffect, memo, useState } from "react";
import { useLocation } from "react-router-dom";
import { getConsigneeList, commitOrderBatch, baseURL } from "../../axios";
import { Select, InputNumber, message } from "antd";
import { useNavigate } from "react-router-dom";

export default memo(function Buy() {
  const { state: goodsList } = useLocation();
  const [consignee, setConsignee] = useState([]);
  const [goodsListCount, setGoodsListCount] = useState([]);
  const [consigneeId, setConsigneeId] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    setGoodsListCount(goodsList);
  }, []);
  useEffect(() => {
    getConsigneeList().then((res) => {
      if (res.status === 200) {
        setConsignee(res.data);
        setConsigneeId({
          value: res.data[0].id,
          label: `${res.data[0].receiver}+${res.data[0].telephone}+${res.data[0].area}${res.data[0].address}`,
        });
      }
    });
  }, []);

  const calTotalPrice = (goods) => {
    return goods
      .map((item) => item.count * item.price)
      .reduce((pre, next) => pre + next)
      .toFixed(2);
  };

  const handleCHangeCount = (goods, type) => {
    setGoodsListCount(
      goodsListCount.map((item) => {
        if (item.goodsId === goods.goodsId) {
          let { count } = goods;
          if (type === "add") {
            count += 1;
          } else {
            count -= 1;
          }
          return {
            ...item,
            count,
          };
        }
        return item;
      })
    );
  };

  const createGoodsList = (goods) => {
    return (
      <div
        key={goods.goodsId}
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

            {/* <div className="text-sm mt-3">{goods.goodsIntroduce}</div> */}
          </div>
          <div className="flex flex-col justify-between">
            <InputNumber
              value={goods.count}
              addonBefore={
                <span
                  onClick={(e) => {
                    handleCHangeCount(goods, "sub");
                  }}
                >
                  -
                </span>
              }
              addonAfter={
                <span
                  onClick={(e) => {
                    handleCHangeCount(goods, "add");
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

  const createNullGoodsList = () => {
    return (
      <div className=" p-3 flex justify-start w-full my-3 overflow-hidden shadow-md shadow-slate-300 rounded-lg">
        没有商品，请到首页下单
      </div>
    );
  };

  const handleChange = (e) => {
    const current = consignee.filter((item) => item.id === e);
    setConsigneeId({
      value: e,
      label: `${current[0].receiver}+${current[0].telephone}+${current[0].area}${current[0].address}`,
    });
  };

  const createConsignee = (consignee) => {
    {
      /* {consignee.map((item) => (
          <Select.Option key={item.id}>
            {item.receiver}+{item.telephone}+{item.area}
            {item.address}
          </Select.Option>
        ))}
      </Select> */
    }
    return (
      <Select
        onChange={handleChange}
        value={consigneeId}
        options={consignee.map((item) => ({
          value: item.id,
          label: `${item.receiver}+${item.telephone}+${item.area}${item.address}`,
        }))}
      />
    );
  };

  const hendleBuy = () => {
    console.log(goodsListCount);
    const goodsCartList = goodsListCount.map((item) => ({
      goodsId: item.goodsId,
      count: item.count,
    }));
    commitOrderBatch(goodsCartList, consigneeId.value).then((res) => {
      if (res.status === 201) {
        message.success(res.data.msg);
        navigate("/home/user");
      }
    });
  };

  return (
    <div>
      <div className="text-center p-4 pb-2 text-2xl border-b">
        <h3>付款</h3>
      </div>
      <div className="flex justify-start items-center p-2">
        <div>选择地址：</div>
        {consignee && consignee.length && createConsignee(consignee)}
      </div>
      <div>
        {goodsListCount && goodsListCount.length
          ? goodsListCount.map((item) => createGoodsList(item))
          : createNullGoodsList()}
      </div>
      <div className="h-16 fixed bottom-0 w-full opacity-95 bg-light-500">
        <div className="flex justify-between items-center h-full">
          <div className="pl-4">
            总价:
            <span className="text-orange-400 text-md">￥</span>
            {goodsListCount && goodsListCount.length
              ? calTotalPrice(goodsListCount)
              : 0}
          </div>
          <div
            onClick={hendleBuy}
            className="w-30 text-center  text-white text-xl bg-orange-500 h-full flex items-center justify-center"
          >
            提交
          </div>
        </div>
      </div>
    </div>
  );
});
