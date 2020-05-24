import {h, render} from "preact";
import PreactApp from "./components/preact-app/app";
import DatePickerWrapper from "./components/date-picker/date-picker-wrapper";

const dispatchEvent = (eventName, data) => {
  console.log(eventName, data);
};

const Components = () => {
  return(
    <div>
      <DatePickerWrapper position='manual'
                         range='true'
                         dispatchEvent={dispatchEvent}
                         end={new Date(2020, 4, 7).toString()}
                         start={new Date().toString()}></DatePickerWrapper>
      <br/>
      <PreactApp name="jain"></PreactApp>
    </div>
  );
};

render(<Components/>, document.getElementById("preact-root"));
