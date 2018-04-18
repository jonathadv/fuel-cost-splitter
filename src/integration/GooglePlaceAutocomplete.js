import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GooglePlacesAutocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initLat: this.props.initLat,
      initLng: this.props.initLng,
    };
  }

  setGoogleObjectsToWindow() {
    let placeSearch, autocomplete;
    const componentForm = {
      street_number: 'short_name',
      route: 'long_name',
      locality: 'long_name',
      administrative_area_level_1: 'short_name',
      country: 'long_name',
      postal_code: 'short_name',
    };

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

      for (var component in componentForm) {
        document.getElementById(component).value = '';
        document.getElementById(component).disabled = false;
      }

      // Get each component of the address from the place details
      // and fill the corresponding field on the form.
      for (var i = 0; i < place.address_components.length; i++) {
        var addressType = place.address_components[i].types[0];
        if (componentForm[addressType]) {
          var val = place.address_components[i][componentForm[addressType]];
          document.getElementById(addressType).value = val;
        }
      }
    };

    // Bias the autocomplete object to the user's geographical location,
    // as supplied by the browser's 'navigator.geolocation' object.
    window.geolocate = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var geolocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          var circle = new window.google.maps.Circle({
            center: geolocation,
            radius: position.coords.accuracy,
          });
          autocomplete.setBounds(circle.getBounds());
        });
      }
    };
  }

  loadApiLibrary() {
    const apiKey = process.env.REACT_APP_API_KEY;
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key={apiKey}&callback=initMap'.replace(
      '{apiKey}',
      apiKey
    );
    script.onload = () => {
      this.onLoad();
    };

    this.setGoogleObjectsToWindow();
    document.body.appendChild(script);
  }

  componentDidMount() {
    this.loadApiLibrary.bind(this);
  }

  render() {
    return (
      <div id="locationField">
        <input
          id="autocomplete"
          placeholder="Enter your address"
          onFocus={window.geolocate()}
          type="text"
        />
      </div>
    );
  }
}

GooglePlacesAutocomplete.propTypes = {
  initLat: PropTypes.number,
  initLng: PropTypes.number,
  onLoad: PropTypes.func,
};

GooglePlacesAutocomplete.defaultProps = {
  initLat: -30.0277,
  initLng: -51.2287,
};

export default GooglePlacesAutocomplete;
