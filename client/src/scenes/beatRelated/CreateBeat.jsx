// Import the stylesheet for this component
import '../../assets/styles/CreateBeat.css';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

// Define the CreateBeat component
const CreateBeat = () => {
  // Define state variables and set initial values with useState hook
  const [beatName, setBeatName] = useState('')
  const [price, setPrice] = useState(0)
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState([]);
  const [tags, setTags] = useState([]);
  const [redirectToHome, setRedirectToHome] = useState(false);

  // Define the form submit handler
  const handleCreateForm = async (event) => {
    event.preventDefault();
    // Create a FormData object to send to the server
    const data = new FormData()
    data.set('beatName', beatName)
    data.set('image', images[0])
    data.set('price', price)
    data.set('description', description)
    data.set('tags', tags)
    // Send a POST request to the server with the FormData object
    const response = await fetch('http://localhost:4000/create-beat', {
      method: 'POST',
      body: data,
      credentials: 'include',
    })
    // If the response is ok, set redirectToHome to true
    if (response.ok) {
      setRedirectToHome(true);
    }
  }

  // If redirectToHome is true, redirect to home page
  if (redirectToHome) {
    return <Navigate to={'/'} />
  }

  // Render the CreateBeat component
  return (
    <div className="create-container">
      <form className="create-form" onSubmit={handleCreateForm}>
        <h1 className='create-title'>Post a Beat</h1>
        <div className="form-container">
          <textarea placeholder='Beat Name' 
                    className="beat-input-name"
                    value={beatName}
                    onChange={(event) => setBeatName(event.target.value)}/>
          <textarea placeholder='Beat Description' 
                    className="beat-input"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}/>
          <input type='text' 
            placeholder='Add Beat Tags (Separated By Commas)'
            className="tag-input"
            value={tags}
            onChange={(event) => setTags(event.target.value)}/>
          <label htmlFor="price" className='price-label'>Price per license:</label>
          <input type='number'
             id='price'
             className='price-input'
             value={price}
             onChange={(event) => setPrice(event.target.value)} />
          <input type='file' 
                 className="image-upload"
                 onChange={event => setImages(event.target.files)}/>
          <button className="create-button">Post Beat</button>
        </div> 
      </form>
    </div>
  )
}

// Export the CreateBeat component
export default CreateBeat;
