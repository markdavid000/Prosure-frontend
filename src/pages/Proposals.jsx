import React, {Suspense, lazy, useState, useContext} from 'react'
import { 
  Flex, 
  Box, 
  Text, 
  Spinner, 
  Image, 
  HStack, 
  VStack, 
  Center, keyframes, 
  useDisclosure,
  Avatar,
  Stack,
} from '@chakra-ui/react'
import Footer from '../components/Footer3';
import Container from '../components/Container';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import '../constants/pagination.css'
import {useParams} from "react-router-dom";
import { motion } from 'framer-motion';
import blockChainPartLogo from '../assets/chains.svg'
import uniswapLogo from '../assets/uniswap 1.svg'
import useCollapse from 'react-collapsed';
// import { Progress } from 'react-sweet-progress';
// import "react-sweet-progress/lib/style.css";
import arrowLeft from '../assets/arrow-left.svg';
import { StopScreenMessageContext } from '../constants/stopScreenMessage';
import StopErrorMessage from '../components/StopErrorMessage';


const NavBar = lazy(() => import("../components/Navbar"));
const ProposalFilter = lazy(() => import("../components/ProposalFilter"));


const animationKeyframes = keyframes`
  0% { transform: rotate(360deg); }
  100% { transform: rotate(0);}
`;

const animation = `${animationKeyframes} 3s ease-in-out infinite`;

const Proposals = () => {

    const {
     root,
     protocolBox,
     protocolWelcomeText,
     protocolInnerBox2,
     protocolInnerBox1,
     outerBox,
    } = useStyles();

    let navigate = useNavigate();

    const {id} = useParams();

    // const { isOpen, onOpen, onClose } = useDisclosure();
    // ------------------ useDisclosure for TransactionLoaderModal component
    // const {
    //   // isOpen: transactionLoadingIsOpen,
    //   // onOpen: transactionLoadingOnOpen,
    //   // onClose: transactionLoadingOnClose
    // } = useDisclosure();

    // const [isTransactionLoading, setIsTransactionLoading] = useState(false);

    const [buttonHere, setButtonHere] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

    const { isMobile } = useContext(StopScreenMessageContext);
  
  return (
    <>
      {!isMobile ?
    <Box w="100%">
       <Suspense
        // fallbac k={<Skeleton isLoaded={true} w={"100%"} h={"48px"}></Skeleton>}
        fallback={<Spinner size="sm" />}
      >
        <NavBar />
      </Suspense>
    <Flex w={"100%"} {...root} flexDir="column">
      
      <Flex {...protocolBox} bgImage="url('/images/proposal-bg.png')">
         <Suspense fallback={<Spinner size="sm" />}>
          <Container>
            <HStack {...outerBox} flexDir="row" justify="space-between">
                  {/* LEFT */}
                  <Flex
                  {...protocolInnerBox1}
                  flexDir={"column"}
                  display={{ base: "none", md: "flex" }}
                  alignItems={{ base: "center", md: "flex-start" }}
                  mt= "80px"
                >
                  <Text
                    {...protocolWelcomeText}
                    color="white"
                  >
                   Proposals and claims feed
                  </Text>

                </Flex>

                {/* Center */}
                <VStack
                  {...protocolInnerBox2}
                  display={{ base: "none", md: "flex" }}
                  // pos={"relative"}
                  as={motion.div}
                  animation={animation}
                >
                  <Image
                    src={blockChainPartLogo}
                    right={"60px"}
                    bottom={"50px"}
                  />
                </VStack>

            </HStack>
          </Container>
         </Suspense>
      </Flex>
    
      {/* ---------------------------- Search and Filter area -------------------------- */}
      <Flex w={"100%"} flexDir="column">
          <Flex flexDir="row" p="60px" mt="-40px" align="center"
           onClick={() => navigate('/governance')}
           cursor="pointer"
          > 
            <Image src={arrowLeft} boxSize="15px" mr="10px" />
              <Text fontSize="16px" fontWeight="500">Back</Text>
            </Flex>     
         <Suspense
        // fallbac k={<Skeleton isLoaded={true} w={"100%"} h={"48px"}></Skeleton>}
        fallback={<Spinner size="sm" />}
      >
         <ProposalFilter />
      </Suspense>
      </Flex>

      <Suspense fallback={<Spinner size="sm" />}>
        <Container>
        <Stack p="60px" flexDir="column" mt="-40px">
          <Link to={`/governance-claims/${id}`}>
          <Flex flexDir="column"
             bg="white"
             boxShadow="0px 4px 61px rgba(0, 0, 0, 0.1)"
             p="40px"
          >
          <Flex flexDir="row" justify="space-between" 
            >
            {/* -------------------------- Title & Wallet address is here ----------------------- */}
         <>
          <Flex>
            <Avatar boxSize="30px" src={uniswapLogo} mr="8px" />
            <Flex flexDir="column">
                <Text fontSize="16px" fontWeight="600">Uniswap protocol Claim</Text>
                {/* --------------- wallet address ----------------- */}
                <Text mt="8px">0x8b93...8b0F</Text>
            </Flex>
          </Flex>
    
          {/* ----------------------------- button are here ------------------- */}
          {!buttonHere ? (
            <HStack flexDir="row" justify="space-between">                 
                 {/* ------------------------ Button Action here ----------------- */}
                  <Center bg="#CCFFCB" borderRadius="10px" p="6px 10px" cursor="pointer">
                    <Text fontSize="14px" fontWeight="400">Voting in progress</Text>
                  </Center> 
           </HStack>
            ): (
              <HStack flexDir="row" justify="space-between">                 
               {/* ------------------------ Button Action here ----------------- */}
                <Center bg="#FFDAD6"
                 borderRadius="10px" 
                 p="6px 10px" 
                 cursor="pointer"
                 >
                  <Text fontSize="14px" fontWeight="400">Voting concluded</Text>
                </Center> 
                </HStack>
            )}
          </>
         </Flex>
            {/* ------------------------------- detail info -------------------- */}
            <Flex flexDir="column" mt="18px">
              <Text fontSize="14px" color="#1C1B1F" fontWeight="400">
                Hello! I am claiming for a total of 300,000 USDC in relation to the UST
                 de-pegging event that occurred from 5/3/22 - 5/13/22. First off,
                  I will give a top-level outline of my claim here. Next, I will forward all 
                  necessary and comprehensive materials regarding eligibility criteria, proof of loss, 
                  Proofs checklist and claim amount to claims@insurace.io 
        {/* ----------------------------- Slice moren Text here inside the getCollapseProps -------------------------- */}
                <Text {...getCollapseProps()}
                fontSize="14px" color="#1C1B1F" fontWeight="400"
                >
                 Next, I will forward all 
                  necessary and comprehensive materials regarding eligibility criteria, proof of loss, 
                  Proofs checklist and claim amount to claims@insurace.io 
                </Text>
                  <Text fontSize="14px" fontWeight="500" {...getToggleProps({
                    onClick: () => setIsExpanded((prev) => !prev),
                  })}>
                     {isExpanded ? 'Collapse' : '....Read more' }
                  </Text>
              </Text>
                
                {/* --------------------- percentage laoding ----------------------- */}
               <Flex mt="18px">
                <Text mr="6px">Yes</Text>
                {/* <Progress
                      theme={{
                        active: {
                          color: '#BBBAFF',
                          height: '100px'
                        }
                      }}
                   percent={79} 
                   /> */}
              </Flex>

              <Flex mt="18px">
                <Text mr="6px">No</Text>
                {/* <Progress
                      theme={{
                        active: {
                          color: '#BBBAFF',
                          height: '100px'
                        }
                      }}
                   percent={21} 
                   /> */}
              </Flex>
            </Flex>
         </Flex>
         </Link>
       </Stack>
          </Container>
       </Suspense>
    
       
      <Footer />
    </Flex>
    </Box>
     : 
     <StopErrorMessage />
    }
    </>
  )
}

export default Proposals


const useStyles = () => {
  return {
    root: {
      backgroundColor: "#FBFDFF",
      // height: "10vh",
      // borderBottomLeftRadius: 20,
      // borderBottomRightRadius: 20,
    },
    protocol: {
      color: "red",
      fontSize: 40,
      paddingInline: 30,
    },
    protocolWelcomeText: {
       fontSize: "25px",
       width: "100%",
       fontWeight: "600",
       lineHeight: "165%",
       color: "black",
    },
    protocolBox: {
      h: "300px",
      w: "100%",
      bgRepeat: "no-repeat",
      bgSize: "cover",
      pt: "50px",
      px: {
        base: "0%",
        md: "5%",
      },
      mb: "30px"
    },
    protocolInnerBox1: {
      w: {
        base: "60vw",
        md: "30vw",
      },
      h: "90%",
    },
    protocolInnerBox2: {
      w: {
        base: "50vw",
        md: "35vw",
      },
      h: "90%",
      overflow: "hidden",
      // zIndex: 3000000,
    },
    homeBox2: {
      h: "600px",
      w: "100%",
      bgRepeat: "no-repeat",
      bgSize: "cover",
      pt: "",
      px: {
        base: "0%",
        md: "5%",
      },
    },
    outerBox: {
      bg: "transparent",
      h: "180px",
      w: "100%",
      justify: "space-evenly",
    },
    outerBox2: {
      // h: "500px",
      // w: "100%",
      mt: "100px",
      justify: "space-evenly",
    },
    joinText: {
      fontSize: ["18px"],
      width: "100%",
      color: "white",
      my: {
        base: "18px",
        md: "25px",
      },
      fontWeight: "500"
    },
    fontBold: {
      fontWeight: "600",
      fontSize: "18px",
      lineHeight: "165%",
     },
  };
};