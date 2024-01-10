import React from "react";

const MovieCard = ({ movie }) => {
    return (
      <div className="movie">
        <div>
          <h3>{movie.Title}</h3>
          <span>{movie.Year}</span>
        </div>
        <div>
          <img src={movie.Poster} alt={movie.Title} />
        </div>
      </div>
    );
  };

export default MovieCard;

            