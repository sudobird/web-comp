import {h, Component, Fragment} from "preact";
import styles from './json-viewer.scss';
import {Styler} from "../../lib/styler";
import JsonTree from "./json-tree/json-tree";
import {TYPES, getType} from "./contants";

export default class JsonViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: (props.config && props.config.data) ? props.config.data : {}
    }
  }

  // componentDidMount() {
  //   let data = {
  //     name: 'aayush jain',
  //     age: 89,
  //     bool: false,
  //     int: 0,
  //     emp: {},
  //     sym: Symbol(),
  //     ins: [
  //       4,
  //       5,
  //       {
  //         abc: [],
  //         def: 45,
  //         date: new Date(),
  //         nullValue: null,
  //         und: undefined
  //       }
  //     ],
  //     company: {
  //       name: 'springboard'
  //     }
  //   };
  //
  //   // data = {}
  //
  //   this.setState({
  //     data
  //   });
  // }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.config && nextProps.config.data) {
      this.setState({
        data: nextProps.config.data
      });
    }

  }

  render() {
    const type = getType(this.state.data);
    return (
      <Styler styles={styles}>
        <div className='json-viewer-wrapper'>
          {type === TYPES.BLANK_OBJECT && '{ }'}
          {type === TYPES.BLANK_ARRAY && '[ ]'}
          {type === TYPES.ARRAY &&
            <>
              {'['}
                <JsonTree data={this.state.data}></JsonTree>
              {']'}
            </>
          }
          {type === TYPES.OBJECT &&
          <>
            {'{'}
            <JsonTree data={this.state.data}></JsonTree>
            {'}'}
          </>
          }
        </div>
      </Styler>
    )
  }
}
