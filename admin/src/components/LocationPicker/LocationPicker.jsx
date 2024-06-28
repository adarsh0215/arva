import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';

const MapComponent = ({ url }) => {
  const [shops, setShops] = useState([]);
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;


  useEffect(() => {
    const fetchShops = async () => {
      try {
        const response = await axios.get(`${url}/api/coffee-shops/list`);
        setShops(response.data.data);
      } catch (error) {
        console.error('Error fetching coffee shops:', error);
      }
    };

    fetchShops();
  }, [url]);

  const mapContainerStyle = {
    height: '400px',
    width: '100%',
  };

  const center = {
    lat: 0, // Default center of the map
    lng: 0,
  };

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey}>
      <GoogleMap mapContainerStyle={mapContainerStyle} zoom={2} center={center}>
        {shops.map((shop) => (
          <Marker key={shop._id} position={{ lat: shop.location.lat, lng: shop.location.lng }} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;



// import React, { useState } from 'react';
// import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// const LocationPicker = ({ setLocation }) => {
//   const [markerPosition, setMarkerPosition] = useState({ lat: 0, lng: 0 });

//   const mapContainerStyle = {
//     height: '400px',
//     width: '100%'
//   };

//   const center = {
//     lat: 0,
//     lng: 0
//   };

//   const handleMapClick = (event) => {
//     const { latLng } = event;
//     const lat = latLng.lat();
//     const lng = latLng.lng();
//     setMarkerPosition({ lat, lng });
//     setLocation({ lat, lng });
//   };

//   const mapOptions = {
//     gestureHandling: 'greedy', // Allows one-finger drag to move the map
//   };

//   return (
//     <LoadScript
//       googleMapsApiKey="AIzaSyAgqLtPqlg61xprLQN_jNByGms6RSOvJQc"
//       libraries={['places']}
//       loadingElement={<div style={{ height: '100%' }}>Loading...</div>}
//       onLoad={() => console.log('Google Maps API loaded successfully')}
//       onError={(error) => console.error('Error loading Google Maps API:', error)}
//     >
//       <GoogleMap
//         mapContainerStyle={mapContainerStyle}
//         center={center}
//         zoom={2}
//         options={mapOptions}
//         onClick={handleMapClick}
//       >
//         <Marker
//           position={markerPosition}
//           onLoad={(marker) => {
//             console.log('Marker loaded:', marker);
//           }}
//           onUnmount={(marker) => {
//             console.log('Marker unmounted:', marker);
//           }}
//         />
//       </GoogleMap>
//     </LoadScript>
//   );
// };

// export default LocationPicker;

// // import React, { useState } from 'react';
// // import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// // const LocationPicker = ({ setLocation }) => {
// //   const [markerPosition, setMarkerPosition] = useState({ lat: 0, lng: 0 });

// //   const mapContainerStyle = {
// //     height: '400px',
// //     width: '100%'
// //   };

// //   const center = {
// //     lat: 0,
// //     lng: 0
// //   };

// //   const handleMapClick = (event) => {
// //     const { latLng } = event;
// //     const lat = latLng.lat();
// //     const lng = latLng.lng();
// //     setMarkerPosition({ lat, lng });
// //     setLocation({ lat, lng });
// //   };

// //   return (
// //     <LoadScript googleMapsApiKey="AIzaSyAgqLtPqlg61xprLQN_jNByGms6RSOvJQc">
// //       <GoogleMap
// //         mapContainerStyle={mapContainerStyle}
// //         center={center}
// //         zoom={2}
// //         onClick={handleMapClick}
// //       >
// //         <Marker position={markerPosition} />
// //       </GoogleMap>
// //     </LoadScript>
// //   );
// // };

// // export default LocationPicker;
