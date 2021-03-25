import React from "react"; 
import Navbar from './components/Navbar';


// temporary home page
// need to figure out loggin in 
function Home() {
  return(
    <div>
      <Navbar></Navbar>

      <h1>temporary homepage</h1>

      {/* add link to other pages here for now  */}
      <a href="/ticket">ticket</a>
      <br/>
      <a href="/enclosure">enclosure</a>
      <br/>


    </div>
    
  ); 
}

export default Home; 