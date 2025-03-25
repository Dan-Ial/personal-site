"use client";

import React, { Component, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { GlobeProps, GlobeMethods } from "react-globe.gl";
import { markerSvg } from "../../public/icons";
import { generateRandomMarkers, markerData, pointsData } from "./GlobeHelper";
import { Button } from "./ui/button";
import ReactDOM from "react-dom/client";

export interface GlobeComponentProps {
  htmlElements: Array<React.ReactNode>
}

function GlobeComponent(GlobeComponentProps: GlobeComponentProps) {
  const { htmlElements } = GlobeComponentProps;

  const [Globe, setGlobe] = useState<React.ComponentType<GlobeProps> | null>(null);
  const [globeInstance, setGlobeInstance] = useState<GlobeMethods | null>(null);
  const [markers, setMarkers] = useState<markerData[]>([]);
  const [points, setPoints] = useState<pointsData[]>([]);

  useEffect(() => {
    import("react-globe.gl").then((mod) => setGlobe(() => mod.default));
  }, []);

  useEffect(() => {
    if (globeInstance) {
      const controls = globeInstance.controls();
      if (controls) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;
      }
    }
  }, [globeInstance]);

  useEffect(() => {
    const {newMarkers, newPoints} = generateRandomMarkers(htmlElements);
    setMarkers(newMarkers);
    setPoints(newPoints);
  }, []);
  
  useEffect(() => {
    console.log(markers);
  }, [markers]);

  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center">
      {Globe && (
        <Globe
          ref={setGlobeInstance}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
          backgroundColor="rgb(255, 255, 255)"
          htmlElementsData={markers}
          htmlAltitude={0.3}
          htmlElement={(d: any) => {
            const container = document.createElement("div");
            container.style.pointerEvents = "auto";

            // Render React component into container
            const root = ReactDOM.createRoot(container);
            root.render(
              <a href={d.url} target="_blank" rel="noopener noreferrer">
                <Button variant="default" className="p-2 cursor-pointer">
                  {d.text}
                </Button>
              </a>
            );

            return container;
          }}
          pointsData={points}
          pointAltitude="altitude"
          pointColor="color"
        />
      )}
    </div>
  );
};

export default GlobeComponent;
