import {h, render} from "preact";
import PreactApp from "./components/preact-app/app";
import DatePickerWrapper from "./components/date-picker/date-picker-wrapper";

const dispatchEvent = (eventName, data) => {
  console.log(eventName, data);
};

const Components = () => {
  return(
    <div>
      <DatePickerWrapper switch='picker-switch' position='manual'
                         range='true'
                         dispatchEvent={dispatchEvent}
                         end-date={new Date(2020, 4, 7).toString()}
                         start-date={new Date().toString()}></DatePickerWrapper>
      <br/>
      <PreactApp name="jain"></PreactApp>
    </div>
  );
};

render(<Components/>, document.getElementById("preact-root"));
