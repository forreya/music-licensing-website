// Import necessary components and libraries
import { Box, Button, IconButton, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Beat from "../../components/Beat";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../../theme";
import { addToCart } from "../../state";
import { useDispatch } from "react-redux";
import ReactTimeAgo from 'react-timeago';
import {UserContext} from '../../context/UserContext'

const BeatDetails = () => {
  // Get dispatch function to dispatch actions to the store
  const dispatch = useDispatch();

  // Create states for various variables
  const [value, setValue] = useState("description");
  const [count, setCount] = useState(1);
  const [beat, setBeat] = useState(null);
  const [beats, setBeats] = useState([]);
  const {userInfo} = useContext(UserContext)

  const [beatInfo, setBeatInfo] = useState('')
  // Get id parameter from URL
  const {id} = useParams();
  // Destructure beatInfo to get required properties
  const {_id, beatName, image, creator, price, description, createdAt} = beatInfo

  // Fetch data of the beat from server and update state with response data
  useEffect(() => {
    fetch(`http://localhost:4000/beats/${id}`, {
      method: 'GET',
    })
      .then(response => response.json()
      .then(beatData => setBeatInfo(beatData)))
  },[])

  // Function to handle change in information tab
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    // Component UI starts here
    <Box width="80%" m="80px auto">
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        {/* IMAGES */}
        <Box flex="1 1 40%" mb="40px">
          <img
            alt={beat?.name}
            width="100%"
            height="100%"
            src={`http://localhost:4000/${beatInfo.image}`}
            style={{ objectFit: "contain" }}
          />
        </Box>
        {/* ACTIONS */}
        <Box flex="1 1 50%" mb="40px">
          <Box display="flex" justifyContent="space-between">
            <Typography marginTop="20px" variant="h4">
              Posted <ReactTimeAgo date={beatInfo?.createdAt}/>
               by {beatInfo?.creator?.username}
            </Typography>
            {/* Link to edit beat details if the current user is the creator */}
            {beatInfo?.creator?._id == userInfo?.id && 
              <Typography 
                marginTop="15px" 
                marginRight="30px"
                sx={{ ml: "5px", fontSize: '14px'}}
              >
                <a href={`/edit/${beatInfo?._id}`} className='update-btn'>
                  Update Beat
                </a>
              </Typography>
            }
          </Box>

          {/* This Box component contains the beat name and price */}
          <Box m="65px 0 25px 0">
            <Typography variant="h2">{beatInfo.beatName}</Typography>
            <Typography marginTop="20px" variant="h3">
              RM{beatInfo.price} PER LICENSE
            </Typography>
          </Box>

          {/* This component contains a quantity selector and an "Add to Cart" button */}
          <Box display="flex" alignBeats="center" minHeight="50px">
            <Box
              display="flex"
              alignBeats="center"
              border={`1.5px solid ${shades.neutral[300]}`}
              mr="20px"
              p="2px 5px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 0))}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ p: "0 5px" }} marginTop="12px">{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              sx={{
                backgroundColor: "#222222",
                color: "white",
                borderRadius: 0,
                minWidth: "150px",
                padding: "10px 40px",
              }}
              onClick={() => {
                dispatch(addToCart({ 
                  beat: {_id, beatName, image, creator, price, description, count} 
                }));
              }}
            >
              ADD TO CART
            </Button>
          </Box>

          {/* This component contains an "Add to Favorites" button and a list of tags associated with the beat */}
          <Box>
            <Box m="20px 0 5px 0" display="flex">
              <FavoriteBorderOutlinedIcon />
              <Typography sx={{ ml: "5px", fontSize: '14px' }}>ADD TO FAVORITES</Typography>
            </Box>
            <Typography marginTop="15px" sx={{ fontSize: '15px' }}>Tags: {beatInfo.tags?.join(', ')}</Typography>
          </Box>
        </Box>
      </Box>

      {/* INFORMATION */}
      <Box m="20px 0">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="DESCRIPTION" value="description" sx={{ fontSize: '20px' }}/>
          <Tab label="REVIEWS" value="reviews" sx={{ fontSize: '20px' }}/>
        </Tabs>
      </Box>
      <Box display="flex" flexWrap="wrap" gap="15px" sx={{ fontSize: '15px' }}>
        {value === "description" && (
          <div>{beatInfo.description}</div>
        )}
        {value === "reviews" && <div>The reviews are here.</div>}
      </Box>

      {/* RELATED BEATS */}
      <Box mt="50px" width="100%">
        <Typography variant="h3" fontWeight="bold">
          Related Beats
        </Typography>
        <Box
          mt="20px"
          display="flex"
          flexWrap="wrap"
          columnGap="1.33%"
          justifyContent="space-between"
        >
          {beats.slice(0, 4).map((beat, i) => (
            <Beat key={`${beat.name}-${i}`} beat={beat} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default BeatDetails;
