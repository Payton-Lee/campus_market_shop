import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:9999/shop/api/v1",
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


