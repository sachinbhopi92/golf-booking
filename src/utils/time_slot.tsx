import moment from "moment";
import { FIVE_HOURS_IN_MS } from "../constants/constants";

export const generateTimeSlots = () => {
  const slots = [];
  const startTime = moment.utc("07:00", "HH:mm");
  const endTime = moment.utc("19:00", "HH:mm");

  while (startTime.isBefore(endTime)) {
    slots.push(startTime.format("HH:mm"));
    startTime.add(10, "minutes");
  }

  return slots;
};

export const isTimeSlotAvailable = (
  selectedTime: string,
  bookingsFromStore: Array<any>, // Define the type of booking items if needed
  course: string,
  golferIds: string[]
): boolean => {
  const disabledSlots = new Set<string>();

  // Check for course and golferId conflict in the store bookings
  bookingsFromStore.forEach((booking) => {
    if (booking.course === course || golferIds.includes(booking.golferId)) {
      const bookingTimeInMs = moment.utc(booking.time, "HH:mm").valueOf();
      for (
        let offset = -FIVE_HOURS_IN_MS;
        offset <= FIVE_HOURS_IN_MS;
        offset += 10 * 60 * 1000
      ) {
        disabledSlots.add(moment.utc(bookingTimeInMs + offset).format("HH:mm"));
      }
    }
  });

  return !disabledSlots.has(selectedTime);
};
