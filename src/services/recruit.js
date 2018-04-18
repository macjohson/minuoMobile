import {fetchPost} from '../utils/common';

export const add = (param)=>{
  return fetchPost("/api/services/app/wapActivities/AddInterimEnroll",param);
};
