
import { Box, Button, IconButton, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Beat from "../../components/Beat";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../../theme";
import { addToCart } from "../../state";
import { useDispatch } from "react-redux";

const BeatDetails = () => {
  const dispatch = useDispatch();
  const { beatId } = useParams();
  const [value, setValue] = useState("description");
  const [count, setCount] = useState(1);
  const [beat, setBeat] = useState(null);
  const [beats, setBeats] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getBeat() {
    const beat = await fetch(
      `http://localhost:2000/api/beats/${beatId}?populate=image`,
      {
        method: "GET",
      }
    );
    const beatJson = await beat.json();
    setBeat(beatJson.data);
  }

  async function getBeats() {
    const beats = await fetch(
      `http://localhost:2000/api/beats?populate=image`,
      {
        method: "GET",
      }
    );
    const beatsJson = await beats.json();
    setBeats(beatsJson.data);
  }

  useEffect(() => {
    getBeat();
    getBeats();
  }, [beatId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box width="80%" m="80px auto">
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        {/* IMAGES */}
        <Box flex="1 1 40%" mb="40px">
          <img
            alt={beat?.name}
            width="100%"
            height="100%"
            src={`http://localhost:2000${beat?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
            style={{ objectFit: "contain" }}
          />
        </Box>
        {/* ACTIONS */}
        <Box flex="1 1 50%" mb="40px">
          <Box display="flex" justifyContent="space-between">
            <Box>Beat</Box>
            <Box>Prev | Next</Box>
          </Box>

          <Box m="65px 0 25px 0">
            <Typography variant="h3">{beat?.attributes?.name}</Typography>
            <Typography>${beat?.attributes?.price}</Typography>
            <Typography sx={{ mt: "20px" }}>
              {beat?.attributes?.longDescription}
            </Typography>
          </Box>

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
              <Typography sx={{ p: "0 5px" }}>{count}</Typography>
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
              onClick={() => dispatch(addToCart({ beat: { ...beat, count } }))}
            >
              ADD TO CART
            </Button>
          </Box>
          <Box>
            <Box m="20px 0 5px 0" display="flex">
              <FavoriteBorderOutlinedIcon />
              <Typography sx={{ ml: "5px" }}>ADD TO WISHLIST</Typography>
            </Box>
            <Typography>CATEGORIES: {beat?.attributes?.category}</Typography>
          </Box>
        </Box>
      </Box>

      {/* INFORMATION */}
      <Box m="20px 0">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="DESCRIPTION" value="description" />
          <Tab label="REVIEWS" value="reviews" />
        </Tabs>
      </Box>
      <Box display="flex" flexWrap="wrap" gap="15px">
        {value === "description" && (
          <div>{beat?.attributes?.longDescription}</div>
        )}
        {value === "reviews" && <div>The reviews are here.</div>}
      </Box>

      {/* RELATED ITEMS */}
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