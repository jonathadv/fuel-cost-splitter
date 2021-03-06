import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { asDistance } from '../numbertools';

class SharingLinks extends Component {
    getAddresses = () => {
        const addresses = [];
        this.props.formState.addressList.forEach(addr => {
            addresses.push('• ' + addr.value);
        });
        return addresses.join('\n');
    };

    generateSharingText = appName => {
        const monospaceMark = appName === 'whatsapp' ? '```' : '`';
        const { i18n } = this.props;

        const text = i18n.messages.appSharingText
            .replace(/`/g, monospaceMark)
            .replace(/{addresses}/g, this.getAddresses())
            .replace(
                /{distance}/g,
                asDistance(this.props.formState.pathLength, i18n) + i18n.labels.km
            )
            .replace(/{fuelPrice}/g, i18n.labels.currency + this.props.formState.gasPrice)
            .replace(
                /{vehicleConsumption}/g,
                this.props.formState.gasConsumption + i18n.labels.kmByLiter
            )
            .replace(/{participants}/g, this.props.formState.participants)
            .replace(/{total}/g, i18n.labels.currency + this.props.formState.result)
            .replace(/{perPerson}/g, i18n.labels.currency + this.props.formState.pricePerPerson)
            .replace(/{url}/g, process.env.PUBLIC_URL);

        return encodeURIComponent(text);
    };

    render() {
        const { i18n } = this.props;

        return (
            <div className="container text-center p-3">
                <div className="p-1">
                    <a
                        href={'whatsapp://send?text=' + this.generateSharingText('whatsapp')}
                        data-action="share/whatsapp/share"
                        className="btn btn-outline-success"
                    >
                        {i18n.labels.sendViaWhatsApp}
                    </a>
                </div>

                <div className="p-1">
                    <a
                        href={'fb-messenger://share/?link=' + this.generateSharingText()}
                        className="btn btn-outline-primary"
                    >
                        {i18n.labels.sendViaFbMessenger}
                    </a>
                </div>
            </div>
        );
    }
}

SharingLinks.propTypes = {
    i18n: PropTypes.object.isRequired,
    formState: PropTypes.object.isRequired,
};

export default SharingLinks;
