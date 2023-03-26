import React, { useEffect, memo, useState } from "react";
import { useLocation } from "react-router-dom";
import { getConsigneeList } from "../../asiox";

export default memo(function Buy() {
  const { state: goodsList } = useLocation();
  const [consignee, setConsignee] = useState([]);
  const [goodsListCount, setGoodsListCount] = useState([]);
  useEffect(() => {
    setGoodsListCount(goodsList);
    getConsigneeList().then((res) => {
      if (res.status === 200) {
        setConsignee(res.data);
      }
    });
  }, []);

  const calTotalPrice = (goods) => {
    return goods
      .map((item) => item.count * item.price)
      .reduce((pre, next) => pre + next)
      .toFixed(2);
  };

  const createGoodsList = (goods) => {
    return (
      <div
        key={goods.id}
        className="h-32 flex justify-start w-full my-3 overflow-hidden shadow-md shadow-slate-300 rounded-lg"
      >
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
          <div className="flex flex-col justify-between"></div>
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

  const createConsignee = (consignee) => {
    return <div></div>;
  };

  return (
    <div>
      <div className="text-center p-4 pb-2 text-2xl border-b">
        <h3>付款</h3>
      </div>
      <div>
        <div>地址详情</div>
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
          <div className="w-30 text-center bg-orange-500 h-full flex items-center justify-center">
            提交
          </div>
        </div>
      </div>
    </div>
  );
});
