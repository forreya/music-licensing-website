// Import necessary modules and components
import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Beat from "../../components/Beat";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { setBeats } from "../../state";

const ShoppingList = () => {
  // Define state variables using useState hook
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const beats = useSelector((state) => state.cart.beats);
  const breakPoint = useMediaQuery("(min-width:600px)");

  // Fetch data from server and store in Redux state using useEffect hook
  useEffect(() => {
    fetch('http://localhost:4000/beats', {})
      .then(response => response.json())
      .then(beats => {
        dispatch(setBeats(beats));
      })
  }, [])

  // Handle change of active tab
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  // Render shopping list component
  return (
    <Box width="80%" margin="80px auto">
      {/* Render shopping list title */}
      <Typography variant="h3" textAlign="center">
        Our Featured <b>Beats</b>
      </Typography>
      <Tabs
        textColor="primary"
        indicatorColor="primary"
        value={value}
        onChange={handleChange}
        centered
        TabIndicatorProps={{ sx: { display: breakPoint ? "block" : "none" } }}
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        <Tab label="ALL" value="all" />
      </Tabs>
      {/* Render shopping list beats */}
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around"
        rowGap="20px"
        columnGap="1.33%"
      >
        {value === "all" &&
          beats.map((beat) => (
            <Beat key={beat._id} {...beat} creator={beat.creator.username}/>
          ))}
      </Box>
    </Box>
  );
};

// Export shopping list component
export default ShoppingList;
