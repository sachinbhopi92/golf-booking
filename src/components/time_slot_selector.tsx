import React, { FC } from "react";
import { generateTimeSlots } from "../utils/time_slot";

interface TimeSlotSelectorProps {
  selectedTime: string;
  onSelectTime: (time: string) => void;
  isTimeSlotAvailable: (
    selectedTime: string,
    selectedCourse: string,
    golferIds: string[]
  ) => boolean;
  selectedCourse: string;
  golferIds: string[];
}

const TimeSlotSelector: FC<TimeSlotSelectorProps> = ({
  selectedTime,
  onSelectTime,
  isTimeSlotAvailable,
  selectedCourse,
  golferIds,
}) => {
  const availableSlots = generateTimeSlots();
  return (
    <div className="time-slot-selector">
      <h5>Select a Time Slot:</h5>
      <div className="d-flex flex-wrap">
        {availableSlots.map((slot) => {
          const isSelected = selectedTime === slot;
          const isAvailable = isTimeSlotAvailable(
            slot,
            selectedCourse,
            golferIds
          );
          return (
            <div
              key={slot}
              className={`btn m-2 ${
                isAvailable
                  ? isSelected
                    ? "btn-primary"
                    : "btn-outline-primary"
                  : "btn-outline-danger"
              }`}
              onClick={() => isAvailable && onSelectTime(slot)}
              data-bs-toggle={!isAvailable ? "tooltip" : ""}
              data-bs-placement="top"
              title={
                !isAvailable
                  ? "You can't book this time slot. Please select a slot at least 5 hours apart."
                  : ""
              }
            >
              {slot}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TimeSlotSelector;
