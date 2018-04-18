import {add} from '../services/recruit';
import {Toast} from 'antd-mobile';


export default {
  namespace:"recruit",
  state:{

  },
  effects:{
    *add({opts,reset},{call,put}){
      Toast.loading("请稍候",0);
      const {success,result,error} = yield call(add,opts);
      Toast.hide();
      if(success){
        Toast.success("报名成功");
        reset();
      }else{
        Toast.fail(error.message);
      }
    }
  }
}
