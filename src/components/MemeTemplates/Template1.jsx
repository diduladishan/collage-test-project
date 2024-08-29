import defaultImage from "../../assets/meme-templates/default-pic.jpg"
import React, { useState, useRef } from "react"

const Template1 = () => {
  const [selectedImage, setSelectedImage] = useState(defaultImage)
  const [text, setText] = useState("your text here")
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [tempText, setTempText] = useState(text)
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

  const handleTextClick = () => {
    setIsPopupOpen(true)
    setTempText(text)
  }

  const handleTextChange = (event) => {
    setTempText(event.target.value)
  }

  const handleDoneClick = () => {
    setText(tempText)
    setIsPopupOpen(false)
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
      canvas.height = height + 120

      ctx.fillStyle = "white"
      ctx.fillRect(0, 0, width, 120)

      ctx.fillStyle = "black"
      ctx.font = "bold 60px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"
      ctx.fillText(text, width / 2, 60)

      ctx.drawImage(image, 0, 120, width, height)

      const dataURL = canvas.toDataURL("image/png")
      const link = document.createElement("a")
      link.href = dataURL
      link.download = "template1.png"
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
        id="file-upload-template1"
        style={{ display: "none" }}
      />
      <label
        htmlFor="file-upload-template1"
        className="cursor-pointer rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Browse
      </label>

      {selectedImage && (
        <div className="relative mt-4">
          <div
            className="w-80 cursor-pointer bg-white p-4 text-center text-[35px] text-black"
            onClick={handleTextClick}
          >
            {text}
          </div>
          <img
            src={selectedImage}
            alt="Uploaded"
            className="h-auto w-80 rounded-b shadow-md"
          />
          <button
            onClick={downloadImage}
            className="mt-4 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            Download
          </button>
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

      {isPopupOpen && (
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

export default Template1
