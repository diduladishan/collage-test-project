import React, { useState, useEffect } from 'react';
import collage1 from '../../assets/collage-01.png';
import collage2 from '../../assets/collage-02.png';
import collage3 from '../../assets/collage-03.png';
import collage4 from '../../assets/collage-04.png';
import collage5 from '../../assets/collage-05.png';
import collage6 from '../../assets/collage-06.png';
import collage7 from '../../assets/collage-07.png';
import collage8 from '../../assets/collage-08.png';
import collage9 from '../../assets/collage-09.png';
import collage10 from '../../assets/collage-10.png';

const Collage = () => {
  const [currentOffset, setCurrentOffset] = useState(0);
  const [imageWidth, setImageWidth] = useState(210); // Default to 210px for larger screens

  // Adjust image width based on screen size
  const updateImageWidth = () => {
    if (window.innerWidth < 640) {
      setImageWidth(90); // 100px for mobile screens
    } else {
      setImageWidth(210); // 210px for larger screens
    }
  };

  useEffect(() => {
    updateImageWidth(); // Set initial width
    window.addEventListener('resize', updateImageWidth); // Update on resize
    return () => window.removeEventListener('resize', updateImageWidth);
  }, []);

  const paginationFactor = imageWidth; // Move by the image width on each click

  const items = [
    { imgSrc: collage1 },
    { imgSrc: collage2 },
    { imgSrc: collage3 },
    { imgSrc: collage4 },
    { imgSrc: collage5 },
    { imgSrc: collage6 },
    { imgSrc: collage7 },
    { imgSrc: collage8 },
    { imgSrc: collage9 },
    { imgSrc: collage10 },
  ];

  const getWindowSize = () => {
    if (window.innerWidth >= 1536) return 5; // 2xl screens
    if (window.innerWidth >= 1280) return 5; // xl screens
    if (window.innerWidth >= 1024) return 4; // lg screens
    if (window.innerWidth >= 768) return 3; // md screens
    return 3; // sm screens and below
  };

  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    const handleResize = () => {
      setWindowSize(getWindowSize());
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const atEndOfList = currentOffset <= (paginationFactor * -1) * (items.length - windowSize);
  const atHeadOfList = currentOffset === 0;

  const moveCarousel = (direction) => {
    if (direction === 1 && !atEndOfList) {
      setCurrentOffset(currentOffset - paginationFactor);
    } else if (direction === -1 && !atHeadOfList) {
      setCurrentOffset(currentOffset + paginationFactor);
    }
  };

  return (
    <div className="flex flex-col items-center mt-10 mb-20 text-gray-600">
      <p className="mb-4 mt-6 text-center text-[16px] text-[#fff] sm:pl-[40px] sm:text-left md:text-[19px] lg:text-[20px] xl:text-[21px] 2xl:text-[22px]">
        Collage Editor
      </p>
      <div className="flex items-center justify-center">
        <button
          className={`w-5 h-5 p-2 box-border border-t-2 border-r-2 transform transition-transform duration-150 ease-linear cursor-pointer ${
            atHeadOfList ? 'opacity-20 border-white' : 'border-white'
          }`}
          onClick={() => moveCarousel(-1)}
          disabled={atHeadOfList}
          style={{ transform: 'rotate(-135deg)' }}
        ></button>

        <div className="overflow-hidden flex justify-center" style={{ width: `${windowSize * imageWidth*1.3}px` }}>
          <div
            className="flex transition-transform duration-150 ease-out"
            style={{ transform: `translateX(${currentOffset}px)` }}
          >
            {items.map((item, index) => (
              <div
                key={index}
                className="cursor-pointer shadow-lg"
                style={{
                  minWidth: `${imageWidth}px`,
                  marginRight: index < items.length - 1 ? '10px' : '0',
                  marginLeft: index === 0 ? '0' : '10px',
                }}
              >
                <img
                  src={item.imgSrc}
                  className="rounded-t-lg transition-opacity duration-150 ease-linear select-none"
                  style={{ width: '100%' }}
                />
              </div>
            ))}
          </div>
        </div>

        <button
          className={`w-5 h-5 p-2 box-border border-t-2 border-r-2 transform transition-transform duration-150 ease-linear cursor-pointer ${
            atEndOfList ? 'opacity-20 border-black' : 'border-white'
          }`}
          onClick={() => moveCarousel(1)}
          disabled={atEndOfList}
          style={{ transform: 'rotate(45deg)' }}
        ></button>
      </div>
    </div>
  );
};

export default Collage;
