import React from "react";
import logo from "../assets/logo.png";
import { Box } from "@chakra-ui/react";

export const Header = () => {
  return (
    <Box
      position={"absolute"}
      top={"30px"}
      left={["20px", "20px", "30px", "30px"]}
      className="animate__animated animate__fadeInLeft"
    >
      <img src={logo} alt="Wisechamps" width={"120px"} />
    </Box>
  );
};
