import { useState, useEffect } from "react";
import "./css/App.css";
import Data from "./data/Data";
import MovieSelect from "./components/MovieSelect";
import Screen from "./components/Screen";
import Seats from "./components/Seats";
import Total from "./components/Total";
import Payment from "./components/Payment";

const movies = [
  { title: "Parasite", price: "10", id: 0 },
  { title: "God Father", price: "11", id: 1 },
  { title: "Titanic", price: "8", id: 2 },
  { title: "Shawshank redemption", price: "7", id: 3 },
];

function App() {
  // default setting
  const [selectedSeats, setSelectedSeats] = useState(0);
  const [selectedSeatsArr, setSelectedSeatsArr] = useState([]);
  const [showPayment, setShowPayment] = useState(false);

  console.log(selectedSeats);

  // movie selection
  const [movie, setMovie] = useState(() => {
    const savedMovie = localStorage.getItem("movie");
    if (savedMovie) {
      return JSON.parse(savedMovie);
    } else {
      return { title: "Parasite", price: "10", id: 0 };
    }
  });

  // seat selection
  const [seats, setSeats] = useState(() => {
    const savedSeats = localStorage.getItem("seats");
    if (savedSeats) {
      return JSON.parse(savedSeats);
    } else {
      return Data;
    }
  });

  // seat toggle functionality
  const toggleAvailability = (id) => {
    const updatedSeats = seats.map((seat) =>
      seat.id === id ? { ...seat, available: !seat.available } : seat
    );
    setSeats(updatedSeats);
  };
  // total price for total section
  const total = selectedSeats * parseInt(movie.price);

  useEffect(() => {
    //needs to fix this part later
    const updatedSeats = seats.filter(
      (seat) => seat.available === false && seat.occupied !== true
    );
    setSelectedSeats(updatedSeats.length);
    const seatNumbers = updatedSeats.map((seat) => seat.seatNum);
    setSelectedSeatsArr(seatNumbers);
    localStorage.setItem("seats", JSON.stringify(seats));
  }, [seats]);

  useEffect(() => {
    localStorage.setItem("movie", JSON.stringify(movie));
  }, [movie]);

  return (
    <div>
      {showPayment && selectedSeatsArr.length && (
        <Payment
          className="root"
          selectedSeatsArr={selectedSeatsArr}
          movie={movie}
          setMovie={setMovie}
          total={total}
          setShowPayment={setShowPayment}
          seats={seats}
          setSeats={setSeats}
        />
      )}
      {!showPayment && (
        <>
          <h1>Movie Booking 🍿</h1>
          <MovieSelect movies={movies} movie={movie} setMovie={setMovie} />
          <div className="container">
            <Screen />
            <Seats seats={seats} toggleAvailability={toggleAvailability} />
          </div>
          <Total selectedSeats={selectedSeats} movie={movie} />

          <button onClick={() => setShowPayment(true)} className="booking-btn">
            Book Ticket
          </button>
        </>
      )}
    </div>
  );
}

export default App;
