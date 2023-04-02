import axios from "axios";

export const baseURL = "http://192.168.1.3:9999/shop/api/v1"

const instance = axios.create({
  baseURL,
  timeout: 10000
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.sessionStorage.getItem('token');
  return config;
});

instance.interceptors.response.use((config) => {
  return config;
})

export const login = async (user) => {
  try {
    const res = await instance.post("/user/login", user);
    return res.data;
  } catch (e) {
    return e
  }
}

export const register = async (user) => {
  try {
    const res = await instance.post("/user/register", user);
    return res.data
  } catch (e) {
    return e
  }
}

export const goodsList = async (params) => {
  try {
    const res = await instance.get("/buy/goodsList", {
      params,
    });
    return res.data;
  } catch (e) {
    return e
  }
}

export const getConsigneeList = async () => {
  try {
    const res = await instance.get("/buy/getConsigneeList");
    return res.data;
  } catch (e) {
    return e
  }
}

export const getAreaList = async () => {
  try {
    const res = await instance.get("/buy/getAreaList");
    return res.data;
  } catch (e) {
    return e
  }
}

export const addNewConsignee = async (data) => {
  try {
    const res = await instance.post("/buy/addNewConsignee", data);
    return res.data;
  } catch (e) {
    return e
  }
}

export const getCartList = async () => {
  try {
    const res = await instance.get("/buy/getCartList");
    return res.data;
  } catch (e) {
    return e
  }
}

export const addCart = async (data) => {
  try {
    const res = await instance.post("/buy/addCart", data);
    return res.data;
  } catch (e) {
    return e
  }
}

export const commitOrderBatch = async (data, consigneeId) => {
  try {
    const res = await instance.post(`/buy/commitOrderBatch/${consigneeId}`, data);
    return res.data;
  } catch (e) {
    return e
  }
}

export const getOrderList = async () => {
  try {
    const res = await instance.get("/buy/getOrderList/");
    return res.data;
  } catch (e) {
    return e
  }
}

export const getOrderItemList = async (orderId) => {
  try {
    const res = await instance.get(`/buy/getOrderItemList/${orderId}`);
    return res.data;
  } catch (e) {
    return e
  }
}


