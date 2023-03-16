import {createContext, useState} from 'react';

// Creating a context object to store user information
const UserContext = createContext();

// Creating a provider component that will wrap around other components to provide the user information to the components in the tree
const UserProvider = (props) => {
  // Initializing a user information state using the useState hook
  const [userInfo, setUserInfo] = useState(null);

  // A function to update the user information state
  const handleUserInfo = (value) => {
    setUserInfo(value);
  };

  // Wrapping the child components with the UserContext.Provider component and passing the user information state and the handleUserInfo function as the value prop
  return <UserContext.Provider value={{userInfo, handleUserInfo}}>{props.children}</UserContext.Provider>;
}

// Exporting the UserProvider and UserContext objects to be used in other parts of the application
export {UserProvider, UserContext}
