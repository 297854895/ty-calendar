import React from 'react'
import PropTypes from 'prop-types'

import range from './range'

export default class Month extends React.Component {
  state = {
    month: range({ start: 1, end: 13, endStr: '月'}),
    active: this.props.currentMonth
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.active !== nextProps.currentMonth) {
      return {
        active: nextProps.currentMonth
      }
    }
    return null
  }
  toggleMonth = month => () => {
    const { active } = this.state
    if (active === month) return
    this.props.toggleMonth(month)
  }
  render() {
    const { month, active } = this.state
    const { monthEndRender, borderColor } = this.props
    return <ul className='ty-calendar-month'>
      {
        month.map((item, idx) => <li
          onClick={this.toggleMonth(idx + 1)}
          className={idx + 1 === active ? 'ty-calendar-month-active' : ''}>
          <span>{item}</span>
          <i>{monthEndRender && typeof monthEndRender === 'function' ? monthEndRender(idx + 1) : ''}</i>
        </li>)
      }
    </ul>
  }
}
Month.propTypes = {
  monthEndRender: PropTypes.func,
  currentMonth: PropTypes.number,
  toggleMonth: PropTypes.func
}
