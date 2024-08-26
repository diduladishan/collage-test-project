import React, { useState } from "react";

const UpdateCustomImage = ({ onImageSelect }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        setSelectedImage(result);
        if (onImageSelect) {
            onImageSelect(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-left mt-4">
      {selectedImage ? (
        <div className="relative">
          <img
            src={selectedImage}
            alt="Uploaded"
            className="w-20 h-20 object-cover rounded-md border-4 border-gray-300"
          />
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center border-4 border-dashed border-gray-300 rounded-md w-20 h-20 cursor-pointer">
          <span className="text-gray-500">Click to upload an image</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
      )}
    </div>
  );
};

export default UpdateCustomImage;
