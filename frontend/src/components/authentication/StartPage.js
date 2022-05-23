import React from "react";
import { Box, Button, Stack, Text, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

function StartPage() {
  let navigate = useNavigate();

  function navigateToLogin() {
    navigate("/login");
  }

  function navigateToSignUp() {
    navigate("/sign-up");
  }

  return (
    <Box>
      <Box w="100%" h="350px" bgColor="#c0ac77">
        <Stack pt="8px" align="center">
          <Text fontSize="5xl" color="white">
            Welcome To
          </Text>
          <Image src="Arrow.png" alt="Arrow Journal" />
          <Text fontSize="5xl" color="white">
            Journal!
          </Text>
        </Stack>
      </Box>

      <Box w="100%" h="650px" bgColor="#dbc58a">
        <Stack pt="100px" align="center">
          <Button
            bgColor="#6a877f"
            color="white"
            width="600px"
            height="80px"
            fontSize="25px"
            onClick={navigateToLogin}
          >
            {" "}
            Log In{" "}
          </Button>
        </Stack>

        <Stack pt="50px" align="center">
          <Button
            bgColor="#6a877f"
            color="white"
            width="600px"
            height="80px"
            fontSize="25px"
            onClick={navigateToSignUp}
          >
            {" "}
            Sign Up{" "}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default StartPage;
