// Importing the necessary modules
import '../../assets/styles/LoginPage.css';
import { useState, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const LoginPage = () => {
  // Initializing state variables
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [redirectToHome, setRedirectToHome] = useState(false);

  // Accessing user context to update user information
  const {handleUserInfo} = useContext(UserContext);

  // Handling login submission
  const handleLogin = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      body: JSON.stringify({username,password}),
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
    })
    if (response.ok) {
      response.json().then((userData) => {
        handleUserInfo(userData);
        setRedirectToHome(true);
      })
    } else {
      // Displaying error message if login failed
      const error_message = await response.json();
      alert(error_message);
    }
  }

  // Redirecting to home page after successful login
  if (redirectToHome) {
    return <Navigate to={'/'}/>;
  }

  // Rendering login form
  return (
    <div className="login-container">
      <h1 className="login-title">LOGIN</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <input 
          type='text' 
          placeholder="username" 
          value={username}
          className="input-box"
          onChange={event => setUsername(event.target.value)}
        />
        <input 
          type='text' 
          placeholder="password" 
          value={password} 
          className="input-box"
          onChange={event => setPassword(event.target.value)}
        />
        <button className="login-button">Login</button>
      </form>
    </div>
  )
}

export default LoginPage;
