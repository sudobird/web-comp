import {h, Component} from "preact";
import styles from './sub-comp.scss';
import {Styler} from "../../lib/styler";

export default class SubComp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Styler styles={styles}>
        <div className="sub-comp-main">
          <input className="field"/>
          <br/>
          <input/>
        </div>
      </Styler>
    )
  }
}
