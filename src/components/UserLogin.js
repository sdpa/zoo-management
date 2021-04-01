import React, { useState } from "react";

import Navbar from './Navbar';

function UserLogin() {

  return (
    <div>
      <Navbar/>
      
      <h3>Log In</h3>
      <form>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            required
            className="form-control"
          ></input>
        </div>
        <div className="form-group">
          <label>Password: </label>
          <input
            type="password"
            required
            className="form-control"
          ></input>
        </div>
        <div className="form-group">
          <input type="submit" value="Login" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
}

export default UserLogin;