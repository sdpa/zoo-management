import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Ticket from "./components/Ticket"; 
import EnclosureList from "./components/EnclosureList";


// NEED TO "npm install" @material-ui dependencies 
// npm install @material-ui/core
// there may be other material uis too 
function App() {
  return (
    <div className="App">


      {/* add your pages here  */}
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/ticket" component={Ticket}/>
          <Route exact path="/enclosure" component={EnclosureList}/>
        </Switch>
      </BrowserRouter>
    </div>

  );
}

export default App;
