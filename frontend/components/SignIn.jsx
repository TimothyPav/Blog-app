import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
    event.preventDefault();
    
    const payload = {
        login: email, // assuming you have a state variable 'email'
        password: password, // assuming you have a state variable 'password'
      };

      console.log(email)
      console.log(password)
      try {
        const response = await fetch('http://localhost:3000/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const data = await response.json(); // or 'await response.text();' if your server sends a plain text response
        // Handle success - perhaps saving the received token to localStorage/sessionStorage and redirecting the user
        console.log(data);
      } catch (error) {
        // Handle errors - such as displaying a message to the user
        console.error('There was a problem with the fetch operation:', error);
      }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white bg-opacity-50 shadow-md rounded px-12 pt-8 pb-8 mb-4 w-full max-w-2xl">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email or username">
            Email or Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email or username"
            type="email or username"
            placeholder="Email or Username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-green-400 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
          <button
            className="inline-block align-baseline font-bold text-sm text-green-400 hover:text-green-600"
            type="button"
            onClick={() => navigate('/CreateAccount')}
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  );
}