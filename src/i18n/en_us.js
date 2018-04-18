module.exports = {
  labels: {
    origin: 'Origin',
    destination: 'Destination',
    stopPoint: 'Stop Point',
    totalDistance: 'Total Distance',
    vehicleConsumption: 'Vehicle Consumption',
    fuelPrice: 'Fuel Price',
    peopleToSplit: 'People to Share',
    calculate: 'Calculate',
    calculateDistance: 'Calculate Distance',
    totalCost: 'Total Cost',
    costPerPerson: 'Per Person',
    currency: '$',
    kmByLiter: 'Km/L',
    km: 'Km',
  },

  math: {
    decimalSeparator: ',',
    thousandSeparator: '.',
  },

  messages: {
    sharing:
      'Hey,\nFollowing our trip fuel cost sharing:\n-Addresses:\n{addresses}\n-Distance: {distance}\n-Fuel price: {fuelPrice}\n-Vehicle Consumption: {vehicleConsumption}\n-Participants: {participants}\n-Total: {total} \n-Per Person: {perPerson}\n\nFormula: ( {distance}/{vehicleConsumption} ) x {fuelPrice}\nTotal: {total} / {participants} = {perPerson}\n\nPowered by: {url}',
  },
};
