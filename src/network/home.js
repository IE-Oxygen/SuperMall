import { request } from "@/network/request.js";

export function getHomeMultidata(){
  return request({
    //注意url小写
    url: '/home/multidata'
  })
}

export function getHomeGoods(type, page){
  return request({
    url: 'home/data',
    params:{
      type,
      page,
    }
  })
}