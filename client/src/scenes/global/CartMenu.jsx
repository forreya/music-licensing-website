import { Box, Button, Divider, Icon, IconButton, Typography } from "@mui/material";
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
} from "../../state"
import { useNavigate } from 'react-router-dom'

// A styled 'component' that is used to reuse CSS code. It can be reused in our JSX code.
const FlexBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const CartMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);

  const totalPrice = cart.reduce((total, beat) => {
    return total + beat.count * beat.attributes.price;
  }, 0);

  return (
    <Box
      display = { isCartOpen? 'block' : 'none' }
      backgroundColor = "rgba(0,0,0,0.4)"
      position = "fixed"
      zIndex = {10}
      width = "100%"
      height = "100%"
      left = "0"
      right = "0"
      overflow = "auto"
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
              {cart.map((beat) => (
                <Box key={`${beat.attributes.name}-${beat.id}`}>
                  <FlexBox p="15px 0">
                    <Box flex="1 1 40%">
                      <img 
                        alt={beat?.name}
                        width="123px"
                        height="164px"
                        src={`http://localhost:1337${beat?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
                      />
                    </Box>
                    <Box flex="1 1 60%">
                      {/* ITEM NAME */}
                      <FlexBox mb="5px">
                        <Typography fontWeight="bold">
                          {beat.attributes.name}
                        </Typography>
                        <IconButton onClick={() => dispatch(removeFromCart({ id: item.id}))}>
                          <CloseIcon />
                        </IconButton>
                      </FlexBox>
                      <Typography>{item.attributes.shortDescription}</Typography>
                      
                      {/* AMOUNT */}
                      <FlexBox m="15px 0">
                        <Box
                        display="flex"
                        alignItems="center"
                        border={`1.5px solid ${shades.neutral[500]}`}
                        >
                          <IconButton
                            onClick={() => dispatch(decreaseCount({id:item.id}))}
                          >
                            <RemoveIcon />
                          </IconButton>
                          <Typography>{beat.count}</Typography>
                          <IconButton
                            onClick={() => dispatch(increaseCount({id:item.id}))}
                          >
                            <AddIcon />
                          </IconButton>
                        </Box>
                      </FlexBox>
                      {/* PRICE */}
                      <Typography fontWeight="bold">
                        ${beat.attributes.price}
                      </Typography>
                    </Box>
                  </FlexBox>
                  <Divider />
                </Box>
              ))}
            </Box>

            {/* ACTIONS */}
          </Box> 
        </Box>
    </Box>
  )
}
 
export default CartMenu;