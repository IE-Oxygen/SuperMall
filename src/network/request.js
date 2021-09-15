import axios from 'axios'
import axiosRetry from 'axios-retry'
import {store} from '@/store/index.js'
export function request(config){
  const instance = axios.create({
    baseURL:'http://152.136.185.210:7878/api/m5' ,
    timeout:5000
  });

  //请求拦截器
  instance.interceptors.request.use(
    config =>{
      store.commit('showLoading')
      return config;
    },
    err =>{
      console.log(err);
    }
  )
  //响应拦截器
  instance.interceptors.response.use(
    res =>{
      store.commit('hiddenLoading')
      //过滤响应报文中axios添加的信息，取出数据
      return res.data;
    },
    err =>{
      console.log(err);
      
    }
  )
  axiosRetry(instance, {
    retries: 3,                       // 设置自动发送请求次数
    retryDelay: (retryCount) => {
      return retryCount * 2000;      // 重复请求延迟
    },
    shouldResetTimeout: true,       //  重置超时时间
    retryCondition: (error) => {
      //true为打开自动发送请求，false为关闭自动发送请求
      if (error.message.includes("timeout")) {
        return true;
      } else {
        return false;
      }
    }
  });
  return instance(config);
}