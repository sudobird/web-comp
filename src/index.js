import {h, render} from "preact";
import HelloWorld from "./components/hello-world/hello-world";
import DatePickerWrapper from "./components/date-picker/date-picker-wrapper";

const dispatchEvent = (eventName, data) => {
  console.log(eventName, data);
};

const WebComps = () => {
  const componentStyles = {
    marginTop: '15px',
  };

  return(
    <div>
      <div style={componentStyles}>
        <HelloWorld title="web component" dispatchEvent={dispatchEvent}></HelloWorld>
      </div>

      <div style={componentStyles}>
        <DatePickerWrapper position='manual'
                           range='true'
                           dispatchEvent={dispatchEvent}
                           end={new Date(2020, 4, 7).toString()}
                           start={new Date().toString()}></DatePickerWrapper>
      </div>
    </div>
  );

};

render(<WebComps/>, document.getElementById("preact-root"));
