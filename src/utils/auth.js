import URI from 'urijs';
import queryString from 'query-string';
import moment from 'moment';

class weChatAuth{
  /**
   *
   * @param debug {appId,redirect_uri}
   * @param product {appId,redirect_uri}
   * @param ENV {string} debug || product
   */
  constructor({debug,product,ENV}){
    this.debug = debug;
    this.product = product;
    this.ENV = ENV;
  }

  // 生成跳转地址
  generateLocation = ()=>{
    const codeUrl = new URI('https://open.weixin.qq.com/connect/oauth2/authorize')
      .query({
        appid:this[this.ENV].appId,
        redirect_uri:this[this.ENV].redirect_uri,
        response_type:"code",
        scope:"snsapi_userinfo"
      })
      .hash("#wechat_redirect")
      .toString()

      return codeUrl
  }

  // 保存openid
  saveOpenid = (openid)=>{
    const _param = {
      openid,
      time:moment().format('X')
    }
    localStorage.setItem('openid',JSON.stringify(_param))
  }

  // 检查openid是否过期
  isOpenidTrue = ()=>{
    const _openid = JSON.parse(localStorage.getItem('openid'));

    if(!_openid){
      return false
    }

    if(parseInt(moment().format('X')) - parseInt(_openid.time) > 72000){
      return false
    }
    return true
  }
  
  // 授权跳转
  auth = (location)=>{
    const codeUrl = this.generateLocation()
    if(location){
      const _param = JSON.stringify({path:location.pathname,query:queryString.parse(location.search)})
    localStorage.setItem('auth_redirect_uri',_param)
    }
    window.location = codeUrl;
  }
}

export default weChatAuth;
