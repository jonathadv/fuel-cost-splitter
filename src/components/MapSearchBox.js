import React, { Component } from 'react';
import AddressBox from './AddressBox';
import GoogleMapsBox from '../integration/GoogleMaps';

class MapSearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
        addressList: []
    }
  }

  setDistance(distance){
    this.props.cb(distance);
  }

  render() {
    return (
      <div className='MapSearchBox'>
        <GoogleMapsBox addressList={this.state.addressList} cb={this.setDistance.bind(this)}/>
        <AddressBox addressList={this.state.addressList}/>
        <input
          className='CalcDistanceButton'
          type='submit'
          id='submit'
          value='Calcular Distância'
        />

      </div>
    );
  }
}

export default MapSearchBox;
