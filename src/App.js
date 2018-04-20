import React, { Component } from 'react';
import browserLocale from 'browser-locale';
import CustomInput from './components/CustomInput';
import MapSearch from './components/MapSearch';
import SharingLinks from './components/SharingLinks';
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

        this.updateCarPath = value => {
            this.setState({ pathLength: value });
        };

        this.updateGasConsumption = value => {
            this.setState({ gasConsumption: value });
        };

        this.updateGasPrice = value => {
            this.setState({ gasPrice: value });
        };

        this.updateParticipants = value => {
            this.setState({ participants: value });
        };

        this.updateResult = () => {
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
    }

    changeLang(e) {
        const newLangCode = e.nativeEvent.target.id;
        this.setState({
            i18n: i18n(newLangCode),
        });
    }

    renderMenu() {
        return (
            <ul className="nav nav-tabs">
                <li className="nav-item dropdown">
                    <button
                        className="nav-link dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        {this.state.i18n.langName}
                    </button>
                    <div className="dropdown-menu">
                        <button
                            className="dropdown-item"
                            id="pt"
                            onClick={this.changeLang.bind(this)}
                        >
                            Português
                        </button>
                        <button
                            className="dropdown-item"
                            id="en"
                            onClick={this.changeLang.bind(this)}
                        >
                            English
                        </button>
                    </div>
                </li>

                <li className="nav-item dropdown">
                    <button
                        className="nav-link dropdown-toggle"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        {this.state.i18n.labels.moreInfo}
                    </button>

                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a
                            className="dropdown-item"
                            href={this.state.i18n.urls.license}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {this.state.i18n.labels.license}
                        </a>
                        <a
                            className="dropdown-item"
                            href={this.state.i18n.urls.reportIssue}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {this.state.i18n.labels.reportIssue}
                        </a>
                        <a
                            className="dropdown-item"
                            href={this.state.i18n.urls.about}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {this.state.i18n.labels.about}
                        </a>
                    </div>
                </li>
            </ul>
        );
    }

    createFormState() {
        return {
            pathLength: this.state.pathLength,
            gasConsumption: this.state.gasConsumption,
            gasPrice: this.state.gasPrice,
            participants: this.state.participants,
            result: this.state.result,
            pricePerPerson: this.state.pricePerPerson,
            addressList: this.state.addressList,
        };
    }

    render() {
        return (
            <div className="container">
                {this.renderMenu()}
                <MapSearch
                    i18n={this.state.i18n}
                    setDistanceCb={this.updateCarPath.bind(this)}
                    addressList={this.state.addressList}
                />

                <div className="form-group">
                    <CustomInput
                        name={this.state.i18n.labels.totalDistance}
                        unit={this.state.i18n.labels.km}
                        type="step"
                        step="0.01"
                        i18n={this.state.i18n}
                        value={this.state.pathLength}
                        cb={this.updateCarPath}
                    />
                    <CustomInput
                        name={this.state.i18n.labels.vehicleConsumption}
                        unit={this.state.i18n.labels.kmByLiter}
                        i18n={this.state.i18n}
                        type="step"
                        cb={this.updateGasConsumption}
                    />
                    <CustomInput
                        name={this.state.i18n.labels.fuelPrice}
                        unit={this.state.i18n.labels.currency}
                        type="currency"
                        value={this.state.gasPrice}
                        i18n={this.state.i18n}
                        cb={this.updateGasPrice}
                    />
                    <CustomInput
                        name={this.state.i18n.labels.peopleToSplit}
                        type="step"
                        i18n={this.state.i18n}
                        cb={this.updateParticipants}
                    />
                    <p className="text-center">
                        <input
                            className="btn btn-outline-primary"
                            type="button"
                            value={this.state.i18n.labels.calculate}
                            onClick={this.updateResult}
                        />
                    </p>

                    <div className="text-center">
                        <div className="CostTitle">{this.state.i18n.labels.totalCost}</div>
                        <div className="Cost">
                            {this.state.i18n.labels.currency} {this.state.result}
                        </div>
                        <div className="Calc">
                            ( {this.state.pathLength} / {this.state.gasConsumption} ) x{' '}
                            {this.state.gasPrice}{' '}
                        </div>
                    </div>

                    <div className="text-center">
                        <div className="CostTitle">{this.state.i18n.labels.costPerPerson}</div>
                        <div className="Cost">
                            {this.state.i18n.labels.currency} {this.state.pricePerPerson}
                        </div>
                        <div className="Calc">
                            {this.state.result} / {this.state.participants}
                        </div>
                    </div>
                    <SharingLinks formState={this.createFormState()} i18n={this.state.i18n} />
                </div>
            </div>
        );
    }
}

export default App;
