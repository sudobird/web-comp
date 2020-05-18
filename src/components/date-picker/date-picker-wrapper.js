import {h, Component} from "preact";
import DatePickerContainer from "./date-picker-container/date-picker-container";

export default class DatePickerWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true
    };

  }

  togglePicker() {
    this.setState({
      visible: !this.state.visible
    });
  }

  componentDidMount() {
    if(this.props.switch) {
      const switchElement = document.getElementById(this.props.switch);
      if (!switchElement) {
        return;
      }
      switchElement.addEventListener('click', ev => {
        this.togglePicker();
      });
    }
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
