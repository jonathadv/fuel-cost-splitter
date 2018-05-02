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
        const { i18n, className } = this.props;
        return (
            <div className={className + ' app-align-center'}>
                <GoogleMaps
                    className="p-2"
                    addressList={this.state.addressList}
                    setDistanceCb={this.setDistance.bind(this)}
                    submitElementId={this.state.submitElementId}
                    i18n={i18n}
                    onLoad={this.onLoadMap}
                />
                <AddressList i18n={i18n} addressList={this.state.addressList} />
                <input
                    className="btn btn-outline-info"
                    type="submit"
                    id={this.state.submitElementId}
                    value={i18n.labels.calculateDistance}
                />
            </div>
        );
    }
}

MapSearch.propTypes = {
    i18n: PropTypes.object.isRequired,
};

export default MapSearch;
