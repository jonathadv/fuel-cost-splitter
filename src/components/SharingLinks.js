import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SharingLinks extends Component {
    getAddresses() {
        const addresses = [];
        this.props.formState.addressList.forEach(addr => {
            addresses.push('• ' + addr.value);
        });
        return addresses.join('\n');
    }

    generateWhatsAppText() {
        const text = this.props.i18n.messages.whatsAppSharing
            .replace(/{addresses}/g, this.getAddresses())
            .replace(/{distance}/g, this.props.formState.pathLength + this.props.i18n.labels.km)
            .replace(
                /{fuelPrice}/g,
                this.props.i18n.labels.currency + this.props.formState.gasPrice
            )
            .replace(
                /{vehicleConsumption}/g,
                this.props.formState.gasConsumption + this.props.i18n.labels.kmByLiter
            )
            .replace(/{participants}/g, this.props.formState.participants)
            .replace(/{total}/g, this.props.i18n.labels.currency + this.props.formState.result)
            .replace(
                /{perPerson}/g,
                this.props.i18n.labels.currency + this.props.formState.pricePerPerson
            )
            .replace(/{url}/g, process.env.PUBLIC_URL);

        return encodeURIComponent(text);
    }

    render() {
        return (
            <div className="container">
                <p className="text-center">
                    <a
                        href={'whatsapp://send?text=' + this.generateWhatsAppText()}
                        data-action="share/whatsapp/share"
                    >
                        <button type="button" className="btn btn-outline-success">
                            {this.props.i18n.messages.sendViaWhatsApp}
                        </button>
                    </a>
                </p>
            </div>
        );
    }
}

SharingLinks.propTypes = {
    i18n: PropTypes.object.isRequired,
    formState: PropTypes.object.isRequired,
};

export default SharingLinks;
