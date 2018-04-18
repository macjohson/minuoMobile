import React from 'react';
import {connect} from 'dva';
import {NavBar, Icon, Flex} from 'antd-mobile';
import moment from 'moment';
import "./style.less";
import monthDays from '../../utils/monthDays';
const nowYear = moment().year();
const nowMonth = moment().month();
const {Item} = Flex;

const defaultArrayClass = new monthDays(nowYear,nowMonth + 1)

class readCmsIndex extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      year:nowYear,
      month:nowMonth + 1,
      dayArray:defaultArrayClass.monthDays()
    }
    this.week = ["日","一","二","三","四","五","六"]
  }

  /**
   * 往下翻页
   */
  next = ()=>{
    const year = this.state.year;
    const month = this.state.month;
    let nextYear = null,nextMonth = null;
    if(month < 12){
      nextYear = year;
      nextMonth = month + 1;
    }else{
      nextYear = year + 1;
      nextMonth = 1;
    }
    const nextDays = new monthDays(nextYear,nextMonth);
    const days = nextDays.monthDays();
    this.setState({
      year:nextYear,
      month:nextMonth,
      dayArray:days
    })
  }

  pre = ()=>{
    const year = this.state.year;
    const month = this.state.month;
    let nextYear = null,nextMonth = null;
    if(month > 1){
      nextYear = year;
      nextMonth = month - 1;
    }else{
      nextYear = year - 1;
      nextMonth = 12;
    }
    const nextDays = new monthDays(nextYear,nextMonth);
    const days = nextDays.monthDays();
    this.setState({
      year:nextYear,
      month:nextMonth,
      dayArray:days
    })
  }

  render() {
    console.log(this.state.dayArray)
    return (
      <div>
        <NavBar
          className={"topBar"}
          mode="dark"
          icon={<Icon type="ellipsis"/>}
          onLeftClick={() => console.log('onLeftClick')}
          rightContent={[
            <Icon key="0" type="search" style={{marginRight: '16px'}}/>,
          ]}
        >
          <span>米诺郎朗书声</span>
        </NavBar>
        <div className={"calendar"}>
          <Flex wrap={"noWrap"}>
            {
              this.week.map((item,key)=>(
                <Item key={key} className={"innerItem"}>{item}</Item>
              ))
            }
          </Flex>
          {
            this.state.dayArray.map((item,key)=>(
              <Flex key={key}>
                {
                  item.map((_item,_key)=>(
                    _item === null ?
                      <Item key={_key}></Item> :
                      <Item className={"innerItem"} key={_key}>{_item}</Item>
                  ))
                }
              </Flex>
            ))
          }
          <Flex className={"bottomBtn"}>
            <Item style={{textAlign:"center"}}>
              <Icon type={"left"} style={{marginTop:10}} onClick={this.pre}/>
            </Item>
            <Item style={{textAlign:"center"}}>
              {`${this.state.year}年${this.state.month}月`}
            </Item>
            <Item style={{textAlign:"center"}}>
              <Icon type={"right"} style={{marginTop:10}} onClick={this.next}/>
            </Item>
          </Flex>
        </div>
      </div>
    )
  }
}

export default connect()(readCmsIndex);
