import React, { Component } from 'react';
import AddressBox from './AddressBox';
import GoogleMaps from '../integration/GoogleMaps';

class MapSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addressList: [],
      submitElementId: 'submit',
    };
  }

  setDistance(distance) {
    this.props.setDistanceCb(distance);
  }

  render() {
    return (
      <div className="MapSearchBox">
        <GoogleMaps
          addressList={this.state.addressList}
          setDistanceCb={this.setDistance.bind(this)}
          submitElementId={this.state.submitElementId}
        />
        <AddressBox addressList={this.state.addressList} />
        <input
          className="CalcDistanceButton"
          type="submit"
          id={this.state.submitElementId}
          value="Calcular Distância"
        />
      </div>
    );
  }
}

export default MapSearch;
