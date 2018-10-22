import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import './index.css'

import Month from './Month'
import Day from './Day'
const weekHead = [
  '星期日',
  '星期一',
  '星期二',
  '星期三',
  '星期四',
  '星期五',
  '星期六'
]

const weekMap = {
  0: '星期天',
  1: '星期一',
  2: '星期二',
  3: '星期三',
  4: '星期四',
  5: '星期五',
  6: '星期六'
}

const date = moment(new Date())

export default class Calendar extends React.Component {
  state = {
    year: date.year(),
    month: date.month() + 1,
    day: date.date(),
    week: weekMap[date.days()],
    currentYear: date.year(),
    currentMonth: date.month() + 1
  }
  shouldComponentUpdate(nextProps, nextState) {
    // if ( JSON.parse(JSON.stringify(nextProps.dataList)) !== JSON.parse(JSON.stringify(this.props.dataList)) ) return true
    if (nextState.currentYear !== this.state.currentYear) return true
    if (nextState.currentMonth !== this.state.currentMonth) return true
    if (nextProps.children !== this.props.children) return true
    return false
  }
  toggleYear = type => () => this.setState({ currentYear: this.state.currentYear + 1 * (type === 'next' ? 1 : -1) })
  toggleMonth = month => {
    this.setState({ currentMonth: month })
  }
  toggleDay = day => {
    if (day.high) return
    const { toggleDay } = this.props
    this.setState({ currentYear: day.year, currentMonth: day.month }, () => {
      if (!toggleDay || typeof toggleDay !== 'function') return
      toggleDay(day)
    })
  }
  render() {
    const { children, dataMap, monthEndRender, toggleDay, borderColor } = this.props
    const { year, month, day, week, currentYear, currentMonth } = this.state
    return (
      <div className="ty-calendar">
        <div className="ty-calendar-left" style={{ borderBottom: `1px solid ${borderColor}`, borderTop: `1px solid ${borderColor}` }}>
          <div className="ty-calendar-today">
            <b>{day}</b>&nbsp;&nbsp;<span>{week}</span>
            <p>{year}&nbsp;年&nbsp;{month}&nbsp;月</p>
          </div>
          <div className="ty-calendar-year">
            <b title="上一年" onClick={this.toggleYear('prev')}>&lt;</b>
            <span title={currentYear}>{currentYear}</span>
            <b title="下一年" onClick={this.toggleYear('next')}>&gt;</b>
          </div>
          <Month
            monthEndRender={monthEndRender}
            toggleMonth={this.toggleMonth}
            currentMonth={currentMonth} />
        </div>
        <div className="ty-calendar-right" style={{ borderTop: `1px solid ${borderColor}`, borderRight: `1px solid ${borderColor}` }}>
          <div className="ty-calendar-week-head">
            {
              weekHead.map(day => <div>{day}</div>)
            }
          </div>
          <Day
            borderColor={borderColor}
            toggleDay={this.toggleDay}
            toggleDataList={toggleDay}
            dataMap={dataMap}
            currentYear={currentYear}
            currentMonth={currentMonth} />
          {
            children && children.type ? children : ''
          }
        </div>
      </div>
    )
  }
}

Calendar.propTypes = {
  borderColor: PropTypes.string,
  // toggleDay: PropTypes.func,
  monthEndRender: PropTypes.func,
  monthData: PropTypes.array,
  dataMap: PropTypes.object
}
Calendar.defaultProps = {
  borderColor: '#dedede'
}
