import React, { useRef } from "react"
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6"
import { useNavigate } from "react-router-dom"
import UpdateCustomImage from "./UpdateCustomImage"
import image1 from "../../assets/image01.png"
import image10 from "../../assets/image01.png"
import image2 from "../../assets/image02.png"
import image3 from "../../assets/image03.png"
import image4 from "../../assets/image04.png"
import image5 from "../../assets/image05.png"
import image6 from "../../assets/image06.png"
import image7 from "../../assets/image07.png"
import image8 from "../../assets/image08.png"
import image9 from "../../assets/image09.png"
import image11 from "../../assets/image11.jpg"
import image12 from "../../assets/image12.jpg"
import image13 from "../../assets/image13.jpg"
import image14 from "../../assets/dog1.jpg"

const images = [
  { src: image14, route: null, click: true }, // Custom upload image
  { src: image11, route: "/auth/template1", click: false },
  { src: image12, route: "/auth/template2", click: false },
  { src: image13, route: "/auth/template3", click: false },
  { src: image1, route: null, click: false },
  { src: image2, route: null, click: false },
  { src: image3, route: null, click: false },
  { src: image4, route: null, click: false },
  { src: image5, route: null, click: false },
  { src: image6, route: null, click: false },
  { src: image7, route: null, click: false },
  { src: image8, route: null, click: false },
  { src: image9, route: null, click: false },
  { src: image10, route: null, click: false },
]

const ImageSelector = ({ onImageSelect }) => {
  const carouselRef = useRef(null)
  const navigate = useNavigate()

  const handleNext = () => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth / 2
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  const handlePrev = () => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth / 2
      carouselRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" })
    }
  }

  const handleSelect = (image) => {
    if (image.route) {
      navigate(image.route)
    } else if (image.click) {
      document.getElementById("customImageUpload").click()
    } else {
      onImageSelect(image.src)
    }
  }

  return (
    <div className="relative w-full overflow-hidden">
      <button
        onClick={handlePrev}
        className="size-7 md:size-8 lg:size-9 xl:size-10 2xl:size-12 absolute left-0 top-1/2 z-10 flex -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full bg-gray-800 text-sm text-white md:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
      >
        <FaAngleLeft />
      </button>
      <div
        ref={carouselRef}
        className="no-scrollbar flex w-full overflow-hidden"
      >
        <div className="flex">
          {images.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={`Meme ${index}`}
              className="mr-2.5 h-auto w-[calc(33%-6px)] flex-shrink-0 cursor-pointer rounded-md border-[3px] border-gray-300 sm:w-[calc(33%-6px)] md:w-[calc(16.2%-6px)] lg:w-[calc(14%-7px)] lg:border-4 xl:w-[calc(12.5%-10px)] 2xl:w-[calc(12.5%-10px)]"
              onClick={() => handleSelect(image)}
            />
          ))}
        </div>
      </div>
      <button
        onClick={handleNext}
        className="size-7 md:size-8 lg:size-9 xl:size-10 2xl:size-12 absolute right-0 top-1/2 z-10 flex -translate-y-1/2 transform cursor-pointer items-center justify-center rounded-full bg-gray-800 text-sm text-white md:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
      >
        <FaAngleRight />
      </button>

      {/* Hidden file input for custom image upload */}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="customImageUpload"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) {
            const reader = new FileReader()
            reader.onload = () => {
              const result = reader.result
              onImageSelect(result)
            }
            reader.readAsDataURL(file)
          }
        }}
      />
    </div>
  )
}

export default ImageSelector
