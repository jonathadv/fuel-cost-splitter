import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CurrencyInput from 'react-currency-input';

class CustomInput extends Component {
    updateValue = e => {
        this.props.cb(e.nativeEvent.target.value);
    };

    generateInput = type => {
        const className = 'form-control text-center';
        const { value, lang, i18n } = this.props;

        if (type === 'step') {
            const min = this.props.min ? this.props.min : '0';
            const max = this.props.max ? this.props.max : '100';
            const step = this.props.step ? this.props.step : '1';

            return (
                <input
                    className={className}
                    placeholder="0"
                    type="number"
                    min={min}
                    max={max}
                    step={step}
                    value={value}
                    lang={lang}
                    onChange={this.updateValue}
                />
            );
        }

        if (type === 'currency') {
            return (
                <CurrencyInput
                    className={className}
                    decimalSeparator={i18n.math.decimalSeparator}
                    thousandSeparator={i18n.math.thousandSeparator}
                    value={value}
                    inputType="tel"
                    lang={lang}
                    onChangeEvent={this.updateValue}
                />
            );
        }

        return (
            <input className={className} placeholder="" type={type} onChange={this.updateValue} />
        );
    };

    render() {
        const name = this.props.name ? this.props.name : '';
        const unit = this.props.unit ? ' (' + this.props.unit + ')' : '';
        const type = this.props.type ? this.props.type : 'text';

        return (
            <div className="form-group">
                <label>{name + unit}</label>
                {this.generateInput(type)}
            </div>
        );
    }
}

CustomInput.propTypes = {
    i18n: PropTypes.object.isRequired,
    min: PropTypes.string,
    max: PropTypes.string,
    step: PropTypes.string,
    lang: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default CustomInput;
