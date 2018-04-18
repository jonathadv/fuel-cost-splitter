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

  setAddress(index, value) {
    const addressList = this.state.addressList;
    addressList[index].value = value;
    this.setState(addressList);
  }

  inputOnblur(e) {
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
            defaultValue={address.value}
            className="AddressList"
            onBlur={this.inputOnblur.bind(this)}
          />
          <button
            className="AddressListButton"
            id={index}
            onClick={this.removeAddress.bind(this)}
          >
            -
          </button>
          <button
            className="AddressListButton"
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

  // Based on Google Places Autocomplition documentation
  // https://developers.google.com/maps/documentation/javascript/places-autocomplete
  // This code expects that Google Libraries are already loaded.
  registerInputTextToAutocomplete() {
    this.state.addressList.forEach((input, index) => {
      const autocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById(index),
        { types: [] }
      );

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        this.setAddress(index, place.formatted_address);
      });
    });
  }

  // FIXME (jonathadv): Make  this.registerInputTextToAutocomplete() to be
  // called only when google library is fully loaded.
  componentDidMount() {
    setTimeout(() => {
      this.registerInputTextToAutocomplete();
    }, 5000);
  }

  componentDidUpdate() {
    this.registerInputTextToAutocomplete();
  }

  render() {
    return <div className="box">{this.renderAddresses()}</div>;
  }
}

AddressList.propTypes = {
  addressList: PropTypes.array.isRequired,
};

export default AddressList;
