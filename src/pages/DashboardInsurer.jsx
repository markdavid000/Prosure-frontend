import React, {Suspense, lazy, useState, useContext} from 'react'
import { 
  Flex, 
  Box, 
  Text, 
  Spinner, 
  Image, 
  HStack, 
  SimpleGrid, 
  Stack,
  Divider,
  Spacer,
  Avatar,
  Center,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  InputRightAddon,
  InputGroup,
} from "@chakra-ui/react"
import Container from '../components/Container';
import Footer from '../components/Footer2';
import { dashCardData, myInsureCover, myInsureClaim } from '../utils/dashCard';
import { nanoid } from 'nanoid';
import secureLogo from '../assets/shield-tick.svg'
import walletIcon from '../assets/empty-wallet.svg'
import ConfirmLoaderModal from '../components/ConfirmLoaderModal';
import Lottie from "lottie-react"
import warningAnimation from '../lottie/88003-blue-warning.json';
import { StopScreenMessageContext } from '../constants/stopScreenMessage';
import StopErrorMessage from '../components/StopErrorMessage';

const style = {
  height: 300,
};

const NavBar = lazy(() => import("../components/Navbar"));
const DashboardCardItem = lazy(() => import("../components/DashboardCardItem/index"));

const Dashboard = () => {

    const { root, root2, font3, font4, font5 } = useStyles();

    const [buttonHere, setButtonHere] = useState(false);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const { isOpen: warningIsOpen, 
      onOpen: warningOnOpen, 
      onClose: warningOnClose 
     } = useDisclosure();

    const { isOpen: withdrawCoverIsOpen,
       onOpen: withdrawCoverOnOpen,
       onClose: withdrawCoverOnClose
    } = useDisclosure();

    const { isOpen: confirmLoadingIsOpen, 
         onOpen: confirmLoadingOnOpen, 
         onClose: confirmLoadingOnClose 
        } = useDisclosure();

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
           
        <Flex>
              <SimpleGrid
                columns={3}
                spacing="40px"
                spacingX={"60px"}
                w={"100%"}
              >
                <Suspense fallback={<Spinner size="sm" />}>
                  {dashCardData.map((e, i) => (
                    <DashboardCardItem
                      key={nanoid()}
                      iconnum={e.iconnum}
                      cardName={e.label}
                      color={e.color}
                    />
                  ))}
                </Suspense>
              </SimpleGrid>
            </Flex>

              {/* --------------------- My Insurance covers --------------------------- */}
            <Flex flexDir="column">
              <Flex flexDir="row" mt="40px" justify="space-between">
                <Flex flexDir="column">
                  <Text fontSize="16px" fontWeight="600">My Insurance covers</Text>
                  <Text fontSize="14px" fontWeight="400">All of your insured protocols and cover details</Text>
                </Flex>
             
                <Flex flexDir="column">
                <Button borderRadius="100px" bg="white" border="2px solid #3E7FDF"
                 _hover={{
                    bg: "none"
                 }}
                >
                 <Text fontSize="14px" fontWeight="500">View all covers</Text>
                 </Button>
                </Flex>
                
              </Flex>
                {/* ---------------------------------------- Tabs -------------------------- */}
               <Flex flexDir="row" justify="space-between" mt="30px">
                <Text color="#352F30" fontWeight="600" fontSize="14px">Products</Text> 
                <Text color="#645C5E" fontWeight="500" fontSize="14px">Chains</Text> 
                <Text color="#645C5E" fontWeight="500" fontSize="14px">Covered Address</Text> 
                <Text color="#645C5E" fontWeight="500" fontSize="14px">Covered period</Text> 
                <Text color="#645C5E" fontWeight="500" fontSize="14px">Status</Text> 
                <Text color="#645C5E" fontWeight="500" fontSize="14px">Links</Text> 
                <Text></Text> 
                {/* <Text></Text>  */}
                {/* <Text></Text>  */}
               </Flex>
               <Divider border="1px solid #6750A4" mt="15px" />

          {/* -------------------------------------- Tab Info -------------------------------- */}
          {myInsureCover.map((e, i) => (
         <Flex flexDir="row" justify="space-between" mt="15px" {...root2} key={nanoid()}>
          {/* -------------------------- Detail 1 ----------------------- */}
            <>
          <Flex>
            <Avatar boxSize="20px" src={e.logo} mr="5px" />
            <Flex flexDir="column">
                <Text {...font3}>{e.logoname}</Text>
                <Flex justify={"center"} alignItems="center">
                 <Image src={secureLogo} boxSize={"15px"} mr="2px" />
                  <Text {...font4}>{e.subtile}</Text>
                </Flex>
            </Flex>
          </Flex>
           {/* -------------------------- Detail 2 Chains ----------------------- */}
           <Flex justify="center" alignItems="center">
            <Avatar boxSize="30px" src={e.logo2} mr="8px" />
            <Text {...font5}>{e.chains}</Text>
          </Flex>
           {/* -------------------------- Detail 3 Covered Address ----------------------- */}
           <Flex justify="center" alignItems="center">
            <Text {...font5}>{e.coveredAddress}</Text>
          </Flex>

            {/* -------------------------- Detail Covered Period ----------------------- */}
            <Flex justify="center" alignItems="center">
            <Text {...font5}>{e.coveredPeriod}</Text>
           </Flex>

            {/* -------------------------- Detail Covered Period ----------------------- */}
            <Flex justify="center" alignItems="center">
            <Button borderRadius="10px" bg="#DEFFD9">
                 <Text fontSize="14px" fontWeight="500">Active</Text>
                 </Button>
           </Flex>
           
        
          {/* ----------------------------- Claim Button ------------------- */}
          {!buttonHere ? (
          <HStack flexDir="row" justify="space-between">                 
                 {/* ------------------------ Button Action here ----------------- */}
                  <Center bg="#3E7FDF" borderRadius="100px" p="10px 15px" cursor="pointer">
                    <Text fontSize="9px" color="white" fontWeight="600">Claim Insurance</Text>
                  </Center> 
          </HStack>
            ): (
               <></>
            )}

                <Flex justify="center" alignItems="center">
                 {/* <Text fontSize="12px" color="#201A1B" fontWeight="600">View claim</Text> */}
           </Flex>
          </>
             </Flex>
          ))}
            </Flex>


               {/* --------------------- My Insurance claims --------------------------- */}
            <Flex flexDir="column">
              <Flex flexDir="row" mt="50px" justify="space-between">
                <Flex flexDir="column">
                  <Text fontSize="16px" fontWeight="600">My Insurance claims</Text>
                  <Text fontSize="14px" fontWeight="400">All of your insured protocols and cover details</Text>
                </Flex>
             
                <Flex flexDir="column">
                <Button borderRadius="100px" bg="white" border="2px solid #3E7FDF"
                 _hover={{
                    bg: "none"
                 }}
                >
                 <Text fontSize="14px" fontWeight="500">View all claims</Text>
                 </Button>
                </Flex>
                
              </Flex>
                {/* ---------------------------------------- Tabs -------------------------- */}
               <Flex flexDir="row" justify="space-between" mt="30px">
                <Text color="#352F30" fontWeight="600" fontSize="14px">Products</Text> 
                <Text color="#645C5E" fontWeight="500" fontSize="14px">Claim ID</Text> 
                <Text color="#645C5E" fontWeight="500" fontSize="14px">Chains</Text> 
                <Text color="#645C5E" fontWeight="500" fontSize="14px">Claim Amount</Text> 
                <Text color="#645C5E" fontWeight="500" fontSize="14px">Status</Text> 
                <Text color="#645C5E" fontWeight="500" fontSize="14px">Links</Text> 
                <Text></Text> 
                {/* <Text></Text>  */}
                {/* <Text></Text>  */}
               </Flex>
               <Divider border="1px solid #6750A4" mt="15px" />

          {/* -------------------------------------- Tab Info -------------------------------- */}
          {myInsureClaim.map((e, i) => (
         <Flex flexDir="row" justify="space-between" mt="15px" {...root2} key={nanoid()}>
          {/* -------------------------- Detail 1 ----------------------- */}
            <>
          <Flex>
            <Avatar boxSize="20px" src={e.logo} mr="5px" />
            <Flex flexDir="column">
                <Text {...font3}>{e.logoname}</Text>
                <Flex justify={"center"} alignItems="center">
                 <Image src={secureLogo} boxSize={"15px"} mr="2px" />
                  <Text {...font4}>{e.subtile}</Text>
                </Flex>
            </Flex>
          </Flex>

              {/* -------------------------- Detail 3 Claim ID ----------------------- */}
           <Flex justify="center" alignItems="center">
            <Text {...font5}>{e.chainId}</Text>
          </Flex>

           {/* -------------------------- Detail 2 Chains ----------------------- */}
           <Flex justify="center" alignItems="center">
            <Avatar boxSize="30px" src={e.logo2} mr="8px" />
            <Text {...font5}>{e.chains}</Text>
          </Flex>
           {/* -------------------------- Detail 3 Claim Amount ----------------------- */}
           <Flex justify="center" alignItems="center">
            <Text {...font5}>{e.claimAmount}</Text>
          </Flex>

          {/* ----------------------------- Claim Button ------------------- */}
          {!buttonHere ? (
             <Button borderRadius="10px" bg="#DEFFD9">
              <Text fontSize="12px" fontWeight="500">Completed</Text>
             </Button>
            ): (
                <Button borderRadius="10px" bg="#FFDAD6">
                <Text fontSize="12px" fontWeight="500">In Progress</Text>
                </Button>

                    //   ----------------- Rejected  Button ---------------
                //  <Button borderRadius="10px" bg="#FFB4AB">
                // <Text fontSize="12px" fontWeight="500">Rejected</Text>
                // </Button>
            )}

              {/* -------------------------- View Claim ----------------------- */}
              <Flex justify="center" alignItems="center">
                 <Text fontSize="12px" color="#201A1B" fontWeight="600">View claim</Text>
           </Flex>

           <Flex justify="center" alignItems="center">
                 {/* <Text fontSize="12px" color="#201A1B" fontWeight="600">View claim</Text> */}
           </Flex>
             
          </>
             </Flex>
          ))}
          
            </Flex>


        {/* ---------------------------------- WithDraw Profit -------------------------- */}
         <>
      <Modal isOpen={isOpen} onClose={onClose}
        isCentered
        blockScrollOnMount={true}
        scrollBehavior={"inside"}
        motionPreset="slideInBottom"
        >
        <ModalOverlay bg="#00000020" backdropFilter="auto" backdropBlur="2px" />
        <ModalContent w={{ base: "90vw", md: "60vw" }} borderRadius={0}>
          <ModalCloseButton />
          <ModalBody p="40px 80px">
              <Flex flexDir="column" justify="center">
                 <Text fontSize="16px" textAlign={"center"} 
                 fontWeight={600}>WithDraw Profit</Text>

               <Text fontSize="14px" textAlign={"center"} 
                 fontWeight={500} mt="8px"
                 >
                  Please fill in the following information to withdraw the profit from your stake
                 </Text>
              </Flex>

              <Flex mt="20px" flexDir="column" p="20px">
                 {/* ------------------------------- Input 1 ------------------------------- */}
                 <Flex flexDir="column">
                      <Text fontSize="15px" fontWeight="500">Wallet address</Text>
                        <Spacer />
                        <InputGroup
                          _focus={{ boxShadow: "none" }}
                          as="button"
                          w={"100%"}
                        >
                          <Input
                            placeholder="Enter your wallet address"
                            borderRadius="0"
                            border="0"
                            borderBottom="1px solid #49454F"
                            _placeholder={{
                              color: "#1C1B1F",
                              justifySelf: "flex-end",
                              fontSize: "12px"
                            }}
                            _focus={{ boxShadow: "none" }}
                          />
                        </InputGroup>
                </Flex>

                  {/* ------------------------------- Input 2 ------------------------------- */}
                  <Flex flexDir="column" mt="30px">
                      <Text fontSize="15px" fontWeight="500">Amount</Text>
                        <Spacer />
                        <InputGroup
                          _focus={{ boxShadow: "none" }}
                          as="button"
                          w={"100%"}
                        >
                          <Input
                            placeholder="Enter amount of insurance cover"
                            borderRadius="0"
                            border="0"
                            borderBottom="1px solid #49454F"
                            _placeholder={{
                              color: "#1C1B1F",
                              justifySelf: "flex-end",
                              fontSize: "12px"
                            }}
                            _focus={{ boxShadow: "none"}}
                          />
                          <InputRightAddon borderRadius={0} border="0" bg="footerBgColor">
                           <Text fontSize="12px" fontWeight={500}>USDC</Text>
                           <Image src={walletIcon} ml="4px" boxSize="20px" />
                          </InputRightAddon>
                        </InputGroup>
                </Flex>

              </Flex>
           
          </ModalBody>

          <ModalFooter justifyContent="center" align="center">
            <Button 
             bg="#3E7FDF"
             borderRadius="20px" 
             color="white"
             fontSize="14px"
             fontWeight={400}
             p="10px 100px"
             _hover={{
                color: "white"
             }}
             onClick={confirmLoadingOnOpen}
             >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal> 
        </>

        {/* ----------------------------- Confirm Loading ----------------------- */}
          <ConfirmLoaderModal confirmLoadingIsOpen={confirmLoadingIsOpen} 
            confirmLoadingOnClose={confirmLoadingOnClose}
            confirmLoadingOnOpen={confirmLoadingOnOpen}
           />
                     
        {/* ---------------------------------- Warning Modal -------------------------- */}
         <>
      <Modal isOpen={warningIsOpen} onClose={warningOnClose}
        isCentered
        blockScrollOnMount={true}
        scrollBehavior={"inside"}
        motionPreset="slideInBottom"
        >
        <ModalOverlay bg="#00000020" backdropFilter="auto" backdropBlur="2px" />
        <ModalContent w={{ base: "90vw", md: "60vw" }} borderRadius={0}>
          <ModalCloseButton />
          <ModalBody p="40px 80px">
             {/*  ---------------------- Loading animation ------------------------ */}
             <Lottie
              animationData={warningAnimation}
              style={style}
              />
              {/* --------------- ends of Loading animation -------------------- */}
              <Flex flexDir="column" justify="center">
                 <Text fontSize="16px" textAlign={"center"} 
                 fontWeight={600}>Are you sure you want to withdraw cover for this protocol?</Text>
              </Flex>

            
          </ModalBody>

          <ModalFooter justifyContent="center" align="center">
            <Button 
             bg="#3E7FDF"
             borderRadius="20px" 
             color="white"
             fontSize="14px"
             fontWeight={400}
             p="10px 100px"
             _hover={{
                color: "white"
             }}
             onClick={withdrawCoverOnOpen}
             >
              Proceed
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal> 
        </>
      
        {/* ---------------------------------- WithDraw Cover -------------------------- */}
         <>
        <Modal isOpen={withdrawCoverIsOpen} onClose={withdrawCoverOnClose}
        isCentered
        blockScrollOnMount={true}
        scrollBehavior={"inside"}
        motionPreset="slideInBottom"
        >
        <ModalOverlay bg="#00000020" backdropFilter="auto" backdropBlur="2px" />
        <ModalContent w={{ base: "90vw", md: "60vw" }} borderRadius={0}>
          <ModalCloseButton />
          <ModalBody p="40px 80px">
              <Flex flexDir="column" justify="center">
                 <Text fontSize="16px" textAlign={"center"} 
                 fontWeight={600}>Withdraw Cover</Text>

               <Text fontSize="12px" textAlign={"left"} 
                 fontWeight={500} mt="8px"
                 color="#DE3730"
                 >
                  Please note that this would 30 days to review and process.
                 </Text>
              </Flex>

              <Flex mt="20px" flexDir="column" p="20px">
                 {/* ------------------------------- Input 1 ------------------------------- */}
                 <Flex flexDir="column">
                      <Text fontSize="15px" fontWeight="500">Wallet address</Text>
                        <Spacer />
                        <InputGroup
                          _focus={{ boxShadow: "none" }}
                          as="button"
                          w={"100%"}
                        >
                          <Input
                            placeholder="Enter your wallet address"
                            borderRadius="0"
                            border="0"
                            borderBottom="1px solid #49454F"
                            _placeholder={{
                              color: "#1C1B1F",
                              justifySelf: "flex-end",
                              fontSize: "12px"
                            }}
                            _focus={{ boxShadow: "none" }}
                          />
                        </InputGroup>
                </Flex>

                  {/* ------------------------------- Input 2 ------------------------------- */}
                  <Flex flexDir="column" mt="30px">
                      <Text fontSize="15px" fontWeight="500">Amount</Text>
                        <Spacer />
                        <InputGroup
                          _focus={{ boxShadow: "none" }}
                          as="button"
                          w={"100%"}
                        >
                          <Input
                            placeholder="Enter amount of insurance cover"
                            borderRadius="0"
                            border="0"
                            borderBottom="1px solid #49454F"
                            _placeholder={{
                              color: "#1C1B1F",
                              justifySelf: "flex-end",
                              fontSize: "12px"
                            }}
                            _focus={{ boxShadow: "none"}}
                          />
                          <InputRightAddon borderRadius={0} border="0" bg="footerBgColor">
                           <Text fontSize="12px" fontWeight={500}>USDC</Text>
                           <Image src={walletIcon} ml="4px" boxSize="20px" />
                          </InputRightAddon>
                        </InputGroup>
                </Flex>

              </Flex>
           
          </ModalBody>

          <ModalFooter justifyContent="center" align="center">
            <Button 
             bg="#3E7FDF"
             borderRadius="20px" 
             color="white"
             fontSize="14px"
             fontWeight={400}
             p="10px 100px"
             _hover={{
                color: "white"
             }}
             onClick={confirmLoadingOnOpen}
             >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
        </Modal> 
        </>
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

export default Dashboard


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