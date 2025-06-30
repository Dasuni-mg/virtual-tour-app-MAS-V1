import React, { useState } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import Image from "next/image";
import cdkExports from "../cdk-exports.json";
const containerStyle = {
  width: "1000px",
  height: "600px",
};

function MyComponent({ tours = [] }) { 
  const { GoogleMap: googleMapConfig } = cdkExports;
  const { isLoaded } = useJsApiLoader(googleMapConfig);

  const [map, setMap] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    tours.forEach((tour) => {
      bounds.extend(
        new window.google.maps.LatLng(tour.coordinates[0], tour.coordinates[1])
      );
    });
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handleMarkerClick = (tour) => {
    setSelectedMarker(tour);
  };

  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
    if (map) {
      map.fitBounds(new window.google.maps.LatLngBounds());
    }
  };

  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: 7.8731, lng: 80.7718 }}
        zoom={7}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {tours.map((tour) => (
          <Marker
            key={tour.name}
            position={{ lat: tour.coordinates[0], lng: tour.coordinates[1] }}
            onClick={() => handleMarkerClick(tour)}
          ></Marker>
        ))}
        {selectedMarker && (
          <InfoWindow
            position={{
              lat: selectedMarker.coordinates[0],
              lng: selectedMarker.coordinates[1],
            }}
            onCloseClick={handleInfoWindowClose}
          >
            <div className="w-50">
              <h3 className="font-bold text-black text-3xl">
                {selectedMarker.name}
              </h3>
              {selectedMarker.thumbnail && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    src={selectedMarker.thumbnail}
                    alt={`${selectedMarker.name} image`}
                    width={200}
                    height={200}
                    style={{ objectFit: "cover" }}
                  />
                </div>
              )}
              <p className="font-bold text-black">
                latitude : {selectedMarker.coordinates[0]}
              </p>
              <p className="font-bold text-black">
                longitude : {selectedMarker.coordinates[1]}
              </p>
              <p className="text-blue-700">
                <a href={selectedMarker.url} target="_blank" rel="noreferrer">
                  Click here to visit tour
                </a>
              </p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}
export default React.memo(MyComponent);
