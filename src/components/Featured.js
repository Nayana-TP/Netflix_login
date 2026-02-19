import React, { useState, useEffect } from 'react';
import './Featured.css';
import { getImageUrl } from '../services/tmdb';

const Featured = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (movies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [movies]);

  if (movies.length === 0) return null;

  const featuredMovie = movies[currentIndex];

  return (
    <div className="featured">
      <div 
        className="featured-background"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(20,20,20,0.4) 50%, rgba(20,20,20,1) 100%), url(${getImageUrl(featuredMovie.backdrop_path, 'original')})`
        }}
      >
        <div className="featured-content">
          <h1 className="featured-title">{featuredMovie.title}</h1>
          <div className="featured-info">
            <span className="featured-year">
              {new Date(featuredMovie.release_date).getFullYear()}
            </span>
            <span className="featured-rating">
              <span className="star">★</span> {featuredMovie.vote_average.toFixed(1)}
            </span>
          </div>
          <p className="featured-description">
            {featuredMovie.overview}
          </p>
          <div className="featured-buttons">
            <button className="play-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z"/>
              </svg>
              Play
            </button>
            <button className="info-btn">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
                <line x1="12" y1="16" x2="12" y2="12" stroke="currentColor" strokeWidth="2"/>
                <line x1="12" y1="8" x2="12.01" y2="8" stroke="currentColor" strokeWidth="2"/>
              </svg>
              More Info
            </button>
          </div>
        </div>
      </div>
      <div className="featured-indicators">
        {movies.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default Featured;
