import { Spacer, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { nanoid } from "nanoid";


const DashboardCardItem = ({
  iconnum,
  cardName,
  onClick,
  color,
  // bgDashboard
}) => {

  const { root, text } = useStyles();

  return (
    <>
    <Stack
      {...root}
      key={nanoid()}
      as="button"
      color="black"
      bg={color}
      bgImage="url('/images/bg-dashboard.png')" 
      onClick={onClick}
      justify={"center"}
      textAlign="left"
      align="left"
    >
      <Text mt="30px" fontSize="24px" fontWeight="500">{iconnum}</Text>
      <Spacer />
      {/* <Flex justify="center" align="center" > */}
      <Text {...text} textAlign="left" 
       fontSize="14px" 
       fontWeight="400"
       >
        {cardName}
      </Text>
      {/* </Flex>  */}
    </Stack>
    </>
  );
};

export default DashboardCardItem;

const useStyles = () => {
  return {
    root: {
      borderRadius: {
        base: "10px",
        md: "8px",
      },
    //   bg: "grey",
      p: "20px 40px",
      h: "200px",
    },
    text: {
      fontSize: ["16px"],
      fontWeight: ["400"],
      lineHeight: ["165%"]
    },
  };
};
