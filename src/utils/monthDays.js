import moment from 'moment';

class monthDays{
  constructor(year,month){
    this.year = year;
    this.month = month;
    //31天的月份
    this.max = [1, 3, 5, 7, 8, 10, 12];
    //30天的月份
    this.min = [4, 6, 9, 11];
    //大月份天数
    this.maxDays = 31;
    //小月份天数
    this.minDays = 30;
  }

  /**
   * 平年或闰年天数
   * @returns {number}
   */
  isLeapYear = () => {
    if ((this.year % 4 === 0) && (this.year % 100 !== 0 || this.year % 400 === 0)) {
      return 29
    } else {
      return 28
    }
  };

  /**
   * 天数数组
   * @param num
   * @returns {Array}
   */
  getDays = (num) => {
    const days = [];
    let day = 1;
    for (let i = 0; i < num; i++) {
      days.push(day);
      day++
    }
    return days;
  };

  /**
   * 每个月的天数
   * @returns {number}
   */
  getMonthDayNum = (month) => {
    if (this.max.includes(month)) {
      return this.maxDays
    } else if (this.min.includes(month)) {
      return this.minDays
    } else if (month === 2) {
      return this.isLeapYear()
    }
  };

  /**
   * 获取填充数组
   * @param num
   * @param needNum
   * @returns {Array}
   */
  getNeedArray = (num, needNum) => {
    let _num = num;
    const needArray = [];
    for (let i = 0; i < needNum; i++) {
      needArray.push(null);
      _num = _num - 1
    }
    return needArray.sort()
  };

  getFullArray = (days) => {
    //2月天数
    const monthTwo = this.isLeapYear();
    //月份第一天星期几
    const month = this.month < 10 ? `0${this.month}` : this.month
    const addNum = moment(`${this.year}-${month}-01`).day();
    const preMonth = this.month - 1 > 0 ? this.month - 1 : 12;
    const preMonthDayNum = this.getMonthDayNum(preMonth);
    const needDayArray = this.getNeedArray(preMonthDayNum, addNum);
    const fullDays = [...needDayArray,...days];

    const _fullDays = [];
    let pushArray = [];
    for (let b = 0;b < fullDays.length;b++){
      if(pushArray.length < 7){
        pushArray.push(fullDays[b])
      }else{
        _fullDays.push(pushArray)
        pushArray = []
        pushArray.push(fullDays[b])
      }
    }

    fullDays.splice(0,_fullDays.length * 7)

    const add = ()=>{
      if(fullDays.length < 7){
        fullDays.push(null);
        add();
      }
    }

    add();

    return [..._fullDays,fullDays];
  };

  /**
   * 计算月份数组
   */
  monthDays = () => {
    if (this.max.includes(this.month)) {
      const _dayArray = this.getDays(this.maxDays);
      return this.getFullArray(_dayArray)
    } else if (this.min.includes(this.month)) {
      const _dayArray = this.getDays(this.minDays);
      return this.getFullArray(_dayArray)
    } else if (this.month === 2) {
      const _dayArray = this.getDays(this.isLeapYear());
      return this.getFullArray(_dayArray)
    }
  }
}

export default monthDays;
