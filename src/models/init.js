import queryString from 'query-string';
import {Toast} from 'antd-mobile';
import URI from 'urijs';
import {getOpenid} from '../services/wx';
import {routerRedux} from 'dva/router';
//微信授权相关配置
const config = {
  appid:"wx555d88e1e7a2f408",
  appsecret:"6f1ec87feffe2d861015f1419b77211b",
  hostname:"http://mnd.macjohson.com",
  wxUrl:"https://open.weixin.qq.com/connect/oauth2/authorize"
}

const authUrl = (id,pathname)=>{
 return new URI(config.wxUrl)
    .query({
      appid:config.appid,
      redirect_uri:config.hostname + pathname + `?id=${id}`,
      response_type:"code",
      scope:"snsapi_userinfo",
    })
    .hash("#wechat_redirect")
    .toString()
}


export default {
  namespace: "init",
  state: {
    activityCount:0,
    title:"米诺表单"
  },
  reducers:{
    update(state,{opts}){
      return {...state,...opts}
    }
  },
  subscriptions:{
    init({dispatch,history}){
      history.listen(({pathname,search})=>{
          if(pathname === "/form"){
            const {id,code} = queryString.parse(search);
            if(!code && !sessionStorage.getItem('openid')){
              window.location.assign(authUrl(id,pathname))
            }else{
              if(code && !sessionStorage.getItem('openid')){
                dispatch({
                  type:"getOpenid",
                  code,
                  id
                })
              }
            }
          }
      })
    }
  },
  effects: {
    /**
     * 获取openid
     * @param code
     * @param call
     * @param put
     */
    *getOpenid({code,id},{call,put}){
      Toast.loading("授权中...",0);
      const {success,result,error} = yield call(getOpenid,{code,activityId:id});
      Toast.hide();
      if(success){
        sessionStorage.setItem('openid',result.openId)
        yield put({
          type:"update",
          opts:{
            activityCount:result.activityCount,
            title:result.activityName
          }
        })
        const {id} = queryString.parse(window.location.search);
        yield put(routerRedux.replace(`/form?id=${id}`))
      }else{
        Toast.fail(error.message)
      }
    }
  }
}
