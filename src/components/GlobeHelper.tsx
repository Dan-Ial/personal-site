export interface markerData {
  lat: number;
  lng: number;
  text: string;
  url: string;
}

export interface pointsData {
  lat: number;
  lng: number;
  color: string;
  altitude: number;
}

export const generateRandomMarkers = (elements: Array<React.ReactNode>) : {newMarkers: Array<markerData>, newPoints: Array<pointsData>} => {
  const newMarkers = new Array<markerData>();
  const newPoints = new Array<pointsData>();
  for (var i = 0; i < elements.length; i++) {
    const lat = Math.random() * 180 - 90;
    const lng = Math.random() * 360 - 180;
    const text = "THIS IS MY WORLD, YOU ARE NOT WELCOME IN MY WORLD";
    const url = "https://example.com";

    newMarkers.push({ lat, lng, text, url });
    newPoints.push({ lat, lng, color: "red", altitude: 0.3 });
  }

  return {newMarkers, newPoints};
};