import React from "react";
import "./App.css";
import Auth from "./auth/Auth";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
      <Switch>
        <Route path="/home">
          <p>hi</p>
        </Route>
        <Route path="/">
          <Auth />
        </Route>
      </Switch>
      
        
      </div>
    </Router>
  );
}

export default App;
