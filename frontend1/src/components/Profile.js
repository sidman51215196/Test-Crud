import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Paper } from "@mui/material";

const Profile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user; // Retrieve user from state

  if (!user) {
    return (
      <Box sx={{ textAlign: "center", marginTop: 5 }}>
        <Typography variant="h5">User not found</Typography>
        <Button variant="contained" onClick={() => navigate("/")}>Go Back</Button>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <Paper sx={{ padding: 4, width: 400, textAlign: "center" }}>
        <Typography variant="h4">User Profile</Typography>
        <Typography variant="h6"><b>Name:</b> {user.name}</Typography>
        <Typography variant="h6"><b>Email:</b> {user.email}</Typography>
        <Typography variant="h6"><b>Age:</b> {user.age}</Typography>
        <Button sx={{ marginTop: 2 }} variant="contained" onClick={() => navigate("/")}>
          Back to Users
        </Button>
      </Paper>
    </Box>
  );
};

export default Profile;
