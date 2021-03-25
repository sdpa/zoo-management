import EnclosureList from "./components/EnclosureList";
import logo from './logo.svg';
import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Ticket from "./ticket/Ticket"; 
import './App.css';

function App() {
  return (
    <div className="App">

      <EnclosureList></EnclosureList>


      {/* <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/ticket" component={Ticket}/>
        </Switch>
      </BrowserRouter> */}
    </div>

  );
}

export default App;
