import React, { useState, useRef, useEffect } from "react"

const Template3 = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [text2, setText2] = useState("Editable Text 2")
  const [text3, setText3] = useState("Editable Text 3")
  const [isText2PopupOpen, setIsText2PopupOpen] = useState(false)
  const [isText3PopupOpen, setIsText3PopupOpen] = useState(false)
  const [tempText, setTempText] = useState("")
  const [currentText, setCurrentText] = useState("")
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

  const handleText2Click = () => {
    setCurrentText("text2")
    setIsText2PopupOpen(true)
    setTempText(text2)
  }

  const handleText3Click = () => {
    setCurrentText("text3")
    setIsText3PopupOpen(true)
    setTempText(text3)
  }

  const handleTextChange = (event) => {
    setTempText(event.target.value)
  }

  const handleDoneClick = () => {
    if (currentText === "text2") {
      setText2(tempText)
      setIsText2PopupOpen(false)
    } else if (currentText === "text3") {
      setText3(tempText)
      setIsText3PopupOpen(false)
    }
  }

  const drawCanvas = () => {
    const canvas = canvasRef.current
    if (!canvas || !selectedImage) return

    const ctx = canvas.getContext("2d")
    const image = new Image()
    image.src = selectedImage

    image.onload = () => {
      canvas.width = image.width
      canvas.height = image.height

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      ctx.drawImage(image, 0, 0)

      ctx.textAlign = "left"
      ctx.textBaseline = "middle"

      const textHeight = 80
      const totalTextHeight = textHeight * 3
      let currentY = canvas.height - totalTextHeight

      ctx.fillStyle = "white"
      ctx.fillRect(0, currentY, canvas.width, textHeight)
      ctx.fillStyle = "#a23344"
      ctx.font = "bold 60px Arial"
      ctx.fillText("Breaking news", 10, currentY + textHeight / 2)
      currentY += textHeight

      ctx.fillStyle = "#821420"
      ctx.fillRect(0, currentY, canvas.width, textHeight)
      ctx.fillStyle = "white"
      ctx.font = "bold 48px Arial"
      ctx.fillText(text2, 10, currentY + textHeight / 2)
      currentY += textHeight

      ctx.fillStyle = "#821420"
      ctx.fillRect(0, currentY, canvas.width, textHeight)
      ctx.fillStyle = "white"
      ctx.font = "48px Arial"
      ctx.fillText(text3, 10, currentY + textHeight / 2)
    }
  }

  useEffect(() => {
    drawCanvas()
  }, [selectedImage, text2, text3])

  const downloadImage = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const dataURL = canvas.toDataURL("image/png")
      const link = document.createElement("a")
      link.href = dataURL
      link.download = "template5.png"
      link.click()
    }
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center p-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-4"
        id="file-upload-template5"
        style={{ display: "none" }}
      />
      <label
        htmlFor="file-upload-template5"
        className="cursor-pointer rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
      >
        Browse
      </label>

      {selectedImage && (
        <div className="relative flex items-center justify-center">
          <canvas ref={canvasRef} className="rounded shadow-md" />{" "}
          <button
            onClick={downloadImage}
            className="mt-4 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
          >
            Download
          </button>
        </div>
      )}

      {(isText2PopupOpen || isText3PopupOpen) && (
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

export default Template3
