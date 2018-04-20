module.exports = {
    langCode: 'pt-br',
    langName: 'Português',

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
        reportIssue: 'Reportar Problema',
        about: 'Sobre',
        moreInfo: 'Info',
        license: 'Licença',
        sendViaWhatsApp: 'Enviar via WhatsApp',
        sendViaFbMessenger: 'Enviar via Messenger',
    },
    math: {
        decimalSeparator: ',',
        thousandSeparator: '.',
    },
    messages: {
        appSharingText:
            'Olá,\nSegue a divisão do custo do combustivel do nosso passeio:\n\n*Endereços:*\n{addresses}\n`----------`\n\n-Distância: {distance}\n-Preço do Combustível: {fuelPrice}\n-Consumo do Veículo: {vehicleConsumption}\n-Participantes: {participants}\n-Total: {total} \n-Por pessoa: {perPerson}\n\n*Fórmula do Custo Total:*\n`({distance}÷{vehicleConsumption})x{fuelPrice}`\n*Fórmula da Divisão:*\n `{total}÷{participants}={perPerson}`\n\nPowered by: {url}',
    },

    urls: {
        about: 'https://github.com/jonathadv/fuel-cost-splitter',
        reportIssue: 'https://github.com/jonathadv/fuel-cost-splitter/issues',
        license: 'https://github.com/jonathadv/fuel-cost-splitter/blob/master/LICENSE.pt.md',
    },
};
