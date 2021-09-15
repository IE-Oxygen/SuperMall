import {request} from './request.js'

export function getRecommend(page){
  return request({
    url: '/recommend',
    params:{
      page
    }
  })
}