import {initForm,sub} from '../services/subForm';
import {Toast} from 'antd-mobile';
import {routerRedux} from 'dva/router';

export default{
  namespace:"subForm",
  state:{
    sex:[],
    birthday:null,
    isUser:false,
    total:0
  },
  effects:{
    *subForm({payload},{call,put,select}){
      Toast.loading("提交中",0);
      const {success,result,error} = yield call(sub,payload);
      Toast.hide();
      if(success){
        yield put({
          type:"init/update",
          opts:{
            activityCount:result
          }
        });
        yield put(routerRedux.push({pathname:"/tip",query:{type:"success",text:"报名成功"}}))
      }else{
        Toast.fail(error.message)
      }
    }
  },
  reducers:{
    setSex(state,{sex}){
      return {...state,sex}
    },
    setBirthday(state,{birthday}){
      return {...state,birthday}
    },
    resetFields(state){
      return {...state,sex:null,birthday:null}
    },
    update(state,{payload}){
      return {...state,...payload}
    }
  }
}
