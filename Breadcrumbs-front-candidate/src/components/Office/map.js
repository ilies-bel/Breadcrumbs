import React, {memo, lazy, Suspense, useCallback, useState} from 'react'

const GoogleMapReact = lazy(() =>  import('google-map-react'));

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
        <Suspense fallback={ <p>Wait ...</p> }>
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
        </Suspense>
      </div>
    )
}

export default memo(OfficeMap)
