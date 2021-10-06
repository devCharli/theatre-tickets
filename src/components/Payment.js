import { MdClose } from "react-icons/md";
import { useState } from "react";
const Payment = ({
  selectedSeatsNum,
  total,
  movie,
  setMovie,
  setBooking,
  seats,
  setSeats,
}) => {
  const [name, setName] = useState("");
  const [card, setCard] = useState("");
  const [date, setDate] = useState("");

  const confirmSeat = () => {
    if (name === "" && card === "" && date === "") {
      alert("Enter card information");
    } else {
      const updatedSeats = seats.map((seat) =>
        seat.available === false ? { ...seat, occupied: true } : seat
      );
      setSeats(updatedSeats);
      setMovie({ title: "Parasite", price: "10", id: 0 });
      setBooking(false);
    }
  };

  return selectedSeatsNum ? (
    <div className="payment">
      <div className="movie-info">
        <h3>Movie information</h3>
        <p>
          Title:
          <br /> <span>{movie.title}</span>
        </p>
        <p>
          Seat Number:
          {selectedSeatsNum.map((seat) => {
            return <span key={seat}>&nbsp; {seat.toUpperCase()}&nbsp; </span>;
          })}
        </p>
        <p>Total: ${total}</p>
      </div>
      <div className="card-info">
        <h3>Payment</h3>
        <label>Name on Card</label>
        <input type="text" onChange={(e) => setName(e.target.value)} required />
        <label>Card Number</label>
        <input
          type="number"
          onChange={(e) => setCard(e.target.value)}
          required
        />
        <label>Expiration Date</label>
        <input type="date" onChange={(e) => setDate(e.target.value)} required />

        <button className="booking-btn payment-btn" onClick={confirmSeat}>
          Pay ${total}
        </button>
      </div>
      <MdClose
        className="payment-close-btn"
        onClick={() => {
          setBooking(false);
        }}
      />
    </div>
  ) : (
    <div>No seats taken</div>
  );
};

export default Payment;
