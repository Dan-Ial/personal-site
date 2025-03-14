"use client"; // Ensure this runs only on the client side

import { useEffect, useRef } from "react";
import Globe from "react-globe.gl";

const GlobeComponent = () => {
  const globeRef = useRef<any>(null);

  useEffect(() => {
    if (!globeRef.current) return;

    const globe = globeRef.current;
    globe.controls().autoRotate = true;
    globe.controls().autoRotateSpeed = 0.5;
  }, []);

  return (
    <Globe
      ref={globeRef}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      backgroundColor="rgba(0,0,0,0)"
    />
  );
};

export default GlobeComponent;
