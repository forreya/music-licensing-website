// Import necessary dependencies
import { useDispatch, useSelector } from "react-redux";
import { Badge, Box, IconButton } from "@mui/material";
import { ShoppingBagOutlined } from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";
import { shades } from "../../theme";
import { setIsCartOpen } from "../../state";
import { useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import '../../assets/styles/Navbar.css';

function Navbar() {
  // Initialize hooks and variables
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const { userInfo, handleUserInfo } = useContext(UserContext)

  // Fetch user info from server and update context
  useEffect(() => {
    fetch('http://localhost:4000/profile', {
      credentials: 'include',
    })
    .then((response) => response.json())
    .then((userInfo) => handleUserInfo(userInfo))
  }, [])

  // Logout function to clear user info from context
  const logout = () => {
    fetch('http://localhost:4000/logout', {
      credentials: 'include',
      method: 'POST',
    })
    handleUserInfo(null);
  }

  const username = userInfo?.username

  return (
    // Render navbar component
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      height="60px"
      backgroundColor="rgba(255, 255, 255, 0.95)"
      color="black"
      position="fixed"
      top="0"
      left="0"
      zIndex="1"
    >
      <Box
        width="90%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box
          onClick={() => navigate("/")}
          sx={{ "&:hover": { cursor: "pointer" }, fontSize: "19px"}}
          color={"#8B0000"}
        >
          BEAT STORE
        </Box>
        {/* Cart icon and user links */}
        <Box
          display="flex"
          justifyContent="space-between"
          columnGap="20px"
          zIndex="2"
        >
          {/* Cart icon */}
          <Badge
            badgeContent={cart.length}
            color="secondary"
            invisible={cart.length === 0}
            sx={{
              "& .MuiBadge-badge": {
                right: 5,
                top: 5,
                padding: "0 4px",
                height: "14px",
                minWidth: "13px",
              },
            }}
          >
            <IconButton
              onClick={() => dispatch(setIsCartOpen({}))}
              sx={{ color: "black" }}
            >
              <ShoppingBagOutlined />
            </IconButton>
          </Badge>
          {/* User links */}
          {username && (
          <>
            <Link to='/create-beat' className="navbar-link">Post New Beat</Link> 
            <a onClick={logout} href='/' className="navbar-link">Logout</a>
          </>
          )}
          {!username && (
            <>
              <Link to="/login" className="navbar-link">Login</Link>
              <Link to="/register" className="navbar-link">Register</Link>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}

// export the component
export default Navbar;
