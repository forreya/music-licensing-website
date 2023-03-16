import Navbar from './Navbar'
import {Outlet} from 'react-router-dom'

const Layout = () => {
  // Return the Navbar component and the Outlet, which renders the child route components
  return (
    <main className="main-container">
      <Navbar />
      <Outlet />
    </main>
  )
}

export default Layout;