import React, { useState, useRef } from "react"

const Template5 = () => {
  const [selectedImage, setSelectedImage] = useState(null)
  const [text1, setText1] = useState("Larger Text Here")
  const [text2, setText2] = useState("Smaller Text Here")
  const [isText1PopupOpen, setIsText1PopupOpen] = useState(false)
  const [isText2PopupOpen, setIsText2PopupOpen] = useState(false)
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

  const handleText1Click = () => {
    setCurrentText("text1")
    setIsText1PopupOpen(true)
    setTempText(text1)
  }

  const handleText2Click = () => {
    setCurrentText("text2")
    setIsText2PopupOpen(true)
    setTempText(text2)
  }

  const handleTextChange = (event) => {
    setTempText(event.target.value)
  }

  const handleDoneClick = () => {
    if (currentText === "text1") {
      setText1(tempText)
      setIsText1PopupOpen(false)
    } else if (currentText === "text2") {
      setText2(tempText)
      setIsText2PopupOpen(false)
    }
  }

  const downloadImage = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    const image = new Image()
    image.src = selectedImage
    image.onload = () => {
      canvas.width = image.width
      canvas.height = image.height

      ctx.drawImage(image, 0, 0)

      ctx.fillStyle = "white"
      ctx.font = "bold 30px Arial"
      ctx.textAlign = "center"
      ctx.fillText(text1, canvas.width / 2, 50)

      ctx.font = "bold 20px Arial"
      ctx.fillText(text2, canvas.width / 2, canvas.height - 30)

      const dataURL = canvas.toDataURL("image/png")
      const link = document.createElement("a")
      link.href = dataURL
      link.download = "template4.png"
      link.click()
    }
  }

  return (
    <div className="flex h-screen">
      <div className="flex w-1/2 items-center justify-center border-r border-gray-300 p-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="mb-4"
          id="file-upload-template4"
          style={{ display: "none" }}
        />
        <label
          htmlFor="file-upload-template4"
          className="cursor-pointer rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Browse
        </label>

        {selectedImage && (
          <div className="relative h-full max-h-80 w-full max-w-md overflow-hidden">
            <img
              src={selectedImage}
              alt="Uploaded"
              className="h-full w-full rounded object-cover shadow-md grayscale filter"
            />
          </div>
        )}
      </div>

      <div className="flex w-1/2 flex-col items-center justify-center p-4">
        <div className="flex h-full w-full flex-col items-center justify-center">
          <div
            className="mb-4 cursor-pointer text-2xl font-bold"
            onClick={handleText1Click}
          >
            {text1}
          </div>
          <div className="cursor-pointer text-base" onClick={handleText2Click}>
            {text2}
          </div>
        </div>
      </div>

      {selectedImage && (
        <button
          onClick={downloadImage}
          className="absolute bottom-4 right-4 rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
        >
          Download
        </button>
      )}

      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

      {(isText1PopupOpen || isText2PopupOpen) && (
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

export default Template5
