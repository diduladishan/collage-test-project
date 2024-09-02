import defaultImage from "../../assets/meme-templates/default-pic.jpg"
import React, { useState, useRef } from "react"
import { FaBold, FaItalic, FaUnderline } from "react-icons/fa"
import { MdAddPhotoAlternate } from "react-icons/md"
import { Link } from "react-router-dom"

const Template2 = () => {
  const [selectedImage, setSelectedImage] = useState(defaultImage)
  const [topText, setTopText] = useState("top text here")
  const [bottomText, setBottomText] = useState("bottom text here")
  const [isTopPopupOpen, setIsTopPopupOpen] = useState(false)
  const [isBottomPopupOpen, setIsBottomPopupOpen] = useState(false)
  const [tempText, setTempText] = useState("")
  const [textColor, setTextColor] = useState("#fff") // Default text color set to black
  const [isBold, setIsBold] = useState(false) // State to track bold text
  const [isItalic, setIsItalic] = useState(false) // State to track italic text
  const [isUnderline, setIsUnderline] = useState(false) // State to track underline text
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

  const handleTextColorChange = (event) => {
    setTextColor(event.target.value) // Update the text color
  }

  const toggleBold = () => {
    setIsBold((prevBold) => !prevBold) // Toggle the bold state
  }

  const toggleItalic = () => {
    setIsItalic((prevItalic) => !prevItalic) // Toggle the italic state
  }

  const toggleUnderline = () => {
    setIsUnderline((prevUnderline) => !prevUnderline) // Toggle the underline state
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
      // Calculate aspect ratio
      const aspectRatio = image.width / image.height
      let canvasWidth = image.width
      let canvasHeight = image.height

      // Resize to fit within 1920x1920 while maintaining aspect ratio
      if (canvasWidth > 1920 || canvasHeight > 1920) {
        if (aspectRatio > 1) {
          canvasWidth = 1920
          canvasHeight = 1920 / aspectRatio
        } else {
          canvasHeight = 1920
          canvasWidth = 1920 * aspectRatio
        }
      }

      // Set the canvas dimensions based on the calculated values
      canvas.width = canvasWidth
      canvas.height = canvasHeight + 80 // Add 80 for top and bottom text space

      const scaleFactor = canvas.width / 400

      ctx.fillStyle = "black"
      ctx.fillRect(0, 0, canvas.width, 40 * scaleFactor)

      ctx.drawImage(image, 0, 40 * scaleFactor, canvasWidth, canvasHeight)

      ctx.fillStyle = "black"
      ctx.fillRect(
        0,
        canvas.height - 40 * scaleFactor,
        canvas.width,
        40 * scaleFactor,
      )

      // Use the selected text color for top text
      ctx.fillStyle = textColor
      ctx.font = `${isBold ? "bold" : "normal"} ${isItalic ? "italic" : ""} 60px Arial`
      ctx.textAlign = "center"
      ctx.fillText(topText, canvas.width / 2, 30 * scaleFactor)

      // Draw underline for top text if needed
      if (isUnderline) {
        const textWidth = ctx.measureText(topText).width
        ctx.beginPath()
        ctx.moveTo((canvas.width - textWidth) / 2, 40 * scaleFactor)
        ctx.lineTo((canvas.width + textWidth) / 2, 40 * scaleFactor)
        ctx.strokeStyle = textColor
        ctx.lineWidth = 2
        ctx.stroke()
      }

      // Use the selected text color for bottom text
      ctx.fillStyle = textColor
      ctx.fillText(
        bottomText,
        canvas.width / 2,
        canvas.height - 15 * scaleFactor,
      )

      // Draw underline for bottom text if needed
      if (isUnderline) {
        const textWidth = ctx.measureText(bottomText).width
        ctx.beginPath()
        ctx.moveTo(
          (canvas.width - textWidth) / 2,
          canvas.height - 10 * scaleFactor,
        )
        ctx.lineTo(
          (canvas.width + textWidth) / 2,
          canvas.height - 10 * scaleFactor,
        )
        ctx.strokeStyle = textColor
        ctx.lineWidth = 2
        ctx.stroke()
      }

      const dataURL = canvas.toDataURL("image/png")
      const link = document.createElement("a")
      link.href = dataURL
      link.download = "template2.png"
      link.click()
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex w-full items-start justify-start">
        <Link to="/auth/main">
          <button className="m-3 rounded-sm bg-[#453ac5] px-4 py-2">
            Back
          </button>
        </Link>
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-4"
        id="file-upload-template2"
        style={{ display: "none" }}
      />

      {selectedImage && (
        <div className="relative mt-4 w-80">
          <div className="mb-4 flex items-center justify-between">
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
              className="cursor-pointer rounded  text-[45px] text-white"
            >
              <div>
                <MdAddPhotoAlternate className="rounded-md border-2 border-solid border-white px-2 text-[60px]" />
              </div>
            </label>

            <div className="flex items-center justify-center gap-1 rounded-md bg-[#fff] p-4">
              <div>
                <input
                  type="color"
                  value={textColor}
                  onChange={handleTextColorChange}
                  className="h-[30px] w-[30px]"
                />
              </div>

              <button
                onClick={toggleBold}
                className={`rounded px-4 py-2  ${
                  isBold
                    ? ", bg-[#b0b0b0] text-black"
                    : ", bg-[#fff] text-[#343434]"
                } `}
              >
                <FaBold />
              </button>

              <button
                onClick={toggleItalic}
                className={`rounded px-4 py-2 ${
                  isItalic
                    ? "bg-[#b0b0b0] text-black"
                    : ", bg-[#fff] text-[#343434]"
                } `}
              >
                <FaItalic />
              </button>

              <button
                onClick={toggleUnderline}
                className={`rounded px-4 py-2 text-white ${
                  isUnderline
                    ? "bg-[#b0b0b0] text-black"
                    : ", bg-[#fff] text-[#343434]"
                } `}
              >
                <FaUnderline className="text-[#343434]" />
              </button>
            </div>
          </div>
          <div
            className="cursor-pointer bg-black bg-opacity-70 py-2 text-center text-xl text-white"
            onClick={handleTopTextClick}
            style={{
              color: textColor,
              fontWeight: isBold ? "bold" : "normal",
              fontStyle: isItalic ? "italic" : "normal",
              textDecoration: isUnderline ? "underline" : "none",
            }} // Apply text styles
          >
            {topText}
          </div>
          <img
            src={selectedImage}
            alt="Uploaded"
            className="h-auto w-full rounded border-2 border-solid border-white shadow-md "
          />
          <div
            className="cursor-pointer bg-black bg-opacity-70 py-2 text-center text-xl text-white"
            onClick={handleBottomTextClick}
            style={{
              color: textColor,
              fontWeight: isBold ? "bold" : "normal",
              fontStyle: isItalic ? "italic" : "normal",
              textDecoration: isUnderline ? "underline" : "none",
            }} // Apply text styles
          >
            {bottomText}
          </div>
          <div className="flex items-center justify-end">
            <button
              onClick={downloadImage}
              className="mt-4 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
            >
              Download
            </button>
          </div>
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
