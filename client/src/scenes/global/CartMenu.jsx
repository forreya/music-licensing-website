// Import Material-UI components, React Redux hooks, icons, Emotion styled function,
// and custom state management functions
import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styled from "@emotion/styled";
import { shades } from "../../theme";
import {
  decreaseCount,
  increaseCount,
  removeFromCart,
  setIsCartOpen,
} from "../../state";
import { useNavigate } from "react-router-dom";

// Define a custom styled Box component with flexbox properties
const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

// Define the CartMenu functional component
const CartMenu = () => {
  // Retrieve the navigate, dispatch, cart, and isCartOpen variables from the Redux store
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);

  // Calculate the total price of all beats in the cart
  const totalPrice = cart.reduce((total, beat) => {
    return total + beat.count * beat.price;
  }, 0);

  // Return a Box component that displays the cart and allows users to adjust the quantity or remove beats
  return (
    <Box
      // Display the component if the cart is open, hide otherwise
      display={isCartOpen ? "block" : "none"}
      // Set the background color of the component
      backgroundColor="rgba(0, 0, 0, 0.4)" 
      position="fixed"
      zIndex={10}
      width="100%"
      height="100%"
      left="0"
      top="0"
      overflow="auto"
    >
      <Box
        position="fixed"
        right="0"
        bottom="0"
        width="max(400px, 30%)"
        height="100%"
        backgroundColor="white"
      >
        <Box padding="30px" overflow="auto" height="100%">
          {/* HEADER */}
          <FlexBox mb="15px">
            <Typography variant="h3">SHOPPING BAG ({cart.length})</Typography>
            <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
              <CloseIcon />
            </IconButton>
          </FlexBox>

          {/* CART LIST */}
          <Box>
            {/* Map through the beats in the cart and display them */}
            {cart.map((beat) => (
              <Box key={`${beat.beatName}-${beat._id}`}>
                <FlexBox p="15px 0">
                  <Box flex="1 1 40%">
                  {/* Set the image source */}
                    <img
                      alt={beat?.beatName}
                      width="123px"
                      height="164px"
                      src={'http://localhost:4000/'+ beat.image}
                    />
                  </Box>
                  <Box flex="1 1 60%">
                    <FlexBox mb="5px">
                      {/* Display the name of the beat */}
                      <Typography fontWeight="bold">
                        {beat.beatName}
                      </Typography>
                      <IconButton
                        onClick={() =>
                          // Dispatch an action to remove the beat from the cart
                          dispatch(removeFromCart({ id: beat._id }))
                        }
                      >
                        <CloseIcon />
                      </IconButton>
                    </FlexBox>
                    <Typography>{beat.description}</Typography>
                    <FlexBox m="15px 0">
                      <Box
                        display="flex"
                        alignItems="center"
                        border={`1.5px solid ${shades.neutral[500]}`}
                      >
                        <IconButton
                          onClick={() =>
                            dispatch(decreaseCount({ id: beat._id }))
                          }
                        >
                          <RemoveIcon />
                        </IconButton>
                        <Typography>{beat.count}</Typography>
                        <IconButton
                          onClick={() =>
                            dispatch(increaseCount({ id: beat._id }))
                          }
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                      {/* Render the beat price */}
                      <Typography fontWeight="bold">
                        RM{beat.price}
                      </Typography>
                    </FlexBox>
                  </Box>
                </FlexBox>
                <Divider />
              </Box>
            ))}
          </Box>

          {/* ACTIONS */}
          <Box m="20px 0">
          <FlexBox m="20px 0">
              {/* Render the subtotal price of all beats in the cart */}
              <Typography fontWeight="bold">SUBTOTAL</Typography>
              <Typography fontWeight="bold">RM{totalPrice}</Typography>
          </FlexBox>
            {/* Render the checkout button */}
            <Button
              sx={{
                backgroundColor: shades.primary[400],
                color: "white",
                borderRadius: 0,
                minWidth: "100%",
                padding: "20px 40px",
                m: "20px 0",
              }}
              onClick={() => {
                navigate("/checkout");
                dispatch(setIsCartOpen({}));
              }}
            >
              CHECKOUT
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartMenu;
