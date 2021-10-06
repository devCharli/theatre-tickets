const Total = ({ selectedSeats, movie }) => {
  const total = selectedSeats * parseInt(movie.price);
  return (
    <div>
      <p className="text">
        You have selected <span>{selectedSeats}</span> seats for{" "}
        <span>{movie.title}</span>
        <br />
        Total: <span>${total}</span>
      </p>
    </div>
  );
};

export default Total;
