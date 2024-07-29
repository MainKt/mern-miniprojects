import { useState } from 'react';

export default function Auth({ onAuth }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(true);
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = (isSignup ? '/api/auth/signup' : '/api/auth/login');

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
      .then(response => {
        if (response.status == 401) {
          setErrorMessage("Invalid Credentials")
          throw new Error('Unauthorized');
        }
        if (response.status == 500) {
          setErrorMessage("Internal Server Error")
          throw new Error("Internal Server Error");
        }
        return response.json()
      })
      .then(data => {
        localStorage.setItem('token', data.token);
        onAuth()
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <article>
      <header>
        <h1>{isSignup ? 'Sign Up' : 'Log In'}</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          id="username"
          value={username}
          placeholder='Username'
          onChange={(e) => setUsername(e.target.value)}
          aria-invalid={errorMessage ? 'true' : ''}
          required
        />

        <input
          type="password"
          id="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={errorMessage ? 'true' : ''}
          required
        />
        {errorMessage.length != 0 &&
          <small id='invalid-helper'>
            {errorMessage}
          </small>
        }

        <button type="submit">{isSignup ? 'Sign Up' : 'Log In'}</button>
        <p>
          {isSignup ? 'Have an account? ' : "Don't have an account? "}
          <a onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? 'Log In' : 'Sign Up'}
          </a>
        </p>
      </form>
    </article>
  );
}
