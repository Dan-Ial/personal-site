"use client";

import React, { Component, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { GlobeProps, GlobeMethods } from "react-globe.gl";
import { markerSvg } from "../../public/icons";
import { generateRandomMarkers, markerDataBasic, pointsData, labelsData, GlobeComponentProps } from "./GlobeHelper";
import { Button } from "./ui/button";
import ReactDOM from "react-dom/client";

function GlobeComponent(GlobeComponentProps: GlobeComponentProps) {
  const { globeMarkers: globeMarkers } = GlobeComponentProps;

  const [Globe, setGlobe] = useState<React.ComponentType<GlobeProps> | null>(null);
  const [globeInstance, setGlobeInstance] = useState<GlobeMethods | null>(null);
  const [markers, setMarkers] = useState<markerDataBasic[]>([]);
  const [points, setPoints] = useState<pointsData[]>([]);
  const [labels, setLabels] = useState<labelsData[]>([]);

  useEffect(() => {
    import("react-globe.gl").then((mod) => setGlobe(() => mod.default));
  }, []);

  useEffect(() => {
    if (globeInstance) {
      const controls = globeInstance.controls();
      if (controls) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 200; // Start speed at max
  
        const holdDuration = 100; // Time (in ms) to stay at max speed
        const decayDuration = 100; // Time (in ms) for slowing down
        const minSpeed = 0.25; // Minimum speed
        const steps = 10; // Number of steps during decay
        const intervalTime = decayDuration / steps; // Time per step
  
        setTimeout(() => { // Start decay after holding period to make it have a more impactful effect
          let time = 0;
  
          const interval = setInterval(() => {
            time += intervalTime;
            const progress = time / decayDuration;
            const k = 15; // rate of decay
            controls.autoRotateSpeed = 100 * (1 / (1 + k * progress));
  
            if (controls.autoRotateSpeed < minSpeed) {
              controls.autoRotateSpeed = minSpeed;
              clearInterval(interval);
            }
          }, intervalTime);
        }, holdDuration);
      }
    }
  }, [globeInstance]);
  

  useEffect(() => {
    const {newMarkers, newPoints, newLabels} = generateRandomMarkers(globeMarkers);
    setMarkers(newMarkers);
    setPoints(newPoints);
    setLabels(newLabels);
  }, []);
  
  useEffect(() => {
    console.log(labels);
  }, [labels]);

  return (
    <div className="relative w-full h-screen bg-black flex items-center justify-center opacity-0 transition-opacity duration-1000 ease-in-out" style={{ opacity: Globe ? 1 : 0 }}>
      {Globe && (
        <Globe
          ref={setGlobeInstance}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
          backgroundColor="rgb(0, 0, 0)"
          waitForGlobeReady={true}
          animateIn={false}
          htmlElementsData={markers}
          htmlAltitude={0.3}
          htmlElement={(d: any) => {
            const container = document.createElement("div");
            container.style.pointerEvents = "auto";

            // Render React component into container
            const root = ReactDOM.createRoot(container);

            if (d._kind == 'basic') {
              root.render(
                <a href={d.url} target="_blank" rel="noopener noreferrer">
                  <Button variant="default" className="p-2 cursor-pointer">
                    {d.text}
                  </Button>
                </a>
              );
            }
            else if (d._kind == 'element') {
              root.render(<>{d.element}</>)
            }
            return container;
          }}
          pointsData={points}
          pointAltitude="altitude"
          pointColor={() => "rgba(85, 0, 134, 0.75)"}
          labelsData={labels}
          labelColor={() => "rgba(85, 0, 134, 0.75)"}
          labelSize={0.00001}
          labelAltitude={0.002} // to reduce texture overlap glitches
          labelDotRadius={3}
        />
      )}
    </div>
  );
};

export default GlobeComponent;
