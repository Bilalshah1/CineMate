import React, { useState } from 'react';
import bg_party from '../assets/bg_party.jpg';
console.log('SVG URL:', bg_party

);

function Login() {
  return (
    <div>
      <div className="login-container">
        <h2>Sign In</h2>
        <form>
          <div>
            <div>
              <label htmlFor="username">Username</label>
            </div>
            <div>
              <input type="text" id="username" name="username" required />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="password">Password</label>
            </div>
            <div>
              <input type="password" id="password" name="password" required />
            </div>
          </div>
          <div>
            <label>
              <input type="checkbox" name="rememberMe" />
              Remember Me
            </label>
          </div>
          <button type="submit">Sign In</button>
          <a className='ml-5' href="#">Forgot Password</a>
        </form>
      </div>
      <div
        className="signUp flex flex-col items-center justify-center bg-cover bg-center min-h-[400px] w-full bg-no-repeat"
        style={{ backgroundImage: `url(${bg_party
        
        })` }}
      >
        <h1 className="text-center">Welcome to CineMate.</h1>
        <h2 className="text-center">Don't have an account?</h2>
        <button type="button">Sign Up</button>
      </div>

      </div>
  );
}
export default Login;