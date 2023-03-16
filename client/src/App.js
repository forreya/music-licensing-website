import { useEffect } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';

import BeatDetails from './scenes/beatRelated/BeatDetails';
import Checkout from './scenes/checkout/Checkout';
import Home from "./scenes/home/Home";
import SuccessfulOrder from "./scenes/checkout/SuccessfulOrder";
import CartMenu from './scenes/global/CartMenu';
import Footer from "./scenes/global/Footer";
import { UserProvider } from './context/UserContext';
import Layout from './scenes/global/Layout';
import LoginPage from './scenes/authorization/LoginPage';
import RegisterPage from './scenes/authorization/RegisterPage';
import CreateBeat from './scenes/beatRelated/CreateBeat';
import EditBeat from './scenes/beatRelated/EditBeat';

// This component is used to scroll to the top of the page when the route changes
const ScrollToTop = () => {
  // Get the current location using the `useLocation` hook
  const { pathname } = useLocation();

  // Use the `useEffect` hook to execute a scroll to the top of the page when the location changes
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  // Return `null` because this component doesn't render anything
  return null
}

function App() {
  // The `App` component is the main component that renders the whole application
  return (
    <div className="app">
      <BrowserRouter>
        <UserProvider>
          {/* Render the `ScrollToTop` component to ensure the page scrolls to the top when the route changes */}
          <ScrollToTop />
          <Routes>
            {/* Define the top-level Layout `Route` for the whole application */}
            <Route path='/' element={<Layout />} >
              {/* Define the `Route` components for each page of the application */}
              <Route index element={
                <Home />
              } />
              <Route path="beat/:beatId" element={<BeatDetails />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path='/successful-order' element={<SuccessfulOrder />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/create-beat' element={<CreateBeat />} />
              <Route path='/beats/:id' element={<BeatDetails />} />
              <Route path='/edit/:id' element={<EditBeat />} />
            </Route>
          </Routes>
          {/* Render the `CartMenu` component*/}
          <CartMenu />
          {/* Render the `Footer` component at the bottom of the page */}
          <Footer />    
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
