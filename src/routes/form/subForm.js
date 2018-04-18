import React from 'react';
import {connect} from 'dva';
import "../../assets/style.less";
import {List,InputItem,Button,DatePicker,Picker,Toast,Modal} from 'antd-mobile';
import {createForm} from 'rc-form';
import moment from 'moment';
const {alert} = Modal;
import queryString from 'query-string';

class subForm extends React.PureComponent{
  constructor(props){
    super(props);
    this.dispatch = props.dispatch;
    this.getFieldProps = props.form.getFieldProps;
    this.validateFields = props.form.validateFields;
    this.resetFields = props.form.resetFields;
    this.isFieldsTouched = props.form.isFieldsTouched;
    this.query = queryString.parse(this.props.location.search);
  }

  submit = ()=>{
    this.validateFields((err,val)=>{
      if(err){
        const errorFields = Object.keys(err);
        Toast.fail(err[errorFields[0]].errors[0].message,2,()=>{},false)
      }else{
        val.birthday = moment(val.birthday).format('YYYY-MM-DD');
        val.gender = val.gender[0];
        const {id} = queryString.parse(this.props.location.search);
        val.activityId = id;
        val.openId = sessionStorage.getItem('openid');

        this.dispatch({
          type:"subForm/subForm",
          payload:val
        })
      }
    })
  };

  reset = ()=>{
    if(this.isFieldsTouched()){
      alert("提示","该操作会重置所有已填写信息，确认执行该操作？",[{text:"取消"},{text:"确定重置",onPress:()=>{
        this.resetFields();
        this.dispatch({
          type:"subForm/resetFields"
        })
        }}])
    }
  };

  nameLenValidate = (rules,value,callback)=>{
    if(value && value.length > 30){
      callback("姓名长度不能超过30个字符")
    }
    callback()
  };

  schoolLenValidate = (rules,value,callback)=>{
    if(value && value.length > 30){
      callback("学校长度不能超过30个字符")
    }
    callback()
  };

  render(){
    const {
      subForm:{
        sex,
        birthday,
        total
      },
      init:{
        activityCount,
        title
      }
    } = this.props;

    document.querySelector('title').innerText = title

    return (
      <div>
        <div className="topBack">
          <h5>米诺表单</h5>
          <span className="tip">{this.query.title}</span>
          <div className="formWrapper">
            <List>
              <InputItem placeholder="请输入" {...this.getFieldProps('name',{rules:[{required:true,message:"请填写姓名"},{validator:this.nameLenValidate}]})}>姓名</InputItem>
              <InputItem placeholder="请输入" {...this.getFieldProps('phoneNumber',{rules:[{required:true,message:"请填写电话号码"},
                  {pattern:/^1(3[0-9]|4[579]|5[0-35-9]|7[0-9]|8[0-9])\d{8}$/,message:"手机号码错误"}
              ]})}>电话号码</InputItem>
              <Picker data={[{label:"男",value:"1"},{label:"女",value:"2"}]} cols={1} value={sex} onPickerChange={(sex)=>this.dispatch({type:"subForm/setSex",sex})}
                      {...this.getFieldProps('gender',{
                        rules:[{required:true,message:"请选择性别"}]
                      })}
              >
                <List.Item arrow="horizontal">您的性别</List.Item>
              </Picker>
              <InputItem placeholder="请输入" {...this.getFieldProps('studentName',{rules:[{required:true,message:"请填写孩子姓名"},{validator:this.nameLenValidate}]})}>孩子姓名</InputItem>
              <DatePicker mode="date" onChange={birthday=>this.dispatch({type:"subForm/setBirthday",birthday})} value={birthday}
                          {...this.getFieldProps('birthday',{
                            rules:[{required:true,message:"请选择宝宝生日"}]
                          })}
              >
                <List.Item arrow="horizontal">孩子生日</List.Item>
              </DatePicker>
              <InputItem placeholder="请输入" {...this.getFieldProps('school',{rules:[{required:true,message:"请填写宝宝学校"},{validator:this.schoolLenValidate}]})}>孩子学校</InputItem>
            </List>
          </div>
          <div className="btn">
            <Button type="primary" onClick={this.submit} disabled={activityCount === 0}>{`提交(仅剩${activityCount}个名额)`}</Button>
            <Button style={{marginTop:"1rem"}} onClick={this.reset}>重填</Button>
          </div>
        </div>
        <div className="footer">2018 獾哥科技强力驱动</div>
      </div>
    )
  }
}

export default connect(({subForm,init})=>({subForm,init}))(createForm()(subForm))
