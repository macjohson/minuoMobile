import {fetchPost,fetchGet} from '../utils/common';

/**
 * 获取openid
 * @param param
 * @returns {*}
 */
export const getOpenid = (param)=>{
    return fetchPost("/api/services/app/wapUser/OAuth2",param);
}
