import React, { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

const GolfBookingList: FC = () => {
  const golfBookingsFromStore = useSelector(
    (state: RootState) => state.booking.bookings
  );

  return (
    <div className="booking-history mt-4">
      <h2 className="text-black">Booking History</h2>
      <table className="table table-dark table-striped mt-2">
        <thead>
          <tr>
            <th>#</th>
            <th>Golfer ID</th>
            <th>Course</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {golfBookingsFromStore.map((booking, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{booking.golferId}</td>
              <td>{booking.course}</td>
              <td>{booking.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GolfBookingList;
