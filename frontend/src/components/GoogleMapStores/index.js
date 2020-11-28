import React, { useState, useEffect } from 'react';
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    Marker,
    InfoWindow,
} from 'react-google-maps';
import { get } from 'lodash';
import { Button } from 'react-bootstrap';
import storeData from '../../utils/stores.json';
import mapStyles from './mapStyles';
import STORE_ICON from '../../Images/Icons/storeIcon.svg';
import { FlexContainer, Spacing } from '../../components/StylingComponents';

function Map({ setStore, setShowMap, getFilteredProducts }) {
    const [selectedPark, setSelectedPark] = useState(null);
    useEffect(() => {
        const listener = (e) => {
            if (e.key === 'Escape') {
                setSelectedPark(null);
            }
        };
        window.addEventListener('keydown', listener);

        return () => {
            window.removeEventListener('keydown', listener);
        };
    }, []);

    const buttonClickHandler = () => {
        setStore(selectedPark);
        getFilteredProducts(get(selectedPark, 'storeId', ''), 'STORE');
        setShowMap(false);
    };

    return (
        <GoogleMap
            defaultZoom={10}
            defaultCenter={{ lat: 41.80908, lng: -87.61624 }}
            defaultOptions={{ styles: mapStyles }}>
            {storeData.map((store) => (
                <Marker
                    key={store.storeId}
                    getDraggable={false}
                    position={{
                        lat: store.coordinates[1],
                        lng: store.coordinates[0],
                    }}
                    onClick={() => {
                        setSelectedPark(store);
                    }}
                    icon={{
                        url: STORE_ICON,
                        scaledSize: new window.google.maps.Size(50, 50),
                    }}
                />
            ))}

            {selectedPark && (
                <InfoWindow
                    onCloseClick={() => {
                        setSelectedPark(null);
                    }}
                    position={{
                        lat: selectedPark.coordinates[1],
                        lng: selectedPark.coordinates[0],
                    }}>
                    <FlexContainer
                        padding='10px 30px 10px 30px'
                        flexDirection='column'>
                        <h2>{selectedPark.storeName}</h2>
                        <p>{selectedPark.street1}</p>
                        <Spacing height='20px'></Spacing>
                        <FlexContainer
                            fleDirection='row'
                            justifyContent='center'>
                            <Button
                                onClick={buttonClickHandler}
                                variant='outline-success'
                                size='sm'>
                                Select Store
                            </Button>
                        </FlexContainer>
                    </FlexContainer>
                </InfoWindow>
            )}
        </GoogleMap>
    );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function GoogleMapStores({
    setStore,
    setShowMap,
    getFilteredProducts,
}) {
    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <MapWrapped
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${'AIzaSyAnoSi5DGcBxekjYc3dlbDF9SrmTrS-G-s'}`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
                setStore={setStore}
                setShowMap={setShowMap}
                getFilteredProducts={getFilteredProducts}
            />
        </div>
    );
}
