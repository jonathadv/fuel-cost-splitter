import React, { Component } from 'react';
import CurrencyInput from 'react-currency-input';

class CalcInput extends Component {
  updateValue = e => {
    this.props.cb(e.nativeEvent.target.value);
  };

  generateInput = type => {
    if (type === 'step') {
      const min = this.props.min ? this.props.min : '0';
      const max = this.props.max ? this.props.max : '100';
      const step = this.props.step ? this.props.step : '1';

      return (
        <input
          placeholder="0"
          type="number"
          min={min}
          max={max}
          step={step}
          onChange={this.updateValue}
        />
      );
    }

    if (type === 'currency') {
      return (
        <CurrencyInput
          value={this.props.value}
            inputType='tel'
          onChangeEvent={this.updateValue}
        />
      );
    }

    return <input placeholder="0" type={type} onChange={this.updateValue} />;
  };

  render() {
    const name = this.props.name ? this.props.name : 'Unamed';
    const unit = this.props.unit ? ' (' + this.props.unit + ')' : '';
    const type = this.props.type ? this.props.type : 'text';

    return (
      <div className="CalcInput">
        {name + unit + ':'}
        {this.generateInput(type)}
      </div>
    );
  }
}

export default CalcInput;
