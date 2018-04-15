import React, { Component } from 'react';
import CustomInput from './components/CustomInput.js';
import AddressBox from './components/AddressBox.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
      const { pathLength, gasConsumption, gasPrice, participants } = this.state;

      const result = parseFloat(pathLength / gasConsumption * gasPrice).toFixed(
        2
      );

      const pricePerPerson = parseFloat(result / participants).toFixed(2);

      this.setState({
        result,
        pricePerPerson,
      });

      window.scrollTo(0, document.body.scrollHeight);
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Fuel Cost Splitter</h1>
        </header>
        <div className="AppBody">
          <AddressBox />

          <CustomInput
            name="Distância Total"
            unit="Km"
            type="step"
            step="0.01"
            cb={this.updateCarPath}
          />
          <CustomInput
            name="Consumo do veículo"
            unit="Km/L"
            type="step"
            cb={this.updateGasConsumption}
          />
          <CustomInput
            name="Preço da gasolina"
            unit="R$"
            type="currency"
            value={this.state.gasPrice}
            cb={this.updateGasPrice}
          />
          <CustomInput
            name="Quantidade de Participantes"
            type="step"
            cb={this.updateParticipants}
          />
          <p>
            <input
              className="button"
              type="button"
              value="Calcular"
              onClick={this.updateResult}
            />
          </p>

          <div className="CostBox">
            <div className="CostTitle">Valor total</div>
            <div className="Cost">R$ {this.state.result}</div>
            <div className="Calc">
              ( {this.state.pathLength} / {this.state.gasConsumption} ) x{' '}
              {this.state.gasPrice}{' '}
            </div>
          </div>

          <div className="CostBox">
            <div className="CostTitle">Por pessoa</div>
            <div className="Cost">R$ {this.state.pricePerPerson}</div>
            <div className="Calc">
              {this.state.result} / {this.state.participants}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
