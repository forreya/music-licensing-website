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
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const beats = useSelector((state) => state.cart.beats);
  const breakPoint = useMediaQuery("(min-width:600px)");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getBeats() {
    const beats = await fetch(
      "http://localhost:2000/api/beats?populate=image",
      { method: "GET" }
    );
    const beatsJson = await beats.json();
    dispatch(setBeats(beatsJson.data));
  }

  useEffect(() => {
    getBeats();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const topRatedBeats = beats.filter(
    (beat) => beat.attributes.category === "topRated"
  );
  const newBeats = beats.filter(
    (beat) => beat.attributes.category === "new"
  );
  const bestSellersBeats = beats.filter(
    (beat) => beat.attributes.category === "bestSellers"
  );

  return (
    <Box width="80%" margin="80px auto">
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
        <Tab label="NEW" value="new" />
        <Tab label="BEST SELLERS" value="bestSellers" />
        <Tab label="TOP RATED" value="topRated" />
      </Tabs>
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
            <Beat beat={beat} key={`${beat.name}-${beat.id}`} />
          ))}
        {value === "new" &&
          newBeats.map((beat) => (
            <Beat beat={beat} key={`${beat.name}-${beat.id}`} />
          ))}
        {value === "bestSellers" &&
          bestSellersBeats.map((beat) => (
            <Beat beat={beat} key={`${beat.name}-${beat.id}`} />
          ))}
        {value === "topRated" &&
          topRatedBeats.map((beat) => (
            <Beat beat={beat} key={`${beat.name}-${beat.id}`} />
          ))}
      </Box>
    </Box>
  );
};

export default ShoppingList;