import {fetchPost,fetchGet} from '../utils/common';

export const initForm = (param)=>{
    return fetchPost('/api/mobileInit',param)
}

export const sub = (param)=>{
    return fetchPost("/api/services/app/wapActivities/AddEnrol",param)
}
