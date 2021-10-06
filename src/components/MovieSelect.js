const MovieSelect = ({ movies, movie, setMovie }) => {
  return (
    <div className="movie-container">
      <select
        value={movie.id}
        onChange={(e) => setMovie(movies[e.target.value])}
      >
        {movies.map((item, index) => {
          return (
            <option key={index} value={item.id}>
              {item.title} - ${item.price}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default MovieSelect;
