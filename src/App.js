import { useState, useEffect } from "react";
import MovieSelect from "./components/MovieSelect";
import Screen from "./components/Screen";
import Seats from "./components/Seats";
import Total from "./components/Total";
import Data from "./data/Data";
import Payment from "./components/Payment";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([
    { title: "Parasite", price: "10", id: 0 },
    { title: "God Father", price: "11", id: 1 },
    { title: "Titanic", price: "8", id: 2 },
    { title: "Shawshank redemption", price: "7", id: 3 },
  ]);

  const [selectedSeats, setSelectedSeats] = useState(0);
  const [selectedSeatsNum, setSelectedSeatsNum] = useState([]);
  const [booking, setBooking] = useState(false);

  const [movie, setMovie] = useState(() => {
    const savedMovie = localStorage.getItem("movie");
    if (savedMovie) {
      return JSON.parse(savedMovie);
    } else {
      return { title: "Parasite", price: "10", id: 0 };
    }
  });

  const [seats, setSeats] = useState(() => {
    const savedSeats = localStorage.getItem("seats");
    if (savedSeats) {
      return JSON.parse(savedSeats);
    } else {
      return Data;
    }
  });

  const toggleAvailability = (id) => {
    const updatedSeats = seats.map((seat) =>
      seat.id === id ? { ...seat, available: !seat.available } : seat
    );
    setSeats(updatedSeats);
  };

  const total = selectedSeats * parseInt(movie.price);

  useEffect(() => {
    //needs to fix this part later
    const updatedSeats = seats.filter(
      (seat) => seat.available === false && seat.occupied !== true
    );
    setSelectedSeats(updatedSeats.length);
    const seatNumbers = updatedSeats.map((seat) => seat.seatNum);
    setSelectedSeatsNum(seatNumbers);
    localStorage.setItem("seats", JSON.stringify(seats));
  }, [seats]);

  useEffect(() => {
    localStorage.setItem("movie", JSON.stringify(movie));
  }, [movie]);

  return (
    <div>
      {booking === false ? (
        <>
          <h1>Movie Booking</h1>
          <MovieSelect movies={movies} movie={movie} setMovie={setMovie} />
          <div className="container">
            <Screen />
            <Seats seats={seats} toggleAvailability={toggleAvailability} />
          </div>
          <Total selectedSeats={selectedSeats} movie={movie} />

          <button onClick={() => setBooking(true)} className="booking-btn">
            Book Ticket
          </button>
        </>
      ) : (
        <Payment
          className="root"
          selectedSeatsNum={selectedSeatsNum}
          movie={movie}
          setMovie={setMovie}
          total={total}
          setBooking={setBooking}
          seats={seats}
          setSeats={setSeats}
        />
      )}
    </div>
  );
}

export default App;
