import React, {memo, useCallback, useState} from 'react'
import {GoogleMap, useJsApiLoader} from '@react-google-maps/api';

import GoogleMapReact from 'google-map-react';
import FlashyButton from 'littleComponents/flashyButton'

import './office.scss';

const containerStyle = {
    width: '100%',
    height: '500px'
};

const pos_pwc = {
    lat: 45.8846,
    lng: 4.96965
};

function OfficeMap() {
    return (
        <div className='mapContainer'>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCK1h2givbm_74EEN77-iGnKUz52sQaIgk" }}
          defaultCenter={pos_pwc}
          defaultZoom={10}
        >
          <img src='/Pinlet Marker.svg'
            lat={45.76231}
            lng={4.920307}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    )
}

export default memo(OfficeMap)
