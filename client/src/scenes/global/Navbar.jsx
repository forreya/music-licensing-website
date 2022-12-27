import { useDispatch, useSelector } from 'react-default';
import { Badge, Box, IconButton} from '@mui/material';
import {
    PersonOutline,
    ShoppingBagOutlined,
    MenuOutlined,
    SearchOutlined
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom' ;
import { shades } from '../../theme';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    return (
        <Box
        display = "flex"
        alignItems = "center"
        width = "100%"
        height = "60px"
        backgroundColor = "rgba(255, 255, 255, 0.95)"
        color = "black"
        position = "fixed"
        top = "0"
        left = "0"
        zIndex = "1"
        >
        </Box>
    );
};

export default Navbar;