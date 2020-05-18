import {h, Fragment} from "preact";

export const Styler = (props) => {
  return (
    <Fragment>
      <style>{props.styles}</style>
      {props.children}
    </Fragment>
  );
};
