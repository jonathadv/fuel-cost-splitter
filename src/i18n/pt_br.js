module.exports = {
  labels: {
    origin: 'Origem',
    destination: 'Destino',
    stopPoint: 'Ponto de Parada',
    totalDistance: 'Distância Total',
    vehicleConsumption: 'Consumo do Veículo',
    fuelPrice: 'Preço do Combustível',
    peopleToSplit: 'Quantidade de Participantes',
    calculate: 'Calcular',
    calculateDistance: 'Calcular Distância',
    totalCost: 'Valor total',
    costPerPerson: 'Por Pessoa',
    currency: 'R$',
    kmByLiter: 'Km/L',
    km: 'Km',
  },
  math: {
    decimalSeparator: ',',
    thousandSeparator: '.',
  },
  messages: {
    sharing:
      'Olá,\nSegue a divisão do custo do combustivel do nosso passeio:\n-Endereços:\n{addresses}\n-Distância: {distance}\n-Preço do Combustível: {fuelPrice}\n-Consumo do Veículo: {vehicleConsumption}\n-Participantes: {participants}\n-Total: {total} \n-Por pessoa: {perPerson}\n\nFormula: ( {distance}/{vehicleConsumption} ) x {fuelPrice}\nTotal: {total} / {participants} = {perPerson}\n\nPowered by: {url}',
  },
};
