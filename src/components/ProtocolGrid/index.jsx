import { Stack, Flex, Text, Avatar, Image, Button } from "@chakra-ui/react";
import React from "react";
import { useNavigate, useParams } from 'react-router-dom';
import webLogo from '../../assets/link-2.svg'
import FantomLogo from "../../assets/fantomlogo.svg"
import SecureLogo from "../../assets/SecureDex.svg"
import waveLogo from '../../assets/mdi_approximately-equal.png'

const ProtocolGrid = ({
  protocolName,
  protocolLink,
  protocolCap,
  coverCost,
  riskLevel,
  link,
  onOpen
}) => {
  const { root, title, subTitle, title2 } = useStyles();

  let navigate = useNavigate()
  const {id} = useParams();

  return (
    <Stack
      {...root}
      as="button"
      bg="#FFFFFF"
      _hover={{  boxShadow: '2xl' }}
      justify="center"
    > 
      <Flex my={5}>
       <Avatar src={SecureLogo} />
       <Flex flexDir="column" ml="15px" textAlign="left">
        <Text {...title}>{protocolName}</Text>
        
        <Flex>
          <Image src={webLogo} w={"15px"} mr="5px" /> 
          <Text {...subTitle}>{protocolLink}</Text>
        </Flex>

       </Flex>
      
      </Flex>

      <Flex justifyContent="space-between" w={"100%"} textAlign="left">

        <Flex flexDir="column">
          <Text {...title2}>Chains</Text>
         <Flex mt="10px" justify="center" alignItems="center">
          <Avatar src={FantomLogo} width="30px" h="30px" mr="10px" />
          <Text {...subTitle}>Fantom</Text>
         </Flex>
        </Flex>
        <Flex flexDir="column">
          <Text {...title2}>Capacity</Text>
         <Flex mt="10px" justify="center" alignItems="center">
          <Avatar src={waveLogo} width="20px" h="20px" mr="10px" />
          <Text {...subTitle}>{protocolCap} USD</Text>
         </Flex>
        </Flex>

      </Flex>

      <Flex justifyContent="space-between" w={"100%"} textAlign="start" pt="24px">

       <Flex flexDir="column">
         <Text fontSize="12px" fontWeight="bold">Monthly Cover cost</Text>
        <Flex mt="10px">
         <Text {...title}>{coverCost}</Text>
        </Flex>
       </Flex>
         {/* <Spacer mr="50px" /> */}
         <Flex flexDir="column">
         <Text {...title2}>Risk level</Text>
        <Flex mt="5px" justify="flex-end">
         <Text {...subTitle} color="#BA1A1A">{riskLevel}</Text>
        </Flex>
       </Flex>
       </Flex>

       {/* ------------------------------- Button controller ---------------------------- */}
       <Flex justifyContent="space-between" textAlign="start" pt="24px" w={"100%"}>

        <Flex flexDir="column">
         <Button color="black" borderRadius="100px" bg="#DCE7F9"
          fontSize="14px" fontWeight={500}
          onClick={() => navigate(`/addCover/${link+1}`)}
         >
            Add cover
        </Button>
        </Flex>
          <Flex flexDir="column">
          <Button color="white" borderRadius="100px" bg="ctaBg"
          fontSize="14px" fontWeight={500}
          onClick={() => navigate(`/protocols/${link+1}`)}
          px={"1.5rem"}
          >
            Insure
         </Button>
        </Flex>
        </Flex>
    
    </Stack>
  );
};

export default ProtocolGrid;

const useStyles = () => {
  return {
    root: {
      p: ["10px", "15px", "18px", "20px", "25px"],
    },
    text: {
      fontSize: ["12px", "14px", "16px", "16px", "20px"],
    },
    title: {
        fontWeight: "600",
        fontSize: "18px",
        lineHeight: "24px",
    },
    subTitle: {
        fontWeight: "400",
        fontSize: "14px",
        lineHeight: "24px",
        color: "#4C4546"
    },
    title2: {
        fontWeight: "500",
        fontSize: "16px",
        lineHeight: "24px",
    }
  };
};
