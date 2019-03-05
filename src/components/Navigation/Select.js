import React, { PureComponent, Fragment } from 'react';
import ReactDOM from 'react-dom';

class Select extends PureComponent {
  state = {
    options: [
      {
        name: 'Stats',
        value: null,
      },
      {
        name: 'Enter Stats',
        value: 'statsInputForm',
      },
      {
        name: 'Stats History',
        value: 'stats',
      },
    ],
    value: '?',
  };

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };

  render() {
    const { options, value } = this.state;
    const { onRouteChange } = this.props;

    return (
      <Fragment>
       
        <select onSelect={() => onRouteChange({value})}>
          {options.map(item => (
            <option key={item.value} value={item.value}>
              {item.name}
            </option>
          ))}
        </select>
       
      </Fragment>
    );
  }
}

export default Select;
// <select onChange={this.handleChange} value={value}>