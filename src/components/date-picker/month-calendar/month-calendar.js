import {h, Component, Fragment} from "preact";
import {Styler} from "../../../lib/styler";
import styles from './month-calendar.scss';
import {SHORT_DAY_NAMES} from "../utility";

export default class MonthCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = this.initializeStateFromProps(props);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const stateObj = this.initializeStateFromProps(nextProps);
    this.setState(stateObj);
  }

  initializeStateFromProps(props) {
    return {
      ...props
    }
  }

  makeDateFromDate(date) {
    return new Date(this.props.currentYear, this.props.currentMonth, date);
  }

  getFirstDay() {
    return new Date(this.props.currentYear, this.props.currentMonth, 1).getDay();
  }

  getDaysInMonth() {
    return new Date(this.props.currentYear, this.props.currentMonth + 1, 0).getDate();
  }

  dateClicked(date) {
    // first date clicked -> range selection has not started yet or new range is being selected
    if (!this.state.first || (this.state.first && this.state.second)) {
      this.props.emitCalendarValues({
        first: this.makeDateFromDate(date),
        second: null,
        isRangeInMotion: true,
        rangeSelected: false
      });
      return;
    }

    // second date clicked -> range in motion, with first date present but not second.
    if (!this.state.second) {
      let first = this.state.first;
      let second = this.makeDateFromDate(date);
      if (first > second) {
        second = first;
        first = this.makeDateFromDate(date);
      }
      this.props.emitCalendarValues({
        first: first,
        second: second,
        isRangeInMotion: false,
        rangeSelected: true
      });
    }
  }

  getClassesIfDateInRange(date) {
    if (this.state.rangeSelected) {
      const firstMili = this.state.first.getTime();
      const secondMili = this.state.second.getTime();
      const dateMili = this.makeDateFromDate(date).getTime();
      if (dateMili >= firstMili && dateMili <= secondMili){
        return 'in-range';
      }
    }
    return '';
  }

  generateRangeMonth(firstDay, daysInMonth) {
    const result = [];

    for (let i = firstDay; i < (daysInMonth + firstDay); i++) {
      const date = i - firstDay + 1;
      result.push(
        <div className={`date ${this.getClassesIfDateInRange(date)}`} onClick={() => {
          this.dateClicked(date)
        }}>
          {date}
          {
            (this.state.rangeSelected || this.state.isRangeInMotion) &&
            <Fragment>
              {this.isFirstDateSelected(date) && <div className='first-date'></div>}
              {this.isSecondDateSelected(date) && <div className='second-date'></div>}
              {(this.isFirstDateSelected(date) || this.isSecondDateSelected(date)) && <div className='selected-date-bg'>{date}</div>}
            </Fragment>
          }
        </div>
      )
    }
    return result;
  }

  selectSingleDate(date) {
    this.props.emitCalendarValues({
      first: this.makeDateFromDate(date)
    });
  }

  isSecondDateSelected(date) {
    return this.state.second && this.state.second.getTime() === this.makeDateFromDate(date).getTime();
  }

  isFirstDateSelected(date) {
    return this.state.first && this.state.first.getTime() === this.makeDateFromDate(date).getTime();
  }

  generateSingleDateMonth(firstDay, daysInMonth) {
    const result = [];

    for (let i = firstDay; i < (daysInMonth + firstDay); i++) {
      const date = i - firstDay + 1;
      result.push(
        <div className={`date`} onClick={() => {
          this.selectSingleDate(date)
        }}>
          {date}
          {
            this.isFirstDateSelected(date) && <div className='selected-date-bg'>{date}</div>
          }
        </div>
      )
    }
    return result;
  }

  generateMonth() {
    let result = [];
    const firstDay = this.getFirstDay();
    const daysInMonth = this.getDaysInMonth();

    for (let i = 0; i < firstDay; i++) {
      result.push(
        <div></div>
      )
    }

    if (this.props.isRange) {
      result = result.concat(this.generateRangeMonth(firstDay, daysInMonth));
    } else {
      result = result.concat(this.generateSingleDateMonth(firstDay, daysInMonth));
    }
    return result;
  }

  render(props, state, context) {
    return (
      <Styler styles={styles}>
        <div className={this.props.readonly ? 'month-calendar-wrapper freeze-events' : 'month-calendar-wrapper'}>
          <div className="week-day-names">
            {
              SHORT_DAY_NAMES.map(day => (
                <div>{day}</div>
              ))
            }
          </div>

          <div className="month-dates">
            {
              this.generateMonth()
            }
          </div>
        </div>
      </Styler>
    );
  }

}
