import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'


import range from './range'

const returnDayList = (year, month) => {
  const currentTime = moment(`${year}-${month}-01`)
  const week = currentTime.days()
  const totalDays = currentTime.daysInMonth()
  const prevMonthDays = moment(`${year}-${month}-01`).subtract(1, 'month').daysInMonth()
  const prevExtraDayStart = week
  const day = range({ start: 0, end: week }, idx => {
    return {
      day: prevMonthDays - prevExtraDayStart + idx + 1,
      month: month - 1 === 0 ? 12 : month - 1,
      year: month - 1 === 0 ? year - 1 : year
    }
  })

  for (let idx = 1; idx <= totalDays; idx ++) {
    day[day.length] = {
      day: idx,
      month: month,
      year: year,
      high: true
    }
  }
  // 补全日期
  let extrDay = 1
  for (let idx = day.length; idx < 42; idx++) {
    day[day.length] = {
      day: extrDay,
      month: month === 12 ? 1 : month + 1,
      year: month === 12 ? year + 1 : year
    }
    extrDay += 1
  }
  return day
}

export default class Day extends React.Component {
  constructor(props) {
    super(props)
    const { currentYear, currentMonth } = this.props
    this.state = {
      currentMonth,
      currentYear,
      day: returnDayList(currentYear, currentMonth)
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.currentYear !== prevState.currentYear
      || nextProps.currentMonth !== prevState.currentMonth
    ) {
      const { currentYear, currentMonth } = nextProps
      return {
        currentMonth,
        currentYear,
        day: returnDayList(currentYear, currentMonth)
      }
    }
    return null
  }
  toggleDataList = day => () => {
    const { toggleDataList, toggleDay, dataMap } = this.props
    if (toggleDataList && typeof toggleDataList === 'function') {
        toggleDataList(day)
    }
    if (!day.high) {
      toggleDay(day)
    }
  }
  render() {
    const { day } = this.state
    const { dataMap } = this.props
    return <ul className="ty-calendar-day">
      {
        day.map((day, idx) => <li
          onClick={this.toggleDataList(day)}
          title={`${day.year}年${day.month}月${day.day}日`}
          style={idx > 0 && ((idx + 1) % 7) === 0 ? { borderRight: `0px` } : {}}
          className={day.high ? 'ty-calendar-day-item' : 'ty-calendar-day-item ty-calendar-day-fade'}>
          <div
            className="ty-calendar-day-circle" style={{ zIndex: 10 }}>
            {day.day}
          </div>
          {
            day.high && dataMap[day.day] ? <div
              style={{ backgroundColor: dataMap[day.day], transform: 'scale(1)', zIndex: 9 }}
              className="ty-calendar-day-circle">
              {day.day}
            </div> : ''
          }
          {day.day}
        </li>)
      }
    </ul>
  }
}

Day.propTypes = {
  toggleDay: PropTypes.func,
  toggleDataList: PropTypes.func,
  dataMap: PropTypes.object,
  currentYear: PropTypes.number,
  currentMonth: PropTypes.number
}
Day.defaultProps = {
  dataMap: {}
}
