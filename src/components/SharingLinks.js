import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SharingLinks extends Component {
  constructor(props) {
    super(props);

    this.state = this.props.formState;
  }

  getAddresses() {
    const addresses = [];
    this.props.formState.addressList.forEach(addr => {
      addresses.push('-> ' + addr.value);
    });
    return addresses.join('\n');
  }

  generateSharingText() {
    const sharing = this.state.i18n.messages.sharing
      .replace(/{addresses}/g, this.getAddresses())
      .replace(/{distance}/g, this.state.pathLength + this.state.i18n.labels.km)
      .replace(
        /{fuelPrice}/g,
        this.state.i18n.labels.currency + this.state.gasPrice
      )
      .replace(
        /{vehicleConsumption}/g,
        this.state.gasConsumption + this.state.i18n.labels.kmByLiter
      )
      .replace(/{participants}/g, this.state.participants)
      .replace(/{total}/g, this.state.i18n.labels.currency + this.state.result)
      .replace(
        /{perPerson}/g,
        this.state.i18n.labels.currency + this.state.pricePerPerson
      )
      .replace(/{url}/g, process.env.PUBLIC_URL);

    return encodeURIComponent(sharing);
  }

  render() {
    return (
      <div className="container">
        <p className="text-center">
          <a
            href={'whatsapp://send?text=' + this.generateSharingText()}
            data-action="share/whatsapp/share"
          >
            <button type="button" className="btn btn-outline-success">
              {this.state.i18n.messages.whatsapp}
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
