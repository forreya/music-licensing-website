// Importing necessary dependencies and styles
import '../../assets/styles/EditBeat.css';
import { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

// Defining EditBeat functional component
const EditBeat = () => {
  // Extracting the beat id from the URL using useParams hook
  const { id } = useParams()

  // Initializing state variables for beat details
  const [beatName, setBeatName] = useState('')
  const [price, setPrice] = useState(0)
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState([]);
  const [tags, setTags] = useState([]);
  
  // Initializing state variable for redirecting back to beat details page
  const [redirectToHome, setRedirectToHome] = useState(false);

  // Using useEffect hook to fetch the beat details from server
  useEffect(() => {
    fetch('http://localhost:4000/beats/'+id, {
      method: 'GET',
    }).then(response => response.json().then(
      beatInfo => {
        // Setting the beat details to the state variables
        setBeatName(beatInfo.beatName)
        setPrice(beatInfo.price)
        setDescription(beatInfo.description)
        setTags(beatInfo.tags.join(', '))
      }
    ))
  },[])

  // Defining handleUpdateForm function to handle form submission
  const handleUpdateForm = async (event) => {
    // Preventing the default form submission
    event.preventDefault();
    // Creating a new FormData object to send form data to the server
    const data = new FormData()
    data.set('beatName', beatName)
    data.set('price', price)
    data.set('description', description)
    data.set('tags', tags)
    if (images?.[0]) {
      data.set('image', images?.[0])
    }
    // Sending a PUT request to update the beat details on the server
    const response = await fetch('http://localhost:4000/beats/'+id,{
      method: 'PUT',
      body: data,
      credentials: 'include',
    });
    if (response.ok) {
      // Setting redirectToHome state variable to true to redirect back to beat details page
      setRedirectToHome(true);
    }
  }

  // If redirectToHome state variable is true, redirect to the beat details page
  if (redirectToHome) {
    return <Navigate to={`/beats/${id}`} />
  }

  // Rendering the edit form for updating the beat details
  return (
    <div className="edit-container">
      <form className="edit-form" onSubmit={handleUpdateForm}>
        <h1 className='edit-title'>Update Your Beat</h1>
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
          <button className="edit-button">Update Beat</button>
        </div> 
      </form>
    </div>
  )
}

export default EditBeat;