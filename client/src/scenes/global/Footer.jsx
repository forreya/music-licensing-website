
import { useTheme } from "@emotion/react";
import { Box, Typography } from "@mui/material";
import { shades } from "../../theme";

function Footer() {
  const {
    palette: { neutral },
  } = useTheme();
  return (
    <Box marginTop="70px" padding="40px 0" backgroundColor={neutral.light}>
      <Box
        width="80%"
        margin="auto"
        display="flex"
        justifyContent="space-between"
        flexWrap="wrap"
        rowGap="30px"
        columnGap="clamp(20px, 30px, 40px)"
      >
        <Box width="clamp(20%, 30%, 40%)">
          <Typography
            variant="h4"
            fontWeight="bold"
            mb="30px"
            color={shades.secondary[500]}
          >
            BEAT STORE
          </Typography>
          <div>
          Beat Store is an online platform that allows music producers, artists, and content creators to purchase licenses for instrumental music tracks for use in their own original works. 
          We feature a wide variety of high-quality beats in various genres, such as hip-hop, electronic, pop, and R&B.
          </div>
        </Box>

        <Box width="clamp(20%, 25%, 30%)">
          <Typography variant="h4" fontWeight="bold" mb="30px">
            Contact Details
          </Typography>
          <Typography mb="30px">
            Beat Land, Music Street, House 43, NSM183
          </Typography>
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