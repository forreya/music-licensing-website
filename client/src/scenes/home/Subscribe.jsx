import { Box, InputBase, Divider, Typography, IconButton } from "@mui/material"; // Importing necessary MUI components
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined"; // Importing MUI icon
import { useState } from "react"; // Importing useState hook from React

const Subscribe = () => {
  const [email, setEmail] = useState(""); // Initializing state for email

  return (
    // Parent container with styling properties
    <Box width="80%" margin="80px auto" textAlign="center"> 
      <IconButton>
        {/* Icon button for email notification */}
        <MarkEmailReadOutlinedIcon fontSize="large" /> 
      </IconButton>
      <Typography variant="h3">Subscribe To Mailing List</Typography>
      <Typography>
        to be notified of upcoming releases & discounts.
      </Typography>
      <Box
        p="2px 4px"
        m="15px auto"
        display="flex"
        alignItems="center"
        width="75%"
        backgroundColor="#F2F2F2" // Styling properties for the email input box
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)} // Event handler for email input
          value={email} // Value of the email input
        />
        {/* Vertical divider between email input and subscribe button */}
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        {/* Button to submit email for subscription */}
        <Typography sx={{ p: "10px", ":hover": { cursor: "pointer" } }}>
          Subscribe
        </Typography>
      </Box>
    </Box>
  );
};

export default Subscribe; // Exporting
