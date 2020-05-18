import {h} from "preact";
import {Styler} from "../../../lib/styler";
import styles from './ym-header.scss';
import {getShortMonthName} from "../utility";

const YmHeader = (props) => {
  return (
    <Styler styles={styles}>
      <div className="ym-header-wrapper">
        {/*<div className="arrow-container" onClick={() => props.changeYearMonth(props.currentYear - 1, props.currentMonth)}><div className="arrow left"></div><div className="arrow left"></div></div>*/}
        <div className="arrow-container" onClick={() => props.changeMonth(props.currentMonth - 1)}>
          <div className="arrow left"></div>
        </div>
        <div className="month-year-container" onClick={props.showYMSlider}>{getShortMonthName(props.currentMonth)} {props.currentYear}</div>
        <div className="arrow-container" onClick={() => props.changeMonth(props.currentMonth + 1)}>
          <div className="arrow right"></div>
        </div>
        {/*<div className="arrow-container" onClick={() => props.changeYearMonth(props.currentYear + 1, props.currentMonth)}><div className="arrow right"></div><div className="arrow right"></div></div>*/}
      </div>
    </Styler>
  );
};

export default YmHeader;
