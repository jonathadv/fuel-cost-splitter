import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GoogleMaps extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initLat: this.props.initLat,
      initLng: this.props.initLng,
    };
  }

  getInitialLocation(callback) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.setState({
            initLat: position.coords.latitude,
            initLng: position.coords.longitude,
          });

          return callback();
        },
        () => callback()
      );
    } else {
      return callback();
    }
  }

  // This code loads the Google Maps API Library
  // from Google server and sets the needed functions into
  // `window` reference so them can be called globaly by Maps API.
  setGoogleObjectsToWindow() {
    window.initMap = () => {
      const directionsService = new window.google.maps.DirectionsService();
      const directionsDisplay = new window.google.maps.DirectionsRenderer();
      const map = new window.google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: { lat: this.state.initLat, lng: this.state.initLng },
      });
      directionsDisplay.setMap(map);

      document
        .getElementById(this.props.submitElementId)
        .addEventListener('click', e => {
          e.preventDefault();
          window.calculateAndDisplayRoute(directionsService, directionsDisplay);
        });
    };

    window.calculateAndDisplayRoute = (
      directionsService,
      directionsDisplay
    ) => {
      const addressList = Object.assign([], this.props.addressList);
      const origin = addressList.splice(0, 1)[0];
      const destination = addressList.splice(addressList.length - 1, 1)[0];

      if (!origin.value || !destination.value) {
        alert('Please add at least origin and destination addresses.');
        return;
      }

      const waypts = [];
      addressList.forEach(addrr => {
        if (!addrr.value) {
          return;
        }
        waypts.push({
          location: addrr.value,
          stopover: true,
        });
      });

      directionsService.route(
        {
          origin: origin.value,
          destination: destination.value,
          waypoints: waypts,
          optimizeWaypoints: true,
          travelMode: 'DRIVING',
        },
        (response, status) => {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
            const route = response.routes[0];

            let totalDistance = 0;

            route.legs.forEach(route => {
              totalDistance += route.distance.value;
            });

            this.props.setDistanceCb(Number(totalDistance / 1000));
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        }
      );
    };
  }

  hideHeaderAndShowMap() {
    setTimeout(() => {
      document.getElementById('header').hidden = true;
    }, 3000);
  }

  loadApiLibrary() {
    const apiKey = process.env.REACT_APP_API_KEY;
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key={apiKey}&callback=initMap'.replace(
      '{apiKey}',
      apiKey
    );
    script.onload = () => {
      this.hideHeaderAndShowMap();
    };

    this.setGoogleObjectsToWindow();
    document.body.appendChild(script);
  }

  componentDidMount() {
    this.getInitialLocation(this.loadApiLibrary.bind(this));
  }

  render() {
    return (
      <div id="MapWrapper" className="MapWrapper">
        <div className="map" id="map" />
      </div>
    );
  }
}

GoogleMaps.propTypes = {
  initLat: PropTypes.number,
  initLng: PropTypes.number,
  addressList: PropTypes.array.isRequired,
  setDistanceCb: PropTypes.func.isRequired,
  submitElementId: PropTypes.string.isRequired,
};

GoogleMaps.defaultProps = {
  initLat: -30.0277,
  initLng: -51.2287,
};

export default GoogleMaps;
