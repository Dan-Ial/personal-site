interface location {
  lat: number,
  lng: number
}

export interface markerData extends location{
  text: string;
  url: string;
}

export interface pointsData extends location{
  altitude: number;
}

export interface labelsData extends location {
  text: string;
}

export interface globeMarkerData {
  text: string,
  url: string
}

export interface GlobeComponentProps {
  htmlElements: Array<globeMarkerData>
}

function calculateDistance( // credit : https://stackoverflow.com/a/21623206
  {lat: lat1, lng: lng1}: location,
  {lat: lat2, lng: lng2}: location
) {
  // This function (to my understanding) utilizes the [Haversine](https://en.wikipedia.org/wiki/Haversine_formula)
  // formula to calculate distance over a spheroid given longitude and latitude
  const r = 6371; // km
  const p = Math.PI / 180;

  const a = 0.5 - Math.cos((lat2 - lat1) * p) / 2 + Math.cos(lat1 * p) * Math.cos(lat2 * p) * (1 - Math.cos((lng2 - lng1) * p)) / 2;

  return 2 * r * Math.asin(Math.sqrt(a));
}

function generateNewLocation(previousMarkers: Array<markerData>): location {
  let tooCloseToAnotherPoint = true;
  let lat = 0;
  let lng = 0;
  while (tooCloseToAnotherPoint) {
    tooCloseToAnotherPoint = false;
    lat = Math.random() * 180 - 90;
    lng = Math.random() * 360 - 180;
    for (const marker of previousMarkers) {
      const distance = calculateDistance({lat, lng}, {lat: marker.lat, lng: marker.lng});
      if (distance < 3000) {
        tooCloseToAnotherPoint = true;
        break;
      }
    }
  }

  return {lat, lng}
}

export function generateRandomMarkers(elements: Array<globeMarkerData>): {newMarkers: Array<markerData>, newPoints: Array<pointsData>, newLabels: Array<labelsData>} {
  const newMarkers = new Array<markerData>();
  const newPoints = new Array<pointsData>();
  const newLabels = new Array<labelsData>();
  for (var i = 0; i < elements.length; i++) {
    const {lat, lng} = generateNewLocation(newMarkers);
    const text = elements[i].text;
    const url = elements[i].url;

    newMarkers.push({ lat, lng, text, url });
    newPoints.push({ lat, lng, altitude: 0.3 });
    newLabels.push({ lat, lng, text: "." });
  }

  return {newMarkers, newPoints, newLabels};
};