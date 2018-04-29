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
        about: 'About',
        moreInfo: 'Info',
        license: 'License',
        sendViaWhatsApp: 'Send via WhatsApp',
        sendViaFbMessenger: 'Send via Messenger',
    },

    math: {
        decimalSeparator: ',',
        thousandSeparator: '.',
    },

    messages: {
        appSharingText:
            'Hey,\nFollowing our trip fuel cost sharing:\n\n*Addresses:*\n{addresses}\n`----------`\n\n-Distance: {distance}\n-Fuel price: {fuelPrice}\n-Vehicle Consumption: {vehicleConsumption}\n-Participants: {participants}\n-Total: {total} \n-Per Person: {perPerson}\n\n*Total Cost Formula:*\n`({distance}÷{vehicleConsumption})x{fuelPrice}`\n*Splitting Formula:*\n `{total}÷{participants}={perPerson}`\n\nPowered by: {url}',
        googleApiLoadError: 'Error loading information from Google Maps. Try to reload the page.',
        googleDirectionsError: 'Request to Google Maps Directions failed due to {error}',
        addressesLimit: 'Addresses limited to {limit}.',
        originDestinationWarning: 'Please add at least origin and destination addresses.',
    },
    urls: {
        about: 'https://github.com/jonathadv/fuel-cost-splitter',
        reportIssue: 'https://github.com/jonathadv/fuel-cost-splitter/issues',
        license: 'https://github.com/jonathadv/fuel-cost-splitter/blob/master/LICENSE.md',
    },
};
