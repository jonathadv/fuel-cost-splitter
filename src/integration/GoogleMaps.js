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
    // `window` reference so they can be called globaly by Maps API.
    setGoogleObjectsToWindow() {
        window.initMap = () => {
            const directionsService = new window.google.maps.DirectionsService();
            const directionsDisplay = new window.google.maps.DirectionsRenderer();
            const map = new window.google.maps.Map(document.getElementById('map'), {
                zoom: 6,
                center: { lat: this.state.initLat, lng: this.state.initLng },
            });
            directionsDisplay.setMap(map);

            document.getElementById(this.props.submitElementId).addEventListener('click', e => {
                e.preventDefault();
                window.calculateAndDisplayRoute(directionsService, directionsDisplay);
            });
        };

        window.calculateAndDisplayRoute = (directionsService, directionsDisplay) => {
            const addressList = Object.assign([], this.props.addressList);
            const origin = addressList.splice(0, 1)[0];
            const destination = addressList.splice(addressList.length - 1, 1)[0];

            if (!origin.value || !destination.value) {
                alert(this.props.i18n.messages.originDestinationWarning);
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
                    travelMode: this.props.travelMode,
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
                        window.alert(
                            this.props.i18n.messages.googleDirectionsError.replace(
                                '{error}',
                                status
                            )
                        );
                    }
                }
            );
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
        script.src = 'https://maps.googleapis.com/maps/api/js?key={apiKey}&libraries=visualization,places&callback=initMap'.replace(
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
        this.getInitialLocation(this.loadApiLibrary.bind(this));
    }

    render() {
        return (
            <div id="MapWrapper" className="app-map">
                <div id="map" className="h-100 w-100" />
            </div>
        );
    }
}

GoogleMaps.propTypes = {
    travelMode: PropTypes.string,
    initLat: PropTypes.number,
    initLng: PropTypes.number,
    onLoad: PropTypes.func,
    addressList: PropTypes.array.isRequired,
    setDistanceCb: PropTypes.func.isRequired,
    submitElementId: PropTypes.string.isRequired,
    i18n: PropTypes.object.isRequired,
};

GoogleMaps.defaultProps = {
    initLat: -30.0277,
    initLng: -51.2287,
    travelMode: 'DRIVING',
};

export default GoogleMaps;
