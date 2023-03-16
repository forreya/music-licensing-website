// Import necessary dependencies
import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { shades } from "../../theme";

// Define the Footer component
function Footer() {
  // Use the useTheme hook from Emotion to get the current theme
  const {
    palette: { neutral }, // Destructure the neutral color palette from the theme
  } = useTheme();

  // Return the component JSX
  return (
    <Box marginTop="70px" padding="40px 0" backgroundColor={neutral.light}>
      {/* Use the Box component from Material UI to create a container with specific properties */}
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        rowGap="30px"
        columnGap="clamp(20px, 30px, 40px)"
      >
        {/* Use another Box component to create a column with specific width */}
        <Box width="clamp(20%, 30%, 40%)">
          {/* Use the Typography component to display text with specific style */}
          <Typography
            variant="h4"
            fontWeight="bold"
            mb="30px"
            color={shades.secondary[500]} // Access the secondary color from the shades object in the theme
          >
            BEAT STORE
          </Typography>
          {/* Display a paragraph with description of the Beat Store */}
          <div>
          Beat Store is an online platform that allows music producers, artists, and content creators to purchase licenses for instrumental music tracks for use in their own original works. 
          We feature a wide variety of high-quality beats in various genres, such as hip-hop, electronic, pop, and R&B.
          </div>
        </Box>

        {/* Use another Box component to create another column with different width */}
        <Box width="clamp(20%, 25%, 30%)">
          {/* Use the Typography component to display the heading */}
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Contact Details
          </Typography>
          {/* Use the Typography component to display the contact details */}
          <Typography mb="30px">
            Beat Land, Music Street, House 43, NSM183
          </Typography>
          {/* Use the Typography component to display the email with word wrap */}
          <Typography mb="30px" sx={{ wordWrap: "break-word" }}>
            Email: ellielai2005@gmail.com
          </Typography>
          <Typography mb="30px">1300 888 333</Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;