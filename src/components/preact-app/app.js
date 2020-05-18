import {h, Component, Fragment} from "preact";
import {useState} from "preact/hooks";
import styles from './app.scss';
import SubComp from "./sub-comp";
import iconCheck from '../../assets/icon-check.png';
import {Styler} from "../../lib/styler";

export default class PreactApp extends Component {
  constructor(props) {
    console.log('comp', props);
    super(props);
    this.buttonClicked = this.buttonClicked.bind(this);
    this.state = {
      name: props.name || 'adsf'
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    console.log('new props in comp', nextProps);
    this.setState({
      name: nextProps.name
    });
  }

  buttonClicked() {
    console.log('dispatching event');
    this.props.dispatchEvent('preact-event-1', "hello world");
  }

  render() {
    return (
      <Styler styles={styles}>
        <div className="main">
          hello preact {this.state.name}
          <img src={iconCheck}/>
          <br/>
          <input className="field"/>
          <br/>
          <input/>
          <br/><br/>
          <SubComp></SubComp>
          <button onClick={this.buttonClicked}>click here</button>
        </div>
        <br/>
      </Styler>
    )
  }
}
