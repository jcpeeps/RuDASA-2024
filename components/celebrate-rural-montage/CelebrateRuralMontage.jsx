import React, { useEffect, useRef, useState } from 'react';

export default function CelebrateRuralMontage({images}) {
  const masonryContainer = useRef(null);
  const [direction, setDirection] = useState(1);
  const [scrollInterval, setScrollInterval] = useState(null);
  const [loadedImages, setLoadedImages] = useState(0);
  let scrollAmount = 0;
  const handleImageLoad = () => {
    setLoadedImages((prev) => prev + 1);
  };

  useEffect(() => {
    const layout = () => {
      if (window.Masonry) {
        let msnry = new window.Masonry('.grid', {
          itemSelector: '.grid-item',
          percentPosition: true
        });
        msnry.layout();
      }
    };
    if (loadedImages === images.length) {
      layout();
    }
  }, [loadedImages, images.length]);
  useEffect(() => {
    const script = document.createElement('script'); 
    script.src = "https://cdn.jsdelivr.net/npm/masonry-layout@4.2.2/dist/masonry.pkgd.js";
    script.integrity="sha384-7rsdVWBJgA5/RZtXMgWLTVn8vzMZt9Qtg4nUqJAGsEBihA3mBrcOn5WwKRITJxDQ";
    script.async = true;
    script.crossOrigin = "anonymous";
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

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

    <div id="CelebrateRuralWrapper" className="container py-2 py-lg-3">
        <h1 className="px-3 display-4 fw-bold mb-5">Celebrate Rural Montage</h1>
      <div className="grid" id="masonry-container" ref={masonryContainer}>
        {images.map((image, index) => {
          return (
            <img
              src={image}
              alt="First slide"
              key={index}
              className="masonry-image px-1 grid-item"
              onLoad={handleImageLoad}/>
          );
        })}
      </div>
    </div>
  );

}