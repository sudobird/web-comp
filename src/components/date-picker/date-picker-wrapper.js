import {h, Component} from "preact";
import DatePickerContainer from "./date-picker-container/date-picker-container";

export default class DatePickerWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true
    };

    this.switchListenerPresent = false;
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setSwitchListener(nextProps);
  }

  componentDidMount() {
    this.setSwitchListener(this.props);
  }

  setSwitchListener(props) {
    if (props.switch && !this.switchListenerPresent) {
      const switchElement = document.getElementById(props.switch);
      if (!switchElement) {
        return;
      }
      switchElement.addEventListener('click', ev => {
        this.togglePicker();
      });
      this.togglePicker(); // this is done hide date picker by default if switch present
      this.switchListenerPresent = true;
    }
  }

  togglePicker() {
    this.setState({
      visible: !this.state.visible
    });
  }

  getStyles() {
    let styles = {
      zIndex: 111
    };
    const positioned = {
      position: 'absolute',
      top: 'calc(100% + 5px)',
      right: '0'
    };

    if (this.props.position !== 'manual') {
      styles = {
        ...styles,
        ...positioned
      }
    }
    styles.display = this.state.visible ? 'block' : 'none';
    return styles;
  }

  render(props, state, context) {
    return (
      <div style={this.getStyles()}>
        <DatePickerContainer {...this.props} ></DatePickerContainer>
      </div>

    )
  }
}
