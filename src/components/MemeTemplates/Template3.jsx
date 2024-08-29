import defaultImage from "../../assets/meme-templates/default-pic.jpg"
import React, { useState, useRef } from "react"

const Template3 = () => {
  const [selectedImage, setSelectedImage] = useState(defaultImage) // Set default image initially
  const [topText, setTopText] = useState("Top text here")
  const [bottomText, setBottomText] = useState("Bottom text here")
  const [isTopPopupOpen, setIsTopPopupOpen] = useState(false)
  const [isBottomPopupOpen, setIsBottomPopupOpen] = useState(false)
  const [tempText, setTempText] = useState("")
  const canvasRef = useRef(null)

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleTopTextClick = () => {
    setIsTopPopupOpen(true)
    setTempText(topText)
  }

  const handleBottomTextClick = () => {
    setIsBottomPopupOpen(true)
    setTempText(bottomText)
  }

  const handleTextChange = (event) => {
    setTempText(event.target.value)
  }

  const handleDoneClick = () => {
    if (isTopPopupOpen) {
      setTopText(tempText)
      setIsTopPopupOpen(false)
    } else if (isBottomPopupOpen) {
      setBottomText(tempText)
      setIsBottomPopupOpen(false)
    }
  }

  const downloadImage = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    const image = new Image()
    image.src = selectedImage
    image.onload = () => {
      let width = image.width
      let height = image.height
      const maxWidth = 1920
      const maxHeight = 1080

      if (width > maxWidth || height > maxHeight) {
        const widthRatio = maxWidth / width
        const heightRatio = maxHeight / height
        const resizeRatio = Math.min(widthRatio, heightRatio)

        width = width * resizeRatio
        height = height * resizeRatio
      }

      canvas.width = width
      canvas.height = height

      ctx.drawImage(image, 0, 0, width, height)

      ctx.font = "bold 60px Arial"
      ctx.fillStyle = "white"
      ctx.textAlign = "center"
      ctx.textBaseline = "top"
      ctx.fillText(topText, canvas.width / 2, 20)

      ctx.font = "bold 60px Arial"
      ctx.fillStyle = "white"
      ctx.textAlign = "center"
      ctx.textBaseline = "bottom"
      ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20)

      const dataURL = canvas.toDataURL("image/png")
      const link = document.createElement("a")
      link.href = dataURL
      link.download = "template3.png"
      link.click()
    }
  }

  return (
    <div className="flex flex-col items-center">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-4"
        id="file-upload-template3"
        style={{ display: "none" }}
      />
      <label
        htmlFor="file-upload-template3"
        className="cursor-pointer rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Browse
      </label>

      {selectedImage && (
        <div className="relative mt-4">
          <div
            className="absolute left-0 top-0 w-full cursor-pointer bg-black bg-opacity-70 py-2 text-center text-[30px] text-white"
            onClick={handleTopTextClick}
            style={{ zIndex: 10 }}
          >
            {topText}
          </div>
          <img
            src={selectedImage}
            alt="Uploaded"
            className="h-auto w-80 rounded shadow-md"
          />
          <div
            className="absolute bottom-0 left-0 w-full cursor-pointer bg-black bg-opacity-70 py-2 text-center text-[30px] text-white"
            onClick={handleBottomTextClick}
            style={{ zIndex: 10 }}
          >
            {bottomText}
          </div>
          <button
            onClick={downloadImage}
            className="mt-4 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
            style={{ position: "absolute", bottom: "-50px", right: "0" }}
          >
            Download
          </button>
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

      {(isTopPopupOpen || isBottomPopupOpen) && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded bg-white p-4 shadow-md">
            <h2 className="mb-2 text-xl text-black">Enter your text</h2>
            <input
              type="text"
              value={tempText}
              onChange={handleTextChange}
              className="mb-4 w-full border p-2"
            />
            <button
              onClick={handleDoneClick}
              className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Template3
