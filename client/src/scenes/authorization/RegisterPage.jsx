import '../../assets/styles/RegisterPage.css'
import { useState } from 'react'

const RegisterPage = () => {
  
  // Define two state variables using the useState hook
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // Define the handleRegister function, which will handle the form submission
  const handleRegister = async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault()
    // Send a POST request to the server to register the user
    const response = await fetch('http://localhost:4000/register', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' }
    })
    // If the registration was successful, display an alert message
    if (response.status === 200) {
      alert('Registration successful :)')
    } else {
      // If the registration failed, display an error message
      alert('Registration failed :(')
    }
  }

  // Render the RegisterPage component
  return (
    <div className="register-container">
      <h1 className="register-title">REGISTER</h1>
      <form className="register-form" onSubmit={handleRegister}>
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
        <button className="register-button">Register</button>
      </form>
    </div>
  )
}

// Export the RegisterPage component
export default RegisterPage
