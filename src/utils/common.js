import request from './request';
import queryString from 'query-string';

  export const fetchPost = (api,param)=>{
    return request(api,{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(param)
    })
  }

  export const fetchGet = (api,param)=>{
      return request(api + "?" + queryString.stringify(param))
  }