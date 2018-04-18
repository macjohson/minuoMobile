import React from 'react';
import {connect} from 'dva';
import {InputItem,List,WhiteSpace,WingBlank,Button,Picker,Toast,DatePicker} from 'antd-mobile';
import "../assets/style.less";
import {createForm} from 'rc-form';


const {Item} = List;


class recruit extends React.PureComponent{
  constructor(props){
    super(props);
    document.querySelector('title').innerText = "家塾新生报名表";
    const _type = ["一","二","三","四","五"];
    this.type = _type.map(item => ({label:`小学${item}年级`,value:`小学${item}年级`}));
    this.type.unshift({label:"蒙班（学前班）",value:"蒙班（学前班）"});
    this.sex = [
      {
        label:"男",
        value:1
      },
      {
        label:"女",
        value:2
      }
    ];
    this.year = [
      {
        label:"2018年",
        value:"2018年"
      },
      {
        label:"2019年",
        value:"2019年"
      }
    ];

    this.state = {
      sex:1,
      type:null,
      year:null,
      cs:1
    };


    this.getFieldProps = this.props.form.getFieldProps;
    this.resetFields = this.props.form.resetFields;
    this.validateFields = this.props.form.validateFields;
  }

  submit = ()=>{
    this.validateFields((err,val)=>{
      if(!err){
        if(!this.state.type){
          Toast.fail("请选择报读");
          return void 0;
        }

        if(!this.state.year){
          Toast.fail("请选择入学时间");
          return void 0
        }

        val.gender = this.state.sex;
        val.classes = this.state.type;
        val.inReadTime = this.state.year;
        val.studentGender = this.state.cs;

        this.props.dispatch({
          type:"recruit/add",
          opts:val,
          reset:()=>{
            this.setState({
              sex:1,
              type:null,
              year:null,
              cs:1
            });
            this.resetFields()
          }
        })
      }else{
        const errorFields = Object.keys(err);
        Toast.fail(err[errorFields[0]].errors[0].message,2,()=>{},false)
      }
    })
  };

  render(){
    return (
      <div>
        <WhiteSpace size={"lg"}/>
        <WingBlank>
          <span style={{color:"#ccc"}}>请填写家长信息</span>
        </WingBlank>
        <WhiteSpace/>
        <List>
          <InputItem {...this.getFieldProps('name',{
            rules:[{required:true,message:"请填写家长姓名"}]
          })}>姓名</InputItem>
          <InputItem type={"number"} {...this.getFieldProps('phoneNumber',{
            rules:[{required:"true",message:"请填写电话号码"}]
          })}>电话号码</InputItem>
          <Picker data={this.sex} cols={1} value={[this.state.sex]} onDismiss={()=>this.setState({sex:1})} onChange={val => this.setState({sex:val[0]})} onPickerChange={val => this.setState({sex:val[0]})}>
            <Item arrow="horizontal">性别</Item>
          </Picker>
        </List>
        <WhiteSpace size={"lg"}/>
        <WingBlank>
          <span style={{color:"#ccc"}}>请填写学生信息</span>
        </WingBlank>
        <WhiteSpace/>
        <List>
          <InputItem {...this.getFieldProps('studentName',{
            rules:[{required:true,message:"请填写学生姓名"}]
          })}>姓名</InputItem>
          <DatePicker {...this.getFieldProps('birthday',{
            rules:[{required:true,message:"请选择生日"}]
          })} minDate={new Date("1990-01-01")} maxDate={new Date()} mode={"date"}>
            <Item>生日</Item>
          </DatePicker>
          <Picker data={this.sex} cols={1} value={[this.state.cs]} onDismiss={()=>this.setState({cs:1})}  onChange={val => this.setState({cs:val[0]})} onPickerChange={val => this.setState({cs:val[0]})}>
            <Item arrow="horizontal">性别</Item>
          </Picker>
          <Picker data={this.type} cols={1} onDismiss={()=>this.setState({type:null})} value={[this.state.type]} onChange={val => this.setState({type:val[0]})} onPickerChange={val => this.setState({type:val[0]})}>
            <Item>报读</Item>
          </Picker>
          <Picker data={this.year} cols={1} value={[this.state.year]} onChange={val => this.setState({year:val[0]})} onPickerChange={val => this.setState({year:val[0]})} onDismiss={()=>this.setState({year:null})}>
            <Item>入读时间</Item>
          </Picker>
          <InputItem {...this.getFieldProps('school',{
            rules:[{required:true,message:"请填写学生现在所在学校"}]
          })}>现所在学校</InputItem>
        </List>
        <WhiteSpace size={"xl"}/>
        <WingBlank>
          <Button type={"primary"} onClick={this.submit}>提交报名信息</Button>
        </WingBlank>
        <div className="footer">2018 獾哥科技强力驱动</div>
      </div>
    )
  }
}

export default connect(({recruit})=>({recruit}))(createForm()(recruit));
