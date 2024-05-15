"use client"
import { Suspense } from "react"
import { Canvas } from "@react-three/fiber"
// import { Model } from "./Model"
import { Perf } from "r3f-perf"
import { Preload, ScrollControls, Scroll } from "@react-three/drei"
import { useControls } from "leva"

import GalleryScene from "../gallery/GalleryScene"

export default function Scene() {
  const galleryProps = useControls("Gallery Props", {
    margin: { value: 1, min: 0.0, max: 10 },
    // amplitude: { value: 0.1, min: 0, max: 1 },
  })

  return (
    <Canvas dpr={[1, 2]}>
      <Perf position={"bottom-left"} />
      <Suspense fallback={null}>
        <ScrollControls
          infinite
          horizontal
          damping={0.25}
          pages={4}
          distance={1}
        >
          <Scroll>
            <GalleryScene galleryProps={galleryProps} />
          </Scroll>
        </ScrollControls>
        <Preload />
      </Suspense>
    </Canvas>
  )
}
