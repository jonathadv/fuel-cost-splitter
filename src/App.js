import React, { Component } from 'react';
import browserLocale from 'browser-locale';
import CustomInput from './components/CustomInput.js';
import MapSearch from './components/MapSearch.js';
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

      const result = parseFloat(
        pathLength / gasConsumption * asNumber(gasPrice)
      ).toFixed(2);

      const pricePerPerson = parseFloat(result / participants).toFixed(2);

      this.setState({
        result: asCurrency(result),
        pricePerPerson: asCurrency(pricePerPerson),
      });

      window.scrollTo(0, document.body.scrollHeight);
    };
  }

  render() {
    return (
      <div className="App">
        <MapSearch
          i18n={this.state.i18n}
          setDistanceCb={this.updateCarPath.bind(this)}
        />
        <div className="AppBody">
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
          <p>
            <input
              className="button"
              type="button"
              value={this.state.i18n.labels.calculate}
              onClick={this.updateResult}
            />
          </p>

          <div className="CostBox">
            <div className="CostTitle">{this.state.i18n.labels.totalCost}</div>
            <div className="Cost">
              {this.state.i18n.labels.currency} {this.state.result}
            </div>
            <div className="Calc">
              ( {this.state.pathLength} / {this.state.gasConsumption} ) x{' '}
              {this.state.gasPrice}{' '}
            </div>
          </div>

          <div className="CostBox">
            <div className="CostTitle">
              {this.state.i18n.labels.costPerPerson}
            </div>
            <div className="Cost">
              {this.state.i18n.labels.currency} {this.state.pricePerPerson}
            </div>
            <div className="Calc">
              {this.state.result} / {this.state.participants}
            </div>
          </div>
        </div>

        <footer className="footer">
          <p>Fuel Cost Splitter - BETA</p>
          <p>A simple webapp to split the fuel cost with friends</p>

          <p>
            <a
              href="https://github.com/jonathadv/fuel-cost-splitter"
              target="_blank"
              rel="noopener noreferrer"
            >
              About
            </a>
          </p>
        </footer>
      </div>
    );
  }
}

export default App;
