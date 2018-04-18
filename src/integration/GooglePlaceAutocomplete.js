import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GooglePlacesAutocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  // Based on Google Places Autocomplition documentation
  // https://developers.google.com/maps/documentation/javascript/places-autocomplete 
  setGoogleObjectsToWindow() {
    let placeSearch, autocomplete;

    window.initAutocomplete = () => {
      // Create the autocomplete object, restricting the search to geographical
      // location types.
      autocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById('autocomplete'),
        { types: [] }
      );

      // When the user selects an address from the dropdown, populate the address
      // fields in the form.
      autocomplete.addListener('place_changed', window.fillInAddress);
    };

    window.fillInAddress = () => {
      // Get the place details from the autocomplete object.
      var place = autocomplete.getPlace();
      console.log('######### Chose address is: ', place.formatted_address)

    };

  }

  onLoad() {
    if (this.props.onLoad) {
      this.props.onLoad();
    }
  }

  loadApiLibrary() {
    const apiKey = process.env.REACT_APP_API_KEY;
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key={apiKey}&libraries=places&callback=initAutocomplete'.replace(
      '{apiKey}',
      apiKey
    );
    script.onload = () => {
        this.onLoad();
    };

    this.setGoogleObjectsToWindow();
    document.body.appendChild(script);
  }

  componentWillMount() {
      return this.loadApiLibrary();
  }

  render() {
    return (
      <div id="locationField">
        <input
          id="autocomplete"
          placeholder="Enter your address"
          type="text"
        />
      </div>
    );
  }
}

GooglePlacesAutocomplete.propTypes = {
  onLoad: PropTypes.func,
};

GooglePlacesAutocomplete.defaultProps = {
};

export default GooglePlacesAutocomplete;
