import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import GolfBookingForm from "./components/golf_booking_form";
import GolfBookingList from "./components/golf_booking_list";
import moment from "moment";
import "./App.scss";

const App: React.FC = () => {
  const todayDate = moment().format("Do MMM YYYY");
  return (
    <Provider store={store}>
      <div className="app-container">
        <h1 className="text-center text-white mt-4">
          Golf Booking System ({todayDate})
        </h1>
        <div className="content-container">
          <GolfBookingForm />
          <GolfBookingList />
        </div>
      </div>
    </Provider>
  );
};

export default App;
