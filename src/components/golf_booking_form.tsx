// GolfBookingForm.tsx
import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { addBooking } from "../store/reducer";
import GolfCourseSelector from "./golf_course_selector";
import TimeSlotSelector from "./time_slot_selector";
import { isTimeSlotAvailable } from "../utils/time_slot";
import "./golf_booking_style.scss";

const GolfBookingForm: FC = () => {
  const dispatch = useDispatch();
  const bookingsFromStore = useSelector(
    (state: RootState) => state.booking.bookings
  );

  const [golferIds, setGolferIds] = useState(["", "", "", ""]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<"success" | "danger" | "">("");
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
  }, [alertMessage, showAlert]);

  const handleCourseChange = (course: string) => {
    setSelectedCourse(course);
    setSelectedTime("");
  };

  const handleGolferIdChange = (index: number, value: string) => {
    const newGolferIds = [...golferIds];
    newGolferIds[index] = value;
    setGolferIds(newGolferIds);
  };

  const clearForm = () => {
    setGolferIds(["", "", "", ""]);
    setSelectedCourse("");
    setSelectedTime("");
  };

  const handleSubmit = () => {
    const uniqueGolferIds = new Set(golferIds);

    if (uniqueGolferIds.size !== golferIds.length) {
      setAlertMessage("Golfer IDs must be unique.");
      setAlertType("danger");
      setShowAlert(true);
      return;
    }

    if (
      !selectedCourse ||
      !selectedTime ||
      !isTimeSlotAvailable(
        selectedTime,
        bookingsFromStore,
        selectedCourse,
        golferIds
      )
    ) {
      setAlertMessage("Invalid booking! Please follow the 5-hour rule.");
      setAlertType("danger");
      setShowAlert(true);
      return;
    }

    golferIds.forEach((golferId) => {
      dispatch(
        addBooking({ golferId, course: selectedCourse, time: selectedTime })
      );
    });

    setAlertMessage("Booking confirmed!");
    setAlertType("success");
    setShowAlert(true);

    clearForm();
  };

  return (
    <div className="golf-booking">
      {showAlert && (
        <div className={`alert alert-${alertType}`} role="alert">
          {alertMessage}
        </div>
      )}
      <label htmlFor="golferId" className="form-label">
        Enter Golfer IDs (e.g. 123, 4, 5, 66):
      </label>
      <div className="golfer-ids-container">
        {golferIds.map((golferId, index) => (
          <input
            key={index}
            type="number"
            className="form-control my-3"
            placeholder={`Golfer ${index + 1} ID`}
            value={golferId}
            onChange={(e) => handleGolferIdChange(index, e.target.value)}
            style={{ flex: 1 }}
          />
        ))}
      </div>
      <GolfCourseSelector
        selectedCourse={selectedCourse}
        onSelectCourse={handleCourseChange}
      />
      {selectedCourse && (
        <TimeSlotSelector
          selectedTime={selectedTime}
          onSelectTime={setSelectedTime}
          isTimeSlotAvailable={(time) =>
            isTimeSlotAvailable(
              time,
              bookingsFromStore,
              selectedCourse,
              golferIds
            )
          }
          selectedCourse={selectedCourse}
          golferIds={golferIds}
        />
      )}
      <button
        onClick={handleSubmit}
        className="btn btn-primary mt-3"
        disabled={
          !golferIds.every((id) => id) || !selectedCourse || !selectedTime
        }
      >
        Confirm Booking
      </button>
    </div>
  );
};

export default GolfBookingForm;
