import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GooglePlaceAutocomplete from '../integration/GooglePlaceAutocomplete';

class AddressBox extends Component {
  constructor(props) {
    super(props);

    this.props.addressList.push({ value: '', hash: Math.random() });
    this.props.addressList.push({ value: '', hash: Math.random() });

    this.state = {
      addressList: this.props.addressList,
      maxAddressAmount: 10,
    };
  }

  addAddress(e) {
    const addressList = this.state.addressList;
    const newItemIndex = Number(e.nativeEvent.target.id) + 1;

    if (addressList.length === this.state.maxAddressAmount) {
      alert('Addresses limited to ', this.state.maxAddressAmount);
      return;
    }

    addressList.splice(newItemIndex, 0, { value: '', hash: Math.random() });

    addressList.forEach((address, index) => {
      address.hash = Math.random();
    });

    this.setState({
      addressList,
    });
  }

  removeAddress(e) {
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
  }

  updateAddress(e) {
    const addressList = this.state.addressList;
    const currentItem = e.nativeEvent.target;
    addressList[currentItem.id].value = currentItem.value;
    this.setState(addressList);
  }

  renderAddresses() {
    const tags = [];
    const getAddressPlaceholder = index => {
      if (index === 0) {
        return 'origin';
      } else if (index === this.state.addressList.length - 1) {
        return 'destination';
      } else {
        return 'stop';
      }
    };

    this.state.addressList.forEach((address, index) => {
      tags.push(
        <div key={address.hash}>
          <input
            id={index}
            placeholder={getAddressPlaceholder(index)}
            value={address.value}
            onChange={this.updateAddress.bind(this)}
            className="AddressBox"
          />
          <button
            className="AddressBoxButton"
            id={index}
            onClick={this.removeAddress.bind(this)}
          >
            -
          </button>
          <button
            className="AddressBoxButton"
            id={index}
            onClick={this.addAddress.bind(this)}
          >
            +
          </button>
        </div>
      );
    });
    return tags;
  }

  render() {
    return (
      <div className="box">
        <GooglePlaceAutocomplete />
        {this.renderAddresses()}
      </div>
    );
  }
}

AddressBox.propTypes = {
  addressList: PropTypes.array.isRequired,
};

export default AddressBox;
