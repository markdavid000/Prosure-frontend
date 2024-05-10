import React, {Suspense, lazy, useState, useContext} from 'react'
import { 
  Flex, 
  Box, 
  Text, 
  Spinner, 
  Image, 
  HStack, 
  Stack,
  Divider,
  Avatar,
  Center,
  useDisclosure,
  Select
} from "@chakra-ui/react"
import Container from '../components/Container';
import Footer from '../components/Footer3';
import { nanoid } from 'nanoid';
import secureLogo from '../assets/shield-tick.svg'
import ethereumLogo from '../assets/ethereum 1.svg'
import uniswapLogo from '../assets/uniswap 1.svg';
import { StopScreenMessageContext } from '../constants/stopScreenMessage';
import StopErrorMessage from '../components/StopErrorMessage';

const NavBar = lazy(() => import("../components/Navbar"));

const Claims = () => {

    const { root, root2, font3, font4, font5  } = useStyles();

    const [buttonHere, setButtonHere] = useState(false);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const { isMobile } = useContext(StopScreenMessageContext);

  return (
    <>
     {!isMobile ?
    <Box w="100%">
          <Suspense
        // fallback={<Skeleton isLoaded={true} w={"100%"} h={"48px"}></Skeleton>}
        fallback={<Spinner size="lg" />}
      >
        <NavBar />
      </Suspense>
    <Box w={"100%"} {...root}>
      <Suspense
        fallback={<Spinner size="md" />}
      >
        <Container>
        <Stack mt="20px" p="50px">
            
           <Flex flexDir="column">
              {/* --------------------- Insure Claims --------------------------- */}
              <Flex flexDir="row" justify="space-between">
                <Flex flexDir="column">
                 <Text fontSize="16px" fontWeight="600">Insurance Claims</Text>
                 <Text fontSize="14px" fontWeight="400">Check out the previous insurance claims made.</Text>
                </Flex>

                <Flex justify="center" alignItems="center">
                <Text fontSize="18px" fontWeight="500" mr="4px">Filterby status:</Text>
                    {/* Select one */}
                    <Select placeholder='All' _placeholder={{ color: "#49454F"}} width={"30%"}
                     _focus={{ boxShadow: "none" }}
                    >
                      <option value='option1'>Option 1</option>
                      <option value='option2'>Option 2</option>
                      <option value='option3'>Option 3</option>
                    </Select>

                </Flex>
              </Flex>
             
                {/* ---------------------------------------- Tabs -------------------------- */}
               <Flex flexDir="row" justify="space-between" mt="30px">
                <Text color="#352F30" fontWeight="600" fontSize="14px">Chain</Text> 
                <Text color="#645C5E" fontWeight="500" fontSize="14px">Claim ID</Text> 
                <Text color="#645C5E" fontWeight="500" fontSize="14px">Product</Text> 
                <Text color="#645C5E" fontWeight="500" fontSize="14px">Claim Amount</Text> 
                <Text color="#645C5E" fontWeight="500" fontSize="14px">Status</Text> 
                <Text ></Text> 
               </Flex>
               <Divider border="1px solid #6750A4" mt="15px" />

          {/* -------------------------------------- Tab Info -------------------------------- */}
          {/* {listedCover.map((e, i) => ( */}
         <Flex flexDir="row" justify="space-between" mt="15px" {...root2} key={nanoid()}>
            <>
          <Flex>
           <Flex justify="center" alignItems="center">
            <Avatar boxSize="30px" src={ethereumLogo} mr="8px" />
            <Text {...font5}>Fantom</Text>
          </Flex>
          </Flex>
           {/* -------------------------- Detail 2 Claim ID ----------------------- */}
          <Flex justify="center" alignItems="center">
            <Text {...font5}>01</Text>
          </Flex>

            {/* -------------------------- Detail 3 Product----------------------- */}
          <Flex>
          <Avatar boxSize="30px" src={uniswapLogo} mr="8px" />
            <Flex flexDir="column">
                <Text {...font3}>Uniswap</Text>
                <Flex justify={"center"} alignItems="center">
                 <Image src={secureLogo} boxSize={"20px"} mr="4px" />
                  <Text {...font4}>Bundled cover</Text>
                </Flex>
            </Flex>
          </Flex>
            {/* -------------------------- Detail 5 ----------------------- */}
            <Flex justify="center" alignItems="center">
              <Text {...font5}>4,000.00 USDT</Text>
            </Flex>

          {/* ----------------------------- withdrwal button ------------------- */}
          {buttonHere ? (
          <HStack flexDir="row" justify="space-between">                 
                 {/* ------------------------ Button Action here ----------------- */}
                  <Center bg="#DEFFD9" borderRadius="10px" p="6px 10px" cursor="pointer">
                    <Text fontSize="12px" fontWeight="500">Paid</Text>
                  </Center> 
          </HStack>
            ): (
              <HStack flexDir="row" justify="center">                 
               {/* ------------------------ Button Action here ----------------- */}
                <Center bg="#FFDCC1" borderRadius="10px" p="6px 10px" cursor="pointer"
                >
                  <Text fontSize="12px" fontWeight="500">Submitted</Text>
                </Center> 
                </HStack>
            //    --------------------------- Rejected button -----------------------
            //     <HStack flexDir="row" justify="center">                 
            //    {/* ------------------------ Button Action here ----------------- */}
            //     <Center bg="#FFD9E2" borderRadius="10px" p="6px 10px" cursor="pointer"
            //     >
            //       <Text fontSize="12px" fontWeight="500">Rejected</Text>
            //     </Center> 
            //     </HStack>
            )}
                {/* -------------------------- nothing here.. just leave it ----------------------- */}
                <Flex justify="center" alignItems="center">
              <Text {...font5}></Text>
            </Flex>

          </>
             </Flex>
          {/* ))} */}
            </Flex>

    
        </Stack>
      </Container>
      </Suspense>
      

      {/* Footer is here */}
      <Footer />
    </Box>
    </Box>
       : 
       <StopErrorMessage />
      }
    </>
  )
}

export default Claims


const useStyles = () => {
    return {
      root: {
        backgroundColor: "#FBFDFF",
        // w: "100%",
        // mt: "108px",
        // pt: "3%",
        // overflow: "hidden",
        // pb: "3%",
        // px: "0px",
      },
      root2: {
        bg:"white",
        shadow: "0px 4px 61px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        h: "88px",
        p: "18px 15px"
      },
      fontBold: {
        fontWeight: "600",
        fontSize: "18px",
        lineHeight: "165%",
       },
       font: {
        fontWeight: "500",
        fontSize: "14px",
        lineHeight: "165%",
       },
       font2: {
        fontWeight: "500",
        fontSize: "12px",
        lineHeight: "24px",
       },
       font3: {
        fontWeight: "600",
        fontSize: "12px",
        lineHeight: "24px",
       },
       font4: {
        fontWeight: "500",
        fontSize: "8px",
        lineHeight: "24px",
       },
       font5: {
        fontWeight: "500",
        fontSize: "12px",
        lineHeight: "24px",
        color: "#645C5E"
       },
       font6: {
        fontWeight: "500",
        fontSize: "12px",
        lineHeight: "24px",
        color: "#487547"
       },
       font7: {
        fontWeight: "500",
        fontSize: "16px",
        lineHeight: "125%",
       },
    }

}