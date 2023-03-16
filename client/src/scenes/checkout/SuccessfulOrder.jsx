import { Box } from "@mui/material";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { resetCart } from "../../state";

const SuccessfulOrder = ({price}) => {
  // Get the navigate function from react-router-dom 
  const navigate = useNavigate();

  // Get the dispatch function and cart state from the Redux store
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  // Calculate the total price of the order using the cart state
  const totalPrice = cart.reduce((total, beat) => {
    return total + beat.count * beat.price;
  }, 0);

  // After 5 seconds, reset the cart state and navigate to the home page
  setTimeout(() => {
    dispatch(resetCart());
    navigate("/");
  
  }, 5000);

  // Render an Alert component indicating that the order was successful
  return (
    <Box m="90px auto" width="80%" height="50vh">
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        Order confirmation: RM{totalPrice}. —{" "}
        <strong>Your purchase was successful!</strong>
      </Alert>
    </Box>
  );
};

export default SuccessfulOrder;
