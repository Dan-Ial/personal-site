"use client"

import dynamic from "next/dynamic";
import markers from "../../public/globemarkers.json"
import { globeMarkerDataBasic, globeMarkerDataElement } from "@/components/GlobeHelper";
import { Dialog, DialogTrigger, DialogContentLarge, DialogContent, DialogDescription, DialogHeader,DialogTitle } from "@/components/ui/dialog";
import { Button, PseudoButton } from "@/components/ui/button";

const GlobeComponent = dynamic(() => import("../components/Globe"), { ssr: false });

function assignBasic(markers: { text: string; url: string; }[]): (globeMarkerDataBasic | globeMarkerDataElement)[] {
  const assignedMarkers: Array<globeMarkerDataBasic | globeMarkerDataElement> = [];

  for (var i = 0; i < markers.length; i++) {
    assignedMarkers.push({
      _kind: 'basic',
      text: markers[i].text,
      url: markers[i].url
    });
  }

  return assignedMarkers;
}

export default function Home() {
  const assignedMarkers = assignBasic(markers);

  //TODO move these into separate components
  const TestDialogue = (
    <>
      <Dialog>
        <DialogTrigger>
          <PseudoButton variant="default" className="p-2 cursor-pointer">
            Open a dialogue
          </PseudoButton>
        </DialogTrigger>
        <DialogContentLarge>
          <DialogHeader>
            <DialogTitle>test title</DialogTitle>
            <DialogDescription>
              test description
            </DialogDescription>
          </DialogHeader>
          <p>oh wow this actually works</p>
        </DialogContentLarge>
      </Dialog>
    </>
  );

  const ContactDialogue = (
    <>
      <Dialog>
        <DialogTrigger>
          <PseudoButton variant="default" className="p-2 cursor-pointer">
            Contact Info
          </PseudoButton>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contact Info</DialogTitle>
          </DialogHeader>
          <p>Phone Number: <a href="tel:+12897006045" className="underline decoration-sky-500/30">🇨🇦+1 289-700-6045</a></p>
          <p>Email: <a href="danoh0911@gmail.com" className="underline decoration-sky-500/30">danoh0911@gmail.com</a></p>
        </DialogContent>
      </Dialog>
    </>
  );
  
  assignedMarkers.push({_kind: 'element', element: TestDialogue});
  assignedMarkers.push({_kind: 'element', element: ContactDialogue});

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full h-full">
        <GlobeComponent globeMarkers={assignedMarkers} />
      </div>
    </main>
  );
}
