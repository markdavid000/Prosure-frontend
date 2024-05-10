import React, {Suspense, lazy, useContext} from 'react'
import { Flex, Box, Spinner, Text, Image, Spacer, Button,
    Avatar,
    Divider
} from '@chakra-ui/react';
import Footer2 from '../components/Footer2';
import { useNavigate } from 'react-router-dom';
import arrowLeft from '../assets/arrow-left.svg';
import uniswapLogo from '../assets/uniswap 1.svg'
import { StopScreenMessageContext } from '../constants/stopScreenMessage';
import StopErrorMessage from '../components/StopErrorMessage';

const NavBar = lazy(() => import("../components/Navbar"));

const DaoMemberPortal = () => {

     const {root} = useStyles();
     let navigate = useNavigate();

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
   
    <Box w={"100%"} {...root}>
      <Flex padding={"40px 80px"} flexDir="column" mt="30px">
         
                 <Flex flexDir="row" align="center"
                  onClick={() => navigate("/governance")}
                  cursor="pointer"
                 > 
                  <Image src={arrowLeft} boxSize="15px" mr="8px" />
                   <Text fontSize="16px" fontWeight="500">Back</Text>
                   </Flex> 
           
       
              <Flex mt="-20px" flexDir="column" p="70px">
                <Flex flexDir="row" justify="space-between"
                  borderRadius="20px"
                  bg="white"
                  boxShadow="0px 4px 61px rgba(0, 0, 0, 0.1)"
                  p="40px"
                >
                  {/* ------------------------------- Input 1 ------------------------------- */}
                 <Flex flexDir="column">
                     <Flex>
                      <Text fontSize="16px" fontWeight="400">#001</Text>
                      <Spacer />
                      <Flex flexDir="column">
                       <Text fontSize="20px" fontWeight="600">Sammiejame.eth</Text>
                       <Flex mt="20px">
                        <Text>0x8b93...8b0F</Text>
                       </Flex>

                      </Flex>
                     </Flex>
                               
          <Flex justifyContent={"center"} align="center" mt="60px">
            <Button bg="#3E7FDF"
              borderRadius="20px"
              p="10px 100px"
              color="white"
              fontSize="14px"
              fontWeight="400"
              >
              Stake in DAO
            </Button>
          </Flex> 
                </Flex>

                     {/* ------------------------------- Input 2 ------------------------------- */}
                <Flex flexDir={"column"}>
                 <Flex flexDir="row" justify="space-between">
                        <Text fontSize="18px" fontWeight={500}>Balance</Text>
                        <Spacer mr="20px" />
                        <Flex>
                            <Text color="#645C5E" fontSize="16px"
                             fontWeight={600}
                              >
                                8,000 USDC
                              </Text>
                        </Flex>
                  </Flex>

                  <Flex flexDir="row" justify="space-between" mt="10px">
                        <Text fontSize="18px" fontWeight={500}>Percentage of DAO</Text>
                        <Spacer mr="20px" />
                        <Flex>
                            <Text color="#645C5E" fontSize="16px"
                             fontWeight={600}
                              >
                                0.21
                              </Text>
                        </Flex>
                  </Flex>


                  <Flex flexDir="row" justify="space-between" mt="10px">
                        <Text fontSize="18px" fontWeight={500}>Voting Power</Text>
                        <Spacer mr="20px" />
                        <Flex>
                            <Text color="#645C5E" fontSize="16px"
                             fontWeight={600}
                              >
                                00.281
                              </Text>
                        </Flex>
                  </Flex>

            <Flex justifyContent={"center"} align="center" mt="30px">
            <Button bg="#ABCBFF"
              borderRadius="20px"
              p="10px 100px"
              color="black"
              fontSize="14px"
              fontWeight="500"
              >
              Withdraw from DAO
            </Button>
          </Flex> 
                </Flex>
               
                </Flex>
              </Flex> 

               <Box mt="-20px" flexDir="column" p="70px">
                <Text fontSize="20px" fontWeight="600" mb="20px">Activities</Text>
                <Flex display="flex" flexDir="column"
                  borderRadius="20px"
                  border="1px solid"
                  borderColor="#A989FF"
                  p="40px"
                  
                >
                  <Text fontSize="20px" fontWeight="600">This Week</Text>

                <Flex mt="20px" flexDir="column" mb="10px">

                <Button bg="#FFDADA"
                 borderRadius="8px"
                 p="8pxpx 10px"
                 fontSize="14px"
                 fontWeight="400"
                 color="black"
                  w="100px"
                 >
                    Voted “No”
                  </Button>

                  <Flex alignItems="center" mt="20px">
                    <Avatar src={uniswapLogo} boxSize="30px" mr="10px"/>
                    <Text fontWeight={600} fontSize="18px">InstadApp Insurance Claim</Text>
                  </Flex>

                  {/* -------------------- Time --------------- */}
                  <Text fontSize="14px" fontWeight="400" mt="10px">22-02-2023, 08:00am</Text>
                </Flex> 

                <Divider border="1px solid #B8D0FF" />

                  <Flex mt="20px" flexDir="column" mb="10px">

                <Button bg="#DAFFE6"
                 borderRadius="8px"
                 p="8pxpx 10px"
                 fontSize="14px"
                 fontWeight="400"
                 color="black"
                  w="100px"
                 >
                    Voted “Yes”
                  </Button>

                  <Flex alignItems="center" mt="20px">
                    <Avatar src={uniswapLogo} boxSize="30px" mr="10px"/>
                    <Text fontWeight={600} fontSize="18px">InstadApp Insurance Claim</Text>
                  </Flex>

                  {/* -------------------- Time --------------- */}
                  <Text fontSize="14px" fontWeight="400" mt="10px">22-02-2023, 08:00am</Text>
                </Flex> 

                </Flex>
              </Box> 
      </Flex>

      {/* Footer here */}
      <Footer2 />
   </Box>
   </Box>
   : 
   <StopErrorMessage />
  }
   </>
  )
}

export default DaoMemberPortal

const useStyles = () => {
    return {
      root: {
        backgroundColor: "#FBFDFF",
      },

    }
}
