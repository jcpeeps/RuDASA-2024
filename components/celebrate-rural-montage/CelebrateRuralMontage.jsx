import React, { useEffect, useRef, useState } from 'react';
import Script from 'next/script';
export default function CelebrateRuralMontage({images}) {
  const masonryContainer = useRef(null);
  const [direction, setDirection] = useState(1);
  const [scrollInterval, setScrollInterval] = useState(null);
  const [loadedImages, setLoadedImages] = useState(0);
  const [msnry, setMsnry] = useState(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  let scrollAmount = 0;
  const handleImageLoad = () => {
    setLoadedImages((prev) => prev + 1);
  };

  useEffect(() => {
    if (window.Masonry) {
      if (!msnry) {
        console.log('init masonry');
        setMsnry(new window.Masonry('.grid', {
          itemSelector: '.grid-item',
          percentPosition: true,
          columnWidth: 200,
          gutter: 10,
        }));
      }
      else {
        console.log('masonry state loaded');
      }
    }
    else {
      console.log('masonry script not loaded');
    }
    if (msnry) {
      console.log('layout');
      msnry.layout();
      if (loadedImages === images.length) {
        console.log('images loaded');
        setLoadedImages(0);
      } 
    }
    else {
      console.log('masonry state not loaded');
    }
  }, [loadedImages, images.length]);

  useEffect(() => {
    const autoScroll = () => {
      if (masonryContainer?.current) {
        if (direction === 0) {
          masonryContainer.current.scrollTop = 0;
        }
        scrollAmount = masonryContainer.current.scrollTop;
        if (scrollAmount === 0) {
          setDirection(1);
        }
        if (scrollAmount >= masonryContainer.current.scrollHeight - masonryContainer.current.clientHeight) {
          setDirection(-1);
        }
        masonryContainer.current.scrollTop = masonryContainer.current.scrollTop + direction;
      }
    }
    if (scrollInterval) {
      clearInterval(scrollInterval);
    }
    setScrollInterval(setInterval(autoScroll, 50));
  }, [direction]);
  return (
    <>
    <Script
      src="https://cdn.jsdelivr.net/npm/masonry-layout@4.2.2/dist/masonry.pkgd.js"
      integrity="sha384-7rsdVWBJgA5/RZtXMgWLTVn8vzMZt9Qtg4nUqJAGsEBihA3mBrcOn5WwKRITJxDQ"
      crossOrigin="anonymous"
      onLoad={() => {
        setScriptLoaded(true);
      }}
    />
    <div id="CelebrateRuralWrapper" className="container py-2 py-lg-3">
      <h1 className="px-3 display-4 fw-bold mb-5">Celebrate Rural Montage</h1>
      <div id="scroll-container" ref={masonryContainer}>
        <div className="grid" id="masonry-container">
          {scriptLoaded && images.map((image, index) => {
            return (
              <img
                src={image}
                key={index}
                className="masonry-image grid-item"
                onLoad={handleImageLoad}/>
            );
          })}
        </div>
      </div>
    </div>
    </>
  );

}