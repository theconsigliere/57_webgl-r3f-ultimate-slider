import { useEffect, useRef, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { useScroll, Image } from "@react-three/drei"
import { easing } from "maath"

function GalleryImage(props) {
  const ref = useRef()
  const { offset } = useScroll()

  useFrame((state) => {})

  return <Image ref={ref} {...props} />
}

function GalleryPage({ margin = 0.4, background, urls, ...props }) {
  // Page has 3 images
  const { width } = useThree((state) => state.viewport)
  const imageWidth = width / 3 - margin

  return (
    <group {...props}>
      {/* <mesh scale={width} position={[0, 0, -1]}>
        <planeGeometry />
        <meshBasicMaterial color={background} />
      </mesh> */}
      <GalleryImage
        position={[-width / 3, 0, 0]}
        scale={imageWidth}
        url={urls[0]}
      />
      <GalleryImage position={[0, 0, 0]} scale={imageWidth} url={urls[1]} />
      <GalleryImage
        position={[width / 3, 0, 0]}
        scale={imageWidth}
        url={urls[2]}
      />
    </group>
  )
}

export default function GalleryScene({ children, ...props }) {
  const { width } = useThree((state) => state.viewport)
  const [hovered, setHovered] = useState(false)
  const [clicked, setClick] = useState(false)
  const [grey, setGrey] = useState(0)
  const scroll = useScroll()
  const { galleryProps } = props

  //Props
  const sliderMargin = galleryProps.margin

  //SNAP TO
  // const pagePoints = [0, 0.333, 0.666, 1]

  useFrame((state) => {
    const firstPage = scroll.visible(0, 1 / 3)
    const secondPage = scroll.visible(1 / 3, 2 / 3)
    const thirdPage = scroll.visible(2 / 3, 1)

    firstPage ? setGrey(0) : setGrey(1)

    console.log(grey, firstPage)

    // console.log(firstPage, secondPage, thirdPage)
    // compare scroll.offset to pagePoints and return the nearest
    //   const nearestPagePoint = pagePoints.reduce((prev, curr) =>
    //     Math.abs(curr - scroll.offset) < Math.abs(prev - scroll.offset)
    //       ? curr
    //       : prev
    //   )
    //   console.log(nearestPagePoint, scroll.offset)
    //   if (scroll.delta <= 0)
    //     scroll.el.scrollLeft =
    //       nearestPagePoint * scroll.el.scrollWidth - scroll.el.clientWidth
  })

  return (
    <>
      <GalleryPage
        position={[-width * 1, 0, 0]}
        margin={sliderMargin}
        greyScale={grey}
        background="red"
        urls={["/images/1.jpg", "/images/2.jpg", "/images/3.jpg"]}
      />
      <GalleryPage
        position={[width * 0, 0, 0]}
        margin={sliderMargin}
        background="blue"
        urls={["/images/4.jpg", "/images/2.jpg", "/images/3.jpg"]}
      />
      <GalleryPage
        position={[width * 1, 0, 0]}
        margin={sliderMargin}
        background="yellow"
        urls={["/images/1.jpg", "/images/5.jpg", "/images/4.jpg"]}
      />

      {/* Repeat */}
      <GalleryPage
        position={[width * 2, 0, 0]}
        margin={sliderMargin}
        background="green"
        urls={["/images/1.jpg", "/images/2.jpg", "/images/3.jpg"]}
      />
      <GalleryPage
        position={[width * 3, 0, 0]}
        margin={sliderMargin}
        background="orange"
        urls={["/images/4.jpg", "/images/2.jpg", "/images/3.jpg"]}
      />
      <GalleryPage
        position={[width * 4, 0, 0]}
        margin={sliderMargin}
        background="lightgreen"
        urls={["/images/1.jpg", "/images/5.jpg", "/images/4.jpg"]}
      />
    </>
  )
}
