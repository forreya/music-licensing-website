import { useEffect } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';

import BeatDetails from './scenes/beatDetails/BeatDetails';
import Checkout from './scenes/checkout/Checkout';
import Home from "./scenes/home/Home";
import Confirmation from "./scenes/checkout/Confirmation";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}


function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="beat/:beatId" element={<BeatDetails />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="checkout/success" element={<Confirmation />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;