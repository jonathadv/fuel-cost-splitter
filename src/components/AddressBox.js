import React, { Component } from 'react';
import CurrencyInput from 'react-currency-input';
import CustomInput from './CustomInput.js';

class AddressBox extends Component {
  constructor(props) {
    super(props);

    this.state = this.getDefaultState();
  }

  getDefaultState() {
    return {
      addressList: [
        { value: '', hash: Math.random() },
        { value: '', hash: Math.random() },
      ],
    };
  }

  addAddress(e) {
    const addressList = this.state.addressList;
    const newItemIndex = Number(e.nativeEvent.target.id) + 1;

    if (addressList.length === 10) {
      alert('Addresses limited to 10');
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
    this.state.addressList.forEach((address, index) => {
      tags.push(
        <div key={address.hash}>
          <input
            id={index}
            placeholder={'address ' + (index + 1)}
            value={address.value}
            onChange={this.updateAddress.bind(this)}
            className="AddressBox"
          />
          <button
            className="AddressBoxButton"
            id={index}
            onClick={this.removeAddress.bind(this)}
          >
            X
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
    return <div className="box">{this.renderAddresses()}</div>;
  }
}

export default AddressBox;
