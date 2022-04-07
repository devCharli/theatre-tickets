import SeatInfo from "./SeatInfo";
const Seats = ({ seats, toggleAvailability }) => {
  const newSeats = [...seats];

  const rows = newSeats.reduce(function (rows, key, index) {
    return (
      (index % 8 === 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) &&
      rows
    );
  }, []);

  return (
    <div>
      <SeatInfo />
      <div className="seats">
        {rows.map((row, i) => {
          return (
            <div className="row" key={i}>
              {row.map((seat) => {
                return (
                  <div
                    key={seat.id}
                    className={`seat ${
                      seat.available === false && "selected"
                    } ${seat.occupied && "occupied"}`}
                    onClick={() => toggleAvailability(seat.id)}
                  >
                    {seat.available}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Seats;
