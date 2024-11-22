import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            to="/"
            variant="h6"
            component={Link}
            sx={{ flexGrow: 1, textDecoration: "none", color: "white" }}
          >
            Family Tree App
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
