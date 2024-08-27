import React, { useState } from "react"
import { MdCloudUpload } from "react-icons/md"

const UpdateCustomImage = ({ onImageSelect }) => {
  const [selectedImage, setSelectedImage] = useState(null)

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result
        setSelectedImage(result)
        if (onImageSelect) {
          onImageSelect(result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="items-left mb-6 mt-4 flex items-center gap-2">
      {selectedImage ? (
        <div className="relative">
          <img
            src={selectedImage}
            alt="Uploaded"
            className="h-20 w-20 rounded-md border-4 border-gray-300 object-cover"
          />
        </div>
      ) : (
        <label className="flex w-max cursor-pointer  rounded-md">
          {/* <span className="w-full text-white">Click to upload an image</span> */}
          <div>
            {/* <div className="mb-6 rounded-lg border-2 border-dashed border-gray-300 p-6">
              <MdCloudUpload className="text-[60px]" />
            </div> */}
            <div className=" rounded-md bg-[#74b666] px-5 py-1">
              Browse Files
            </div>
          </div>

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
      )}

      <p>OR</p>
    </div>
  )
}

export default UpdateCustomImage
