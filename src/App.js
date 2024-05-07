import "./App.css";
import Phase1 from "./pages/phase1";
import Phase2 from "./pages/phase2";
import Database1 from "./pages/database1";
import Database2 from "./pages/database2";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import app from "./firebaseConfig";
import { getDatabase, ref, onValue, get } from "firebase/database";
import React, { useState, useEffect } from "react";

function App() {


  return (
    <div className="container">
      <Router>
        <div className="App">
          <Switch>
            <Route path="/phase1" component={Phase1} />
            <Route path="/phase2" component={Phase2} />
            <Route path="/database1" component={Database1} />
            <Route path="/database2" component={Database2} />
            <Redirect from="/" to="/phase1" />
          </Switch>
        </div>
      </Router>
    </div>
  );
}
export default App;
