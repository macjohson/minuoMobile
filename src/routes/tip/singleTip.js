import {PureComponent} from 'react';
import {connect} from 'dva';
import {withRouter} from 'react-router';
import queryString from 'query-string';
import "../../assets/style.less";

import {Icon} from 'antd-mobile';

class singleTip extends PureComponent{
    constructor(props){
        super(props)
        const {type,text} = this.props.location.query;
        this.type = type;
        this.text = text;
    }

    render(){
        return (
            <div className="tipWrapper">
            <div className="icon">
            <Icon type={this.type === "success" ? "check-circle" : "cross-circle-o"} size="lg" className="success" color={this.type === "success" ? "#3FCA76" : "#E34F43"}/>
            </div>
            <div className="text">
            <h2>{
                this.type === "success" ? "操作成功" : "出错了" 
            }</h2>
            {this.text}
            </div>
            </div>
        )
    }
}                 

export default connect()(withRouter(singleTip));