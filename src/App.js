import React, { Component } from 'react';
import CalcInput from './CalcInput.js';
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
    };
  }

  render() {
    console.log(
      `( ${this.state.pathLength} / ${this.state.gasConsumption} ) x ${
        this.state.gasPrice
      } = ${this.state.result}`
    );

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Fuel Cost Splitter</h1>
        </header>
        <p className="App-intro">Preencha os campos</p>
        <CalcInput
          name="Trajeto Ida e Volta"
          unit="Km"
          type="step"
          step="0.01"
          cb={this.updateCarPath}
        />
        <CalcInput
          name="Consumo do veículo"
          unit="Km/L"
          type="step"
          cb={this.updateGasConsumption}
        />
        <CalcInput
          name="Preço médio da gasolina"
          unit="R$"
          type="currency"
          value={this.state.gasPrice}
          cb={this.updateGasPrice}
        />
        <CalcInput
          name="Participantes"
          type="step"
          cb={this.updateParticipants}
        />
        <p>
          <input type="button" value="Calcular" onClick={this.updateResult} />
        </p>
        <p className="Cost">
          Valor total:
          <span className="Cost"> R$ {this.state.result} </span>
        </p>
        ( {this.state.pathLength} / {this.state.gasConsumption} ) x{' '}
        {this.state.gasPrice}
        <p className="Cost">
          Por pessoa:
          <span className="Cost"> R$ {this.state.pricePerPerson} </span>
        </p>
        {this.state.result} / {this.state.participants}
      </div>
    );
  }
}

export default App;
