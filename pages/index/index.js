//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    year:2020,
    month:12,
    day:1
  },
  //事件处理函数
  on_select(e) {
    const {
      year,
      month,
      day
    } = e.detail
    this.setData(e.detail)
    console.log('on select', year, month, day)
  },
  on_screendays(e){
    console.log('on screen days', e.detail)
  },
  onLoad: function () {
    if (app.globalData.userInfo) {}
  }
})