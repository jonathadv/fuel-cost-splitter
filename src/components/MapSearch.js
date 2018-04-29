import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AddressList from './AddressList';
import GoogleMaps from '../integration/GoogleMaps';

class MapSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addressList: this.props.addressList,
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
                    i18n={this.props.i18n}
                    onLoad={this.onLoadMap}
                />
                <AddressList i18n={this.props.i18n} addressList={this.state.addressList} />
                <input
                    className="btn btn-outline-primary"
                    type="submit"
                    id={this.state.submitElementId}
                    value={this.props.i18n.labels.calculateDistance}
                />
            </div>
        );
    }
}

MapSearch.propTypes = {
    i18n: PropTypes.object.isRequired,
};

export default MapSearch;
