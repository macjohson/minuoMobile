import React from 'react';
import {connect} from 'dva';
import {Wait} from '../../assets/svg';
import "./style.less";
import TweenOne from 'rc-tween-one';

const AuthPage = ()=>{
  const animation = { scale: .8, yoyo: true, repeat: -1, duration: 1000 };
    return (
        <div className={"authPage"}>
            <div>
              <Wait size={"10rem"}/>
            </div>
          <div className={"tip"}>
            <TweenOne animation={animation}>
              <span>登录中，请稍等</span>
            </TweenOne>
          </div>
        </div>
    )
}

export default connect(({init})=>({init}))(AuthPage);
