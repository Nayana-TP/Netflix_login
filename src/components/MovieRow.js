import React, { useRef, useState } from 'react';
import './MovieRow.css';
import { getImageUrl } from '../services/tmdb';

const MovieRow = ({ title, movies }) => {
  const [isMoved, setIsMoved] = useState(false);
  const rowRef = useRef(null);

  const handleClick = (direction) => {
    setIsMoved(true);
    const { scrollLeft } = rowRef.current;
    const scrollTo = direction === 'left' 
      ? scrollLeft - rowRef.current.clientWidth * 0.8
      : scrollLeft + rowRef.current.clientWidth * 0.8;
    
    rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
  };

  if (!movies || movies.length === 0) return null;

  return (
    <div className="movie-row">
      <h2 className="row-title">{title}</h2>
      <div className="row-container">
        <button 
          className={`slider-arrow left ${!isMoved && 'hidden'}`}
          onClick={() => handleClick('left')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>
        
        <div className="row-posters" ref={rowRef}>
          {movies.map((movie) => (
            <div key={movie.id} className="movie-poster">
              <img
                src={getImageUrl(movie.poster_path, 'w300')}
                alt={movie.title}
                className="poster-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x450/333/fff?text=No+Image';
                }}
              />
              <div className="movie-overlay">
                <h3 className="movie-title">{movie.title}</h3>
                <div className="movie-info">
                  <span className="movie-rating">
                    <span className="star">★</span> {movie.vote_average.toFixed(1)}
                  </span>
                  <span className="movie-year">
                    {new Date(movie.release_date).getFullYear()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button 
          className="slider-arrow right"
          onClick={() => handleClick('right')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MovieRow;
