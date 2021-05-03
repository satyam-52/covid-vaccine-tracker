// eslint-disable-next-line
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PINTracker from "./Components/PINTracker";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import PINTrackerWeekly from "./Components/PINTrackerWeekly";
import DistrictTracker from "./Components/DistrictTracker";
import DistrictTrackerWeekly from "./Components/DistrictTrackerWeekly";
import EmailAutomation from "./Components/EmailAutomation";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <NavBar />
      <Switch>
        <Route path="/covid-vaccine-tracker/pin-tracker">
          <PINTracker />
        </Route>
        <Route path="/covid-vaccine-tracker/district-tracker">
          <DistrictTracker />
        </Route>
        <Route path="/covid-vaccine-tracker/pin-tracker-weekly">
          <PINTrackerWeekly />
        </Route>
        <Route path="/covid-vaccine-tracker/district-tracker-weekly">
          <DistrictTrackerWeekly />
        </Route>
        <Route path="/covid-vaccine-tracker/automated-email">
          <EmailAutomation />
        </Route>
        <Route path="/covid-vaccine-tracker/">
          <App />
        </Route>
        
        <Route path="/">
          <App />
        </Route>
      </Switch>
      <Footer />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
