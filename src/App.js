import React, { Component } from 'react';
import browserLocale from 'browser-locale';
import MapSearch from './components/MapSearch';
import SharingLinks from './components/SharingLinks';
import Form from './components/Form';
import Menu from './components/Menu';
import CalcResult from './components/CalcResult';
import i18n from './i18n';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            i18n: i18n(browserLocale()),
            pathLength: 0,
            gasConsumption: 0,
            gasPrice: 0,
            participants: 0,
            result: 0,
            pricePerPerson: 0,
            addressList: [],
        };
    }
    updateCarPath = value => {
        this.setState({ pathLength: value });
    };

    updateGasConsumption = value => {
        this.setState({ gasConsumption: value });
    };

    updateGasPrice = value => {
        this.setState({ gasPrice: value });
    };

    updateParticipants = value => {
        this.setState({ participants: value });
    };

    updateResult = () => {
        const asNumber = value => {
            const strNumber = value.toString();
            if (strNumber.indexOf(',') > -1) {
                return Number(strNumber.replace(',', '.'));
            }
            return Number(value);
        };

        const asCurrency = value => {
            const strNumber = value.toString();
            return strNumber.replace('.', this.state.i18n.math.decimalSeparator);
        };

        const { pathLength, gasConsumption, gasPrice, participants } = this.state;

        const result = parseFloat(pathLength / gasConsumption * asNumber(gasPrice)).toFixed(2);

        const pricePerPerson = parseFloat(result / participants).toFixed(2);

        this.setState({
            result: asCurrency(result),
            pricePerPerson: asCurrency(pricePerPerson),
        });

        window.scrollTo(0, document.body.scrollHeight);
    };

    changeLang = e => {
        const newLangCode = e.nativeEvent.target.id;
        this.setState({
            i18n: i18n(newLangCode),
        });
    };

    createFormState = () => {
        return {
            pathLength: this.state.pathLength,
            gasConsumption: this.state.gasConsumption,
            gasPrice: this.state.gasPrice,
            participants: this.state.participants,
            result: this.state.result,
            pricePerPerson: this.state.pricePerPerson,
            addressList: this.state.addressList,
        };
    };

    render() {
        const { i18n } = this.state;

        return (
            <div>
                <Menu i18n={i18n} changeLangFn={this.changeLang} />

                <div className="d-flex flex-sm-row flex-column">
                    <MapSearch
                        className="col-sm-6 p-2"
                        i18n={i18n}
                        setDistanceCb={this.updateCarPath.bind(this)}
                        addressList={this.state.addressList}
                    />

                    <Form
                        className="col-sm-3 p-2"
                        i18n={i18n}
                        formState={this.createFormState()}
                        updateCarPathFn={this.updateCarPath}
                        updateGasConsumptionFn={this.updateGasConsumption}
                        updateGasPriceFn={this.updateGasPrice}
                        updateParticipantsFn={this.updateParticipants}
                        updateResultFn={this.updateResult}
                    />

                    <div className="col-sm-3 p-2">
                        <CalcResult formState={this.createFormState()} i18n={i18n} />
                        <SharingLinks formState={this.createFormState()} i18n={i18n} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
