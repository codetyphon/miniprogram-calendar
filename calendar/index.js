const now = new Date()
const year = now.getFullYear()
const month = now.getMonth()
const day = now.getDate()
Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    year: {
      type: Number,
      value: year,
    },
    month: {
      type: Number,
      value: month + 1,
    },
    day: {
      type: Number,
      value: day,
    }
  },
  data: {
    // 这里是一些组件内部数据
    screendays: [],
    days: [],
    daystitle: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
  },
  methods: {
    // 这里是一个自定义方法
    make_days_by_year_and_month(year, month, day) {
      month -= 1
      const COUNT = 6 * 7
      const days = []

      // 本月1日，是第几天。
      const ORIGIN = new Date(year, month, 1).getDay();

      // 上月多少日
      const LAST_DAYS = new Date(year, month + 1, 0).getDate();
      // 显示上月天数
      const SHOW_LAST_DAYS = ORIGIN
      for (let index = 0; index < SHOW_LAST_DAYS; index++) {
        days.push({
          class: "last",
          number: LAST_DAYS - SHOW_LAST_DAYS + index
        })
      }

      // 显示本月天数
      const SHOW_THIS_DAYS = new Date(year, month + 1, 0).getDate();
      for (let index = 1; index <= SHOW_THIS_DAYS; index++) {
        days.push({
          class: "this",
          number: index
        })
      }

      // 显示下月天数
      const SHOW_NEXT_DAYS = COUNT - SHOW_LAST_DAYS - SHOW_THIS_DAYS
      for (let index = 1; index <= SHOW_NEXT_DAYS; index++) {
        days.push({
          class: "next",
          number: index
        })
      }

      this.setData({
        days: days
      })

      let screendays = []

      days.map(item => {
        let year = this.data.year
        let month = this.data.month
        switch (item.class) {
          case "last":
            month -= 1
            if (month == 0) {
              month = 12
              year -= 1
            }
            break;
          case "this":
            break;
          case "next":
            month += 1
            if (month == 13) {
              month = 1
              year += 1
            }
            break;
          default:
            break;
        }
        const select = {
          year: year,
          month: month,
          day: item.number
        }
        screendays.push(select)
      })

      if (JSON.stringify(this.data.screendays) != JSON.stringify(screendays)) {
        this.setData({
          screendays: screendays
        })
        this.triggerEvent('screendays', screendays) //本屏所有能看到的日子
      }
    },
    on_select(event) {
      const item = event.currentTarget.dataset.item

      let year = this.data.year
      let month = this.data.month


      switch (item.class) {
        case "last":
          month -= 1
          if (month == 0) {
            month = 12
            year -= 1
          }
          break;
        case "this":
          break;
        case "next":
          month += 1
          if (month == 13) {
            month = 1
            year += 1
          }
          break;
        default:
          break;
      }
      const select = {
        year: year,
        month: month,
        day: item.number
      }
      this.triggerEvent('select', select)
      this.setData(select)
      this.make_days_by_year_and_month(this.data.year, this.data.month, this.data.day)
    }
  },
  lifetimes: {
    attached: function () {
      // 在组件实例进入页面节点树时执行
      console.log(this.data.year, this.data.month, this.data.day)
      this.make_days_by_year_and_month(this.data.year, this.data.month, this.data.day)
    },
    detached: function () {
      // 在组件实例被从页面节点树移除时执行
    },
  },
})