import {h, Component} from "preact";
import {useState} from "preact/hooks";
import styles from './hello-world.scss';
import {Styler} from "../../lib/styler";

export default class HelloWorld extends Component {
  constructor(props) {
    super(props);
    this.fireTestEvent = this.fireTestEvent.bind(this);
    this.state = {
      title: this.props.title || 'Hello!'
    }
  }

  fireTestEvent() {
    this.props.dispatchEvent('fire', {name: 'lorem ipsum'});
  }

  render() {
    return (
      <Styler styles={styles}>
        <div className='hello-world-wrapper'>
          <h2>{this.state.title}</h2>
          <h3>web components are fun</h3>
          <button onClick={this.fireTestEvent}>Fire event</button>
        </div>
      </Styler>
    )
  }
}
