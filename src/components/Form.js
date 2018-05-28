import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CustomInput from './CustomInput';

class Form extends Component {
    render() {
        const { i18n, className } = this.props;

        return (
            <div className={className + ' form-group'}>
                <CustomInput
                    name={i18n.labels.totalDistance}
                    unit={i18n.labels.km}
                    type="step"
                    step="0.001"
                    max='1000'
                    i18n={i18n}
                    value={this.props.formState.pathLength}
                    cb={this.props.updateCarPathFn}
                    lang=""
                />
                <CustomInput
                    name={i18n.labels.vehicleConsumption}
                    unit={i18n.labels.kmByLiter}
                    i18n={i18n}
                    type="step"
                    cb={this.props.updateGasConsumptionFn}
                />
                <CustomInput
                    name={i18n.labels.fuelPrice}
                    unit={i18n.labels.currency}
                    type="currency"
                    value={this.props.formState.gasPrice}
                    i18n={i18n}
                    cb={this.props.updateGasPriceFn}
                />
                <CustomInput
                    name={i18n.labels.peopleToSplit}
                    type="step"
                    i18n={i18n}
                    cb={this.props.updateParticipantsFn}
                />
                <p className="text-center">
                    <input
                        className="btn btn-outline-info"
                        type="button"
                        value={i18n.labels.calculate}
                        onClick={this.props.updateResultFn}
                    />
                </p>
            </div>
        );
    }
}

Form.propTypes = {
    className: PropTypes.string.isRequired,
    i18n: PropTypes.object.isRequired,
    formState: PropTypes.object.isRequired,
    updateCarPathFn: PropTypes.func.isRequired,
    updateGasConsumptionFn: PropTypes.func.isRequired,
    updateGasPriceFn: PropTypes.func.isRequired,
    updateParticipantsFn: PropTypes.func.isRequired,
    updateResultFn: PropTypes.func.isRequired,
};

export default Form;
