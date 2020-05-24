import {h, Component, createRef} from "preact";
import {Styler} from "../../../lib/styler";
import styles from './ym-slider.scss';
import {SHORT_MONTH_NAMES, getShortMonthName} from "../utility";

export default class YmHeader extends Component {
  constructor(props) {
    super(props);
    this.applyClicked = this.applyClicked.bind(this);
    this.yearContainer = createRef();
    this.yearSlider = createRef();

    this.state = {
      monthSelected: props.currentMonth || new Date().getMonth(),
      yearSelected: props.currentYear || new Date().getFullYear(),
      startDeg: 45,
      prevDeg: 45,
      unit: 10
    }
  }

  componentDidMount() {
    this.initializeYearSlider();
  }

  initializeYearSlider() {
    const container = this.yearContainer.current;
    const slider = this.yearSlider.current;

    const sliderWidth = slider.offsetWidth;
    const sliderHeight = slider.offsetHeight;
    const radius = container.offsetWidth/2;
    let deg = this.state.startDeg;
    let X;
    let Y;

    X = Math.round(radius* Math.sin(deg*Math.PI/180));
    Y = Math.round(radius* -Math.cos(deg*Math.PI/180));
    slider.style.left = (X+radius-sliderWidth/2) + 'px';
    slider.style.top = (Y+radius-sliderHeight/2) + 'px';

    let mdown = false;
    slider.addEventListener('mousedown', function (e) { mdown = true; e.preventDefault(); });
    container.addEventListener('mouseup', (e) => {
      mdown = false;
    });
    container.addEventListener('mousemove', (e) => {
      if(mdown)
      {

        let mPos;
        if(e.target === container) {
          mPos = {x: e.offsetX, y: e.offsetY};
        } else {
          mPos = {x: e.target.offsetLeft + e.offsetX, y: e.target.offsetTop + e.offsetY};
        }

        let atan = Math.atan2(mPos.x-radius, mPos.y-radius);
        deg = -atan/(Math.PI/180) + 180;

        deg = this.round(deg, this.state.unit);
        this.setYear(deg);

        X = Math.round(radius* Math.sin(deg*Math.PI/180));
        Y = Math.round(radius*  -Math.cos(deg*Math.PI/180));

        slider.style.left = (X+radius-sliderWidth/2) + 'px';
        slider.style.top = (Y+radius-sliderHeight/2) + 'px';
      }
    });
  }

  setYear(degree) {
    let yearSelected;
    if (degree === this.state.prevDeg) {
      return;
    }
    if ((degree%360 === 0) && (this.state.prevDeg%360 === 0)) {
      yearSelected = this.state.yearSelected;
    } else {
      yearSelected = (degree < this.state.prevDeg) ? this.state.yearSelected - 1 : this.state.yearSelected + 1;
    }

    this.setState({
      yearSelected,
      prevDeg: degree
    });
  }

  round (i, v){
    return Math.round(i/v) * v;
  }

  setMonth(month) {
    this.setState({
      monthSelected: month
    })
  }

  yearMoverClicked(inc) {
    const yearSelected = this.state.yearSelected + inc;
    const deg = inc > 0 ? (this.state.prevDeg + this.state.unit) : (this.state.prevDeg - this.state.unit);
    this.setState({
      yearSelected,
      startDeg: deg,
      prevDeg: deg
    }, this.initializeYearSlider);
  }

  applyClicked() {
    this.props.changeYearMonth(this.state.yearSelected, this.state.monthSelected);
  }

  render(props, state, context) {
    return (
      <Styler styles={styles}>
        <div className="ym-slider-wrapper">
          <div className="title-container">
            {getShortMonthName(this.state.monthSelected)} {this.state.yearSelected}
          </div>
          <div className="main-container">
            <div className="month-container">
              {
                SHORT_MONTH_NAMES.map((monthName, monthInd) =>
                  (
                    <div onClick={() => this.setMonth(monthInd)} className={monthInd === this.state.monthSelected ? 'active': ''}>
                      {monthName}
                    </div>
                  )
                )
              }
            </div>
            <div className="year-container" ref={this.yearContainer}>
              <div>{this.state.yearSelected}</div>
              <div className="year-slider" ref={this.yearSlider}></div>
            </div>
            <div className='year-mover'>
              <div className='tri-up' onClick={() => this.yearMoverClicked(1)}></div>
              <div className='tri-down' onClick={() => this.yearMoverClicked(-1)}></div>
            </div>
          </div>
          <div className="cta-container">
            <div className="apply-button" onClick={this.applyClicked}>Apply</div>
          </div>
        </div>
      </Styler>
    );
  }
};

