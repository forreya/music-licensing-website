
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
    const item = await fetch(
      `http://localhost:2000/api/beats/${beatId}?populate=image`,
      {
        method: "GET",
      }
    );
    const itemJson = await item.json();
    setItem(itemJson.data);
  }

  async function getBeats() {
    const beats = await fetch(
      `http://localhost:2000/api/beats?populate=image`,
      {
        method: "GET",
      }
    );
    const beatsJson = await beats.json();
    setItems(beatsJson.data);
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
        
      </Box>
    </Box>
  );
};

export default BeatDetails;