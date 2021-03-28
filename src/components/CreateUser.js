import React, { Component } from 'react'


function CreateUser() {
    return (
        <div>
          <h3>Create User</h3>
          <form onSubmit={handleSubmit}>
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
              <label>User type: </label>
              <input
                type="text"
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

export default CreateUser;