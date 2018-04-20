module.exports = {
  langCode: 'en-us',
  langName: 'English',
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
    reportIssue: 'Report an Issue',
  },

  math: {
    decimalSeparator: ',',
    thousandSeparator: '.',
  },

  messages: {
    sendViaWhatsApp: 'Send via WhatsApp',
    whatsAppSharing:
      'Hey,\nFollowing our trip fuel cost sharing:\n\n*Addresses:*\n{addresses}\n----------\n\n-Distance: {distance}\n-Fuel price: {fuelPrice}\n-Vehicle Consumption: {vehicleConsumption}\n-Participants: {participants}\n-Total: {total} \n-Per Person: {perPerson}\n\n*Total Cost Formula:*\n```({distance}÷{vehicleConsumption})x{fuelPrice}```\n*Splitting Formula:*\n ```{total}÷{participants}={perPerson}```\n\nPowered by: {url}',
  },
};
