import React, { useState } from "react";
import {
  APIProvider,
  Map,
  Marker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import Image from "next/image";
import cdkExports from "../cdk-exports.json";

const containerStyle = {
  width: "1000px",
  height: "600px",
};

function MapGoogle({ tours = [] }) {
  const [selectedMarker, setSelectedMarker] = useState(null);

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);

    // Wait for the map to fully load before calculating bounds
    const waitForMapIdle = setInterval(() => {
      if (map.getCenter().lat() !== 0 && map.getCenter().lng() !== 0) {
        clearInterval(waitForMapIdle);

        const bounds = new window.google.maps.LatLngBounds();
        tours.forEach((tour) => {
          bounds.extend(
            new window.google.maps.LatLng(
              tour.coordinates[0],
              tour.coordinates[1]
            )
          );
        });

        // Adjust the center and zoom after the map has fully loaded
        map.fitBounds(bounds);
      }
    }, 100);
  }, []);

  const handleMarkerClick = (tour) => {
    setSelectedMarker(tour);
  };

  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
  };

  return (
    <APIProvider apiKey={cdkExports.GoogleMap.GoogleMapsApiKey}>
      <Map
        mapContainerStyle={containerStyle}
        center={{ lat: 6.8731, lng: 79.8918 }}
        zoom={10}
        onLoad={onLoad}
      >
        {tours.map((tour, index) => (
          <Marker
            key={index}
            position={{ lat: tour.coordinates[0], lng: tour.coordinates[1] }}
            onClick={() => handleMarkerClick(tour)}
          />
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
              <p>{selectedMarker.details}</p>
            </div>
          </InfoWindow>
        )}
      </Map>
    </APIProvider>
  );
}

export default MapGoogle;
