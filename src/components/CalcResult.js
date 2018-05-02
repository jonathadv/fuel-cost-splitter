import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CalcResult extends Component {
    render() {
        const { i18n, formState, className } = this.props;

        return (
            <div className={className}>
                <div className="text-center">
                    <h1 className="h1">{i18n.labels.totalCost}</h1>
                    <div className="text-danger app-result">
                        {i18n.labels.currency} {formState.result}
                    </div>
                    <div className="text-muted app-monospaced">
                        ( {formState.pathLength} / {formState.gasConsumption} ) x{' '}
                        {formState.gasPrice}{' '}
                    </div>
                </div>

                <div className="text-center">
                    <h1 className="h1">{i18n.labels.costPerPerson}</h1>
                    <div className="text-danger app-result">
                        {i18n.labels.currency} {formState.pricePerPerson}
                    </div>
                    <div className="text-muted app-monospaced">
                        {formState.result} / {formState.participants}
                    </div>
                </div>
            </div>
        );
    }
}

CalcResult.propTypes = {
    i18n: PropTypes.object.isRequired,
    formState: PropTypes.object.isRequired,
    className: PropTypes.string,
};

export default CalcResult;
