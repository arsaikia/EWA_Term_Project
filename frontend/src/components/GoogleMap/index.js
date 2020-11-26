import React from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

const MapContainer = () => {
    return (
        <Map zoom={14}>
            <Marker
                onClick={console.log('Clicked!')}
                name={'Current location'}
            />

            <InfoWindow onClose={null}>
                <div>'something'</div>
            </InfoWindow>
        </Map>
    );
};

export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GCP_MAP_API_KEY,
})(MapContainer);
