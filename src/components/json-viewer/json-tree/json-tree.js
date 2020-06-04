import {h, Component, Fragment} from "preact";
import {TYPES, getType} from "../contants";

export default class JsonTree extends Component {
  constructor(props) {
    super(props);
    this.toggleExpansion = this.toggleExpansion.bind(this);
    this.state = {
      expandAll: false
    }
  }

  recurValue(item) {
    const type = getType(item);
    let result = '';
    switch (type) {
      case TYPES.BLANK_ARRAY:
        result = '[ ]';
        break;
      case TYPES.BLANK_OBJECT:
        result = '{ }';
        break;
      case TYPES.ARRAY:
        result = (
          <>
            <span>{'['}</span>
            <JsonTree data={item}></JsonTree>
            <span>{']'}</span>
          </>
        );
        break;
      case TYPES.OBJECT:
        result = (
          <>
            <span>{'{'}</span>
            <JsonTree data={item}></JsonTree>
            <span>{'}'}</span>
          </>
        );
        break;
      case TYPES.STRING:
        result = <span className='string-value'>{`"${item}"`}</span>;
        break;

      case TYPES.NUMBER:
        result = <span className='number-value'>{`${item}`}</span>;
        break;

      case TYPES.BOOLEAN:
        result = <span className='boolean-value'>{`${item}`}</span>;
        break;

      default:
        result = <span className='default-value'>{`${String(item)}`}</span>;
    }
    return result;
  }

  collapsedValue(item) {
    const type = getType(item);
    let result = '';
    switch (type) {
      case TYPES.ARRAY:
        result = (
          <span>{`Array (${item.length})`}</span>
        );
        break;
      case TYPES.OBJECT:
        const length = Object.keys(item).length;
        result = (
          <span>{`{ ${length} ${length === 1 ? 'item' : 'items'} }`}</span>
        )
    }
    return result;
  }

  getKeyClasses(key, value) {
    const type = getType(value);
    let classes = '';
    if (type === TYPES.ARRAY || type === TYPES.OBJECT) {
      classes = `key expandable ${this.state.expandAll ? 'open' : 'close'}`;
    } else {
      classes = 'key';
    }
    return classes;
  }

  getExpansionClasses(key, value) {
    const type = getType(value);
    let classes = '';
    if (type === TYPES.ARRAY || type === TYPES.OBJECT) {
      classes = this.state.expandAll ? 'expand' : 'collapse';
    } else {
      classes = '';
    }
    return classes;
  }

  toggleExpansion(event) {
    const element = event.target;
    const parent = element.parentElement;

    if (!element.classList.contains('expandable')) {
      return;
    }

    if (element.classList.contains('close')) {
      element.classList.remove('close');
      element.classList.add('open');
    } else {
      element.classList.remove('open');
      element.classList.add('close');
    }

    if (parent.classList.contains('collapse')) {
      parent.classList.remove('collapse');
      parent.classList.add('expand');
    } else {
      parent.classList.remove('expand');
      parent.classList.add('collapse');
    }

  }

  renderKeyValue(key, value) {
    return (
      <>
        <span className={this.getKeyClasses(key, value)} onClick={this.toggleExpansion}>{key}</span>
        <strong>: </strong>
        <span className='expanded-value'>{this.recurValue(value)}</span>
        <span className='collapsed-value'>{this.collapsedValue(value)}</span>
      </>
    )
  }

  render () {
    const data = this.props.data;
    return (
      <div className='json-tree-wrapper'>
        {Object.keys(data).map(key => (
          <div className={this.getExpansionClasses(key, data[key])}>
            {this.renderKeyValue(key, data[key])}
          </div>
        ))}
      </div>
    )
  }
}
