import React, { Component } from 'react';
import PropTypes from 'prop-types';

class AddressList extends Component {
    constructor(props) {
        super(props);

        this.props.addressList.push({ value: '', hash: Math.random() });
        this.props.addressList.push({ value: '', hash: Math.random() });

        this.state = {
            addressList: this.props.addressList,
            maxAddressAmount: 10,
        };
    }

    addAddress = e => {
        const addressList = this.state.addressList;
        const newItemIndex = Number(e.nativeEvent.target.id) + 1;

        if (addressList.length === this.state.maxAddressAmount) {
            alert(
                this.props.i18n.messages.addressesLimit.replace(
                    '{limit}',
                    this.state.maxAddressAmount
                )
            );
            return;
        }

        addressList.splice(newItemIndex, 0, { value: '', hash: Math.random() });

        addressList.forEach((address, index) => {
            address.hash = Math.random();
        });

        this.setState({
            addressList,
        });
    };

    removeAddress = e => {
        const addressList = this.state.addressList;
        const currentIndex = Number(e.nativeEvent.target.id);

        if (addressList.length === 2) {
            addressList[currentIndex] = { value: '', hash: Math.random() };
        } else {
            addressList.splice(currentIndex, 1);
        }

        addressList.forEach((address, index) => {
            address.hash = Math.random();
        });

        this.setState({
            addressList,
        });
    };

    setAddress = (index, value) => {
        const addressList = this.state.addressList;
        addressList[index].value = value;
        this.setState(addressList);
    };

    inputOnblur = e => {
        const currentItem = e.nativeEvent.target;
        this.setAddress(currentItem.id, currentItem.value);
    };

    renderAddresses = () => {
        const { i18n } = this.props;
        const tags = [];

        const getAddressPlaceholder = index => {
            if (index === 0) {
                return i18n.labels.origin;
            } else if (index === this.state.addressList.length - 1) {
                return i18n.labels.destination;
            } else {
                return i18n.labels.stopPoint;
            }
        };

        this.state.addressList.forEach((address, index) => {
            tags.push(
                <div key={address.hash}>
                    <div className="input-group mb-3 p-1" data-toggle="buttons">
                        <div className="input-group-prepend">
                            <button
                                className="btn btn-outline-danger"
                                id={index}
                                onClick={this.removeAddress}
                            >
                                -
                            </button>
                        </div>
                        <input
                            id={index}
                            placeholder={getAddressPlaceholder(index)}
                            defaultValue={address.value}
                            className={'form-control text-center address-input-' + index}
                            onBlur={this.inputOnblur}
                        />

                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                id={index}
                                onClick={this.addAddress}
                            >
                                +
                            </button>
                        </div>
                    </div>
                </div>
            );
        });
        return tags;
    };

    // Based on Google Places Autocomplition documentation
    // https://developers.google.com/maps/documentation/javascript/places-autocomplete
    // This code expects that Google Libraries are already loaded.
    registerInputTextToAutocomplete = () => {
        const { i18n } = this.props;

        this.state.addressList.forEach((input, index) => {
            const autocomplete = new window.google.maps.places.Autocomplete(
                document.getElementsByClassName('address-input-' + index)[0],
                { types: [] }
            );

            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                const address = place.formatted_address ? place.formatted_address : place.name;
                if (!address) {
                    alert(i18n.messages.googleApiLoadError);
                }
                this.setAddress(index, address);
            });
        });
    };

    loadGoogleAutocompleteLibrary = attempt => {
        if (attempt >= 60) {
            alert(this.props.i18n.messages.googleApiLoadError);
            return;
        }
        if (!window.google) {
            return setTimeout(() => this.loadGoogleAutocompleteLibrary(attempt + 1), 500);
        } else {
            return this.registerInputTextToAutocomplete();
        }
    };

    componentWillMount = () => {
        return this.loadGoogleAutocompleteLibrary(1);
    };

    componentDidUpdate = () => {
        this.registerInputTextToAutocomplete();
    };

    render = () => {
        return <div className="form-group p-1">{this.renderAddresses()}</div>;
    };
}

AddressList.propTypes = {
    i18n: PropTypes.object.isRequired,
};

export default AddressList;
