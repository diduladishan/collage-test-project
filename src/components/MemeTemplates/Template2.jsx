import defaultImage from "../../assets/meme-templates/default-pic.jpg"
import React, { useState, useRef } from "react"

const Template2 = () => {
  const [selectedImage, setSelectedImage] = useState(defaultImage)
  const [topText, setTopText] = useState("top text here")
  const [bottomText, setBottomText] = useState("bottom text here")
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
      canvas.width = image.width
      canvas.height = image.height + 80

      const scaleFactor = canvas.width / 400

      ctx.fillStyle = "black"
      ctx.fillRect(0, 0, canvas.width, 40 * scaleFactor)

      ctx.drawImage(image, 0, 40 * scaleFactor)

      ctx.fillStyle = "black"
      ctx.fillRect(
        0,
        canvas.height - 40 * scaleFactor,
        canvas.width,
        40 * scaleFactor,
      )

      ctx.fillStyle = "white"
      ctx.font = `bold ${24 * scaleFactor}px Arial`
      ctx.textAlign = "center"
      ctx.fillText(topText, canvas.width / 2, 30 * scaleFactor)

      ctx.fillStyle = "white"
      ctx.font = `bold ${24 * scaleFactor}px Arial`
      ctx.fillText(
        bottomText,
        canvas.width / 2,
        canvas.height - 15 * scaleFactor,
      )

      const dataURL = canvas.toDataURL("image/png")
      const link = document.createElement("a")
      link.href = dataURL
      link.download = "template2.png"
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
        id="file-upload-template2"
        style={{ display: "none" }}
      />
      <label
        htmlFor="file-upload-template2"
        className="cursor-pointer rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Browse
      </label>

      {selectedImage && (
        <div className="relative mt-4 w-80">
          <div
            className="cursor-pointer bg-black bg-opacity-70 py-2 text-center text-xl text-white"
            onClick={handleTopTextClick}
            style={{ width: "100%", marginBottom: "0px" }}
          >
            {topText}
          </div>
          <img
            src={selectedImage}
            alt="Uploaded"
            className="h-auto w-full rounded shadow-md"
          />
          <div
            className="cursor-pointer bg-black bg-opacity-70 py-2 text-center text-xl text-white"
            onClick={handleBottomTextClick}
            style={{ width: "100%", marginTop: "0px" }}
          >
            {bottomText}
          </div>
          <button
            onClick={downloadImage}
            className="mt-4 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            Download
          </button>
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

      {(isTopPopupOpen || isBottomPopupOpen) && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded bg-white p-4 shadow-md">
            <h2 className="mb-2 text-xl">Enter your text</h2>
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

export default Template2
