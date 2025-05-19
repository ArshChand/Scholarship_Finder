import React, { useRef, useEffect } from 'react';
import './slider.css';

import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.jpg';

const images = [
  { src: img2, type: 'FLOWER' },
  { src: img1, type: 'NATURE' },
  { src: img3, type: 'PLANT' },
  { src: img4, type: 'NATURE' },
];

function Home() {
  const sliderRef = useRef(null);
  const listRef = useRef(null);
  const thumbnailRef = useRef(null);

  useEffect(() => {
    const thumbnails = thumbnailRef.current.querySelectorAll('.item');
    if (thumbnails.length) {
      thumbnailRef.current.appendChild(thumbnails[0]);
    }

    const interval = setInterval(() => {
      moveSlider('next');
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const moveSlider = (direction) => {
    const slider = sliderRef.current;
    const sliderItems = listRef.current.querySelectorAll('.item');
    const thumbnailItems = thumbnailRef.current.querySelectorAll('.item');

    if (direction === 'next') {
      listRef.current.appendChild(sliderItems[0]);
      thumbnailRef.current.appendChild(thumbnailItems[0]);
      slider.classList.add('next');
    } else {
      listRef.current.prepend(sliderItems[sliderItems.length - 1]);
      thumbnailRef.current.prepend(thumbnailItems[thumbnailItems.length - 1]);
      slider.classList.add('prev');
    }

    slider.addEventListener(
      'animationend',
      () => {
        slider.classList.remove(direction);
      },
      { once: true }
    );
  };

  return (
    <div className="slider" ref={sliderRef}>
      <div className="list" ref={listRef}>
        {images.map((img, index) => (
          <div className="item" key={index}>
            <img src={img.src} alt={`slide-${index}`} />
            <div className="content">
              <div className="title">MAGIC SLIDER</div>
              <div className="type">{img.type}</div>
              <div className="description">
                Discover the best scholarships around the world for your future education!
              </div>
              <div className="button">
                <button>SEE MORE</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="thumbnail" ref={thumbnailRef}>
        {images.map((img, index) => (
          <div className="item" key={`thumb-${index}`}>
            <img src={img.src} alt={`thumb-${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
