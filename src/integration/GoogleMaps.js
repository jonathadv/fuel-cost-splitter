import React, { Component } from 'react';

class GooggleMapsBox extends Component {
  constructor(props) {
    super(props);

    window.initMap = () => {
      const directionsService = new window.google.maps.DirectionsService();
      const directionsDisplay = new window.google.maps.DirectionsRenderer();
      const map = new window.google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: { lat: -30.0277, lng: -51.2287 },
      });
      directionsDisplay.setMap(map);

      document.getElementById('submit').addEventListener('click', e => {
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

      const waypts = [];
      addressList.forEach(addrr => {
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

            this.props.cb(Number(totalDistance / 1000));
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        }
      );
    };
  }

  loadMapsApi() {
    const apiKey = process.env.REACT_APP_API_KEY;
    const script = document.createElement('script');
    script.src = 'https://maps.googleapis.com/maps/api/js?key={apiKey}&callback=initMap'.replace(
      '{apiKey}',
      apiKey
    );
    script.onload = () => {
      setTimeout(() => {
        document.getElementById('header').hidden = true;
      }, 3000);
    };

    document.body.appendChild(script);
  }

  componentWillMount() {
    this.loadMapsApi();
  }

  render() {
    return (
      <div id="MapWrapper" className="MapWrapper">
        <div className="map" id="map" />
      </div>
    );
  }
}

export default GooggleMapsBox;
