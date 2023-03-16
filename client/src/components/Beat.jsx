// Import necessary modules and components
import { useState } from "react";
import { useDispatch } from "react-redux";
import { IconButton, Box, Typography, useTheme, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../theme";
import { addToCart } from "../state";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const Beat = ({_id, beatName, image, price, createdAt, creator, description, tags}) => {
  // Initialize necessary states
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const {
    palette: { neutral },
  } = useTheme();

  // Render component
  return (
    <Box>
      <Box
        position="relative"
        // Show add and remove button when mouse hover over image
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
      >
        {/* Link to the beat detail page */}
        <Link to={`/beats/${_id}`} className='beat-link' style={{textDecoration: 'none'}}>
        <img
          alt={beatName}
          width="300px"
          height="400px"
          src={'http://localhost:4000/'+image}
          style={{ cursor: "pointer" }}
        />
        </Link>
        <Box
          display={isHovered ? "block" : "none"}
          position="absolute"
          bottom="10%"
          left="0"
          width="100%"
          padding="0 5%"
        >
          <Box display="flex" justifyContent="space-between">
            {/* Allow users to add or remove beat count */}
            <Box
              display="flex"
              alignItems="center"
              backgroundColor={shades.neutral[100]}
              borderRadius="3px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography color={shades.primary[300]}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            {/* Allow users to add beat to cart */}
            <Button
              onClick={() => {
                dispatch(addToCart({ beat: { _id, beatName, image, creator, price, description, count } }));
              }}
              sx={{ backgroundColor: shades.primary[300], color: "white" }}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Box>

      <Box mt="3px">
        <Typography variant="subtitle2" color={neutral.dark}>
        </Typography>
        <Typography variant="h3" fontWeight="bold" marginTop="5px">{beatName}</Typography>
        <Typography variant="h4" fontWeight="bold" marginTop="5px">RM{price} PER LICENSE</Typography>
        <Typography marginTop="5px">By: {creator}</Typography>
      </Box>
    </Box>
  );
};

export default Beat;