import {h, Component, Fragment} from "preact";
import {Styler} from "../../../lib/styler";
import styles from './date-picker-container.scss';
import YmHeader from "../ym-header/ym-header";
import YmSlider from "../ym-slider/ym-slider";
import MonthCalendar from "../month-calendar/month-calendar";

const VIEWS = {
  CALENDAR: 'CALENDAR',
  YM_SLIDER: 'YM_SLIDER'
};

export default class DatePickerContainer extends Component {
  constructor(props) {
    super(props);
    this.showYMSlider = this.showYMSlider.bind(this);
    this.changeYearMonth = this.changeYearMonth.bind(this);
    this.changeMonth = this.changeMonth.bind(this);
    this.emitCalendarValues = this.emitCalendarValues.bind(this);

    const today = new Date();
    this.state = {
      currentView: VIEWS.CALENDAR,
      currentYear: today.getFullYear(),
      currentMonth: today.getMonth(),
      first: null,
      second: null
    };
    this.state = {
      ...this.state,
      ...this.initializeState(props)
    };

    this.setChildrenProps(this.state, props);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const newStateObj = this.initializeState(nextProps);
    this.setState(newStateObj);
  }

  getNewDateFromDate(date) {
    const fullDate = new Date(date);
    return new Date(fullDate.getFullYear(), fullDate.getMonth(), fullDate.getDate());
  }

  initializeState(props) {
    const stateObj = {
      readonly: props.readonly === 'true',
      currentYear: props.hasOwnProperty('year') ? Number(props.year) : this.state.currentYear,
      currentMonth: props.hasOwnProperty('month') ? Number(props.month) : this.state.currentMonth,
      first: props.hasOwnProperty('start') ? this.getNewDateFromDate(props['start']) : this.state.first,
      second: props.hasOwnProperty('end') ? this.getNewDateFromDate(props['end']) : this.state.second,
      isRange: props.range === 'true',
      isRangeInMotion: false,
      rangeSelected: false,
    };
    stateObj.isRangeInMotion = !!(stateObj.isRange && stateObj.first && !stateObj.second);
    stateObj.rangeSelected = !!(stateObj.isRange && stateObj.first && stateObj.second);

    // sort dates
    if (stateObj.first && stateObj.second &&  (stateObj.first > stateObj.second)) {
      const temp = stateObj.second;
      stateObj.second = stateObj.first;
      stateObj.first = temp;
    }
    return stateObj;
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    this.setChildrenProps(nextState, nextProps);
  }

  setChildrenProps(state, props) {
    this.calendarProps = {
      ...state,
      emitCalendarValues: this.emitCalendarValues
    };

    this.ymHeaderProps = {
      currentYear: state.currentYear,
      currentMonth: state.currentMonth,
      showYMSlider: this.showYMSlider,
      changeMonth: this.changeMonth,
      changeYearMonth: this.changeYearMonth
    };

    this.ymSliderProps = {
      currentYear: state.currentYear,
      currentMonth: state.currentMonth,
      changeYearMonth: this.changeYearMonth
    }
  }

  dispatcher(values) {
    let data = {};
    if (!this.state.isRange) {
      data['date-selected'] = values.first;
    } else {
      data['start'] = values.first;
      data['end'] = values.second;
    }
    this.props.dispatchEvent('date-click', data);
  }

  emitCalendarValues(values) {
    this.setState({
      ...values
    });
    this.dispatcher(values);
  }

  changeMonth(month) {
    const date = new Date(this.state.currentYear, month);
    this.setState({
      currentMonth: date.getMonth(),
      currentYear: date.getFullYear()
    });
  }

  showYMSlider() {
    this.setState({
      currentView: VIEWS.YM_SLIDER
    });
  }

  changeYearMonth(year, month) {
    this.setState({
      currentYear: year,
      currentMonth: month,
      currentView: VIEWS.CALENDAR
    });
  }

  render(props, state, context) {
    return (
      <Styler styles={styles}>
        <div className="date-picker">
          {
            this.state.currentView === VIEWS.CALENDAR &&
            <Fragment>
              <YmHeader {...this.ymHeaderProps}></YmHeader>
              <MonthCalendar {...this.calendarProps}></MonthCalendar>
            </Fragment>
          }
          {this.state.currentView === VIEWS.YM_SLIDER && <YmSlider {...this.ymSliderProps}></YmSlider>}
        </div>
      </Styler>
    )
  }
}
