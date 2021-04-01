import React, { Component } from 'react'

import Navbar from './Navbar';

function CreateUser() {
    return (
        <div>
          
          <Navbar/>

          <h3>Create User</h3>
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
      // Only customers should be able to create their own accounts
      // We have to make employee accounts beforehand, they should end with "@zoo-staff" to signify they're an employee so we know which table to check in db with our queries

}

export default CreateUser;