import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)
  async function loginUser(username,email, password) {
  try {
    const response = await fetch('http://localhost:3000/user/signUp', {
      // This is the line that makes it a POST request
      method: 'POST',

      // This header is required for POST requests with a body
      headers: {
        'Content-Type': 'application/json'
      },

      // This is the data you are sending
      body: JSON.stringify({
        username: username,
        email: email,
        password: password
      })
    });

    const data = await response.json();
    console.log(data);

  } catch (error) {
    console.error('Failed to login:', error);
  }
}

// Example of how you would call the function
loginUser('test','test@example.com', 'Password123!');

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      
    </>
  )
}

export default App
