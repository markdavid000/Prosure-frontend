import React, {Suspense, lazy, useState, useContext} from 'react'
import { 
  Flex, 
  Box, 
  Text, 
  Spinner, 
  Image, 
  HStack, 
  Center,
  keyframes, 
  useDisclosure,
  Button,
  Avatar,
  Stack,
  Divider,
} from '@chakra-ui/react'
import Footer from '../components/Footer3';
import Container from '../components/Container';
import { nanoid } from 'nanoid';
import { Link } from 'react-router-dom';
import '../constants/pagination.css'
import { votersList } from '../utils/dashCard';
import uniswapLogo from '../assets/uniswap 1.svg'
import useCollapse from 'react-collapsed';
// import { Progress } from 'react-sweet-progress';
// import "react-sweet-progress/lib/style.css";
import arrowLeft from '../assets/arrow-left.svg'
import FantomLogo from "../assets/fantomlogo.svg";
import { StopScreenMessageContext } from '../constants/stopScreenMessage';
import StopErrorMessage from '../components/StopErrorMessage';

const NavBar = lazy(() => import("../components/Navbar"));

// const animationKeyframes = keyframes`
//   0% { transform: rotate(360deg); }
//   100% { transform: rotate(0);}
// `;

// const animation = `${animationKeyframes} 3s ease-in-out infinite`;

const ClaimDetails = () => {

    const {
     root,
    } = useStyles();

    const { isOpen, onOpen, onClose } = useDisclosure();
    // ------------------ useDisclosure for TransactionLoaderModal component
    // const {
    //   isOpen: transactionLoadingIsOpen,
    //   onOpen: transactionLoadingOnOpen,
    //   onClose: transactionLoadingOnClose
    // } = useDisclosure();

    // const [isTransactionLoading, setIsTransactionLoading] = useState(false);

    const [isExpanded, setIsExpanded] = useState(false);
    const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded });

    const { isMobile } = useContext(StopScreenMessageContext);
  
  return (
    <>
     {!isMobile ?
    <Box w={"100%"}>
        <Suspense
        // fallback={<Skeleton isLoaded={true} w={"100%"} h={"48px"}></Skeleton>}
        fallback={<Spinner size="lg" />}
      >
        <NavBar />
      </Suspense>
    <Box w={"100%"} {...root}>      
      <Flex w={"100%"} flexDir="column">
        <Link to="/governance">
        <Flex flexDir="row" p="60px"  align="center"> 
            <Image src={arrowLeft} boxSize="15px" mr="10px" />
              <Text fontSize="16px" fontWeight="500">Back</Text>
            </Flex> 
          </Link>
      </Flex>

      <Suspense fallback={<Spinner size="sm" />}>
        <Container>
        <Stack p="20px" flexDir="column" mt="-90px" >
          <Flex flexDir="column"
             p="40px"
          >
        <Flex flexDir="column">
          <Flex flexDir="row" justify="space-between" >
            {/* -------------------------- Left ----------------------- */}
          <>
          <Flex>
            <Avatar boxSize="30px" src={uniswapLogo} mr="8px" />
            <Flex flexDir="column">
                <Text fontSize="16px" fontWeight="600">Uniswap protocol Claim</Text>
                {/* --------------- wallet address ----------------- */}
                <Text mt="8px">0x8b93...8b0F</Text>

                   {/* -------------------- Button is action here------------------------------- */}
                <HStack mt="10px">                 
                 {/* ------------------------ Button Action here ----------------- */}
                  <Center bg="#CCFFCB" borderRadius="10px" p="6px 10px" cursor="pointer">
                    <Text fontSize="14px" fontWeight="400">Voting in progress</Text>
                  </Center> 
                  <Text color="#645C5E" fontSize="14px" fontWeight="500">3 days left</Text>
               </HStack>

                {/* ------------------------------- detail info -------------------- */}
            <Flex flexDir="column" mt="18px">
              <Text fontSize="14px" textAlign="left" color="#1C1B1F" fontWeight="400" maxWidth="400">
              I am claiming for a total of 300,000 USDC in relation to the UST 
              de-pegging event that occurred from 5/3/22 - 5/13/22. 
              First off, I will give a top-level outline of my claim here. 
              Next, I will forward all necessary and comprehensive materials 
              regarding eligibility criteria, proof of loss, Proofs checklist 
              and claim amount to claims@insurace.io.
              ETH wallet used for Cover purchase  = 0xd0eeED205765Aefd46E1a91907FA17276178e0FeTerra 
              wallet holding UST/aUST (wallet suffering de-peg loss) = 
              terra1agf8794ql04yw7fa9t59z6nu4j2383qhdanmev Total Loss Amount 
              from depeg = 2,051,389.65 USD, of which - 1,551,389.65 UST available
               on my Terra wallet: terra1agf8794ql04yw7fa9t59z6nu4j2383qhdanmev - 300,000 
               Wormhole UST bridged to my ETH wallet containing cover protection (as advised):
                0xd0eeED205765Aefd46E1a91907FA17276178e0Fe - 200,000 Wormhole UST bridged to my 
                AVAX wallet: 0xd0eeED205765Aefd46E1a91907FA17276178e0Fe (associated with another 
                separate cover purchase, and will file for a claim separately). Claim Amount =
                 300,000 USDC (Since the total loss amount is much greater than the cover amount 
                 purchased, a claim for maximum allowed cover amount is taken).
        {/* ----------------------------- Slice moren Text here inside the getCollapseProps -------------------------- */}
                <Text {...getCollapseProps()}
                fontSize="14px" color="#1C1B1F" fontWeight="400"
                >
                If you have any questions or concerns please don't hesitate to contact me. 
                If something's missing, kindly let me know, and I will provide everything necessary!
                 High regards,
                 Jade
                </Text>
                  <Text fontSize="14px" fontWeight="500" {...getToggleProps({
                    onClick: () => setIsExpanded((prev) => !prev),
                  })}>
                     {isExpanded ? 'Collapse' : '....Read more' }
                  </Text>
              </Text>
                
            </Flex>
            </Flex>
          </Flex>
    
            {/* ------------------------------------- Right ----------------------------------------- */}
           <Flex flexDir="column">

            <HStack flexDir="row" justify="space-between"
             borderLeft="5px solid #FF897D"
             bg="linear-gradient(0deg, #FFFFFF, #FFFFFF), #FFFBFE"
             p="20px 40px"
             borderRadius="8px"
            >     
             <Flex flexDir="column" mr="20px">
             <Text fontSize="16px" fontWeight="600">Claim info.</Text> 
             <Text fontSize="16px" fontWeight="500" mt="10px">Chain</Text>  
             <Text fontSize="16px" fontWeight="500" mt="10px">Claim ID</Text>  
             <Text fontSize="16px" fontWeight="500" mt="10px">Claim date</Text>  
             <Text fontSize="16px" fontWeight="500" mt="10px">Claim amount</Text>  
            </Flex>
    
            <Flex flexDir="column" mr="20px">
             <Text>.</Text> 
             <Flex alignItems="center" mt="10px">
              <Avatar src={FantomLogo} boxSize="20px" mr="5px" />
              <Text fontSize="14px" color="#645C5E" fontWeight="500">Fantom</Text> 
             </Flex> 
             <Text fontSize="14px" fontWeight="500" mt="10px">64</Text>  
             <Text fontSize="14px" color="#645C5E" fontWeight="500" mt="10px">21/01/2023 - 30/05/2023</Text>  
             <Text fontSize="14px" color="#645C5E" fontWeight="500" mt="10px">18,000.00 USDC</Text>  
            </Flex>
           </HStack>

             {/* -------------------------------------  Cover info. ---------------------------------------*/}

           <HStack flexDir="row" justify="space-between"
             borderLeft="5px solid #FF897D"
             bg="linear-gradient(0deg, #FFFFFF, #FFFFFF), #FFFBFE"
             p="20px 40px"
             borderRadius="8px"
             mt="40px"
            >     
             <Flex flexDir="column" mr="20px">
             <Text fontSize="16px" fontWeight="600">Cover info.</Text> 
             <Text fontSize="16px" fontWeight="500" mt="10px">Chain</Text>  
             <Text fontSize="16px" fontWeight="500" mt="10px">Cover type</Text>  
             <Text fontSize="16px" fontWeight="500" mt="10px">Owner</Text>  
             <Text fontSize="16px" fontWeight="500" mt="10px">Active cover amount</Text> 
             <Text fontSize="16px" fontWeight="500" mt="10px">Total cover amount</Text>  
             <Text fontSize="16px" fontWeight="500" mt="10px">Cover period</Text>   
            </Flex>
    
            <Flex flexDir="column" mr="20px">
             <Text>.</Text>
             <Flex alignItems="center" mt="10px">
              <Avatar src={uniswapLogo} boxSize="20px" mr="5px" />
              <Text fontSize="14px" color="#645C5E" fontWeight="500">InstaDapp</Text> 
             </Flex>  
             <Flex alignItems="center" mt="10px">
              <Avatar src={FantomLogo} boxSize="20px" mr="5px" />
              <Text fontSize="14px" color="#645C5E" fontWeight="500">Fantom</Text> 
             </Flex> 
             <Text fontSize="14px" fontWeight="500" mt="10px">Smart contract vulnerability</Text> 
             <Text fontSize="14px" fontWeight="500" mt="10px">0x8b93...8b0F</Text>   
             <Text fontSize="14px" color="#645C5E" fontWeight="500" mt="10px">18,000.00 USDC</Text>  
             <Text fontSize="14px" color="#645C5E" fontWeight="500" mt="10px">25,000.00 USDC</Text> 
             <Text fontSize="14px" color="#645C5E" fontWeight="500" mt="10px">21/01/2023 - 30/05/2023</Text>   
            </Flex>
           </HStack>
              
              {/* -------------------------------------  Cast your Vote ---------------------------------------*/}
            <HStack flexDir="column"
             p="20px 40px"
             align="start"
             mt="40px"
            >
            <Text fontSize="16px" fontWeight="600">Cast your Vote</Text> 
             <Flex flexDir="column" pt="24px">
                 {/* ------------------------ Button Action here ----------------- */}
                <Button 
                 borderRadius="40px"
                 bg="white"
                 boxShadow="0px 4px 61px rgba(0, 0, 0, 0.1)"
                 width="400px"
                 h="60px"
                 >
                 <Text  fontSize="14px" fontWeight="600">Yes</Text>
                </Button>

                   {/* ------------------------ Button Action here ----------------- */}
                <Button 
                 borderRadius="40px"
                 bg="white"
                 boxShadow="0px 4px 61px rgba(0, 0, 0, 0.1)"
                 width="400px"
                 h="60px"
                 mt="20px"
                 >
                 <Text  fontSize="14px" fontWeight="600">No</Text>
                </Button>

            </Flex>
    
           </HStack>

    
              {/* -------------------------------------  Cast your Vote ---------------------------------------*/}
              <HStack flexDir="column"
             p="20px 40px"
             align="start"
             mt="20px"
            >
            <Text fontSize="16px" fontWeight="600">Current results</Text> 
            
             <Flex pt="24px">
                 {/* ------------------------ Progress Action here ----------------- */}
           
                <Flex flexDir="column">
                <Text fontSize="16px" fontWeight="500">Yes</Text>
                {/* <Progress
                  type="circle"
                  strokeWidth={5}
                  width={70}
                  percent={79}
                  theme={{
                    active: {
                      color: '#BBBAFF',
                    }
                  }}
                /> */}
                 <Text mt="5px" fontSize="16px" fontWeight="600">1,205 votes</Text>
              </Flex>
                
                   {/* ------------------------ Progress Action here ----------------- */}
              <Flex flexDir="column" ml="40px">
              <Text fontSize="15px" fontWeight="500">No</Text>
                {/* <Progress
                  type="circle"
                  strokeWidth={5}
                  width={70}
                  percent={21}
                  theme={{
                    active: {
                      color: '#BBBAFF',
                    }
                  }}
                /> */}
                 <Text mt="5px" fontSize="16px" fontWeight="600">208 Votes</Text>
              </Flex>
            </Flex>
    
           </HStack>
           
           </Flex>
          </>

         </Flex>

         <Divider border="1px solid #CFC4C5" mt="50px" />

         <Flex mt="30px" flexDir="column"
         >
          <Flex alignItems="center" mb="30px">
          <Center
             bg="#CCFFCB"
             color="black"
             borderRadius="10px"
             p="6px 10px"
             mr="10px"
            >
              {/* ------------------------------- All Vote Numbers ------------------------------- */}
            <Text fontSize="14px">1413</Text>
            </Center>
            <Text fontWeight="600" fontSize="16px">Votes</Text>
          </Flex>

       
            <Flex flexDir="column"
            bg="white" boxShadow="2px 4px 30px rgba(109, 105, 105, 0.15)"
            p="40px"
            borderRadius="20px"
            border="1px solid #6750A4"
          >
              <>
               {votersList.map((e, i) => (
               <Flex flexDir="row" justify="space-between" mt="30px" key={nanoid()}
                borderBottom="1px solid #CFC4C5"
               >
                <Flex alignItems="center">
                  <Avatar src={e.avatar} boxSize="25px" mr="6px" />
                  <Text fontWeight="600" color="#645C5E" fontSize="16px">{e.address}</Text> 
                </Flex>
                <Text fontWeight="600" color="#645C5E" fontSize="16px">{e.votedecision}</Text> 
                <Text fontWeight="600" color="#645C5E" fontSize="16px">{e.ensname}</Text> 
               </Flex>
                 ))}
                  {/* <Divider border="1px solid " mt="12px" /> */}
               </>
       
          </Flex>
         </Flex>

         </Flex>
        
         </Flex>
       </Stack>
          </Container>
       </Suspense>
    
       
      <Footer />
    </Box>
    </Box>
       : 
       <StopErrorMessage />
      }
    </>
  )
}

export default ClaimDetails


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