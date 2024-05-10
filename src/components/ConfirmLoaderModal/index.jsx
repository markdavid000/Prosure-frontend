import React from 'react'
import { Flex,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
    Image,
    useDisclosure,
} from '@chakra-ui/react'
import Lottie from "lottie-react";
import loadingAnimation from '../../lottie/98194-loading.json'
import successAnimation from '../../lottie/90646-payment-success.json'
import uniswapLOGO from '../../assets/uniswap 1.svg'

const style = {
    height: 300,
  };
  
const ConfirmLoaderModal = ({confirmLoadingIsOpen, confirmLoadingOnClose, confirmLoadingOnOpen}) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
        <Modal isOpen={confirmLoadingIsOpen} onClose={confirmLoadingOnClose}
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
              animationData={loadingAnimation}
              style={style}
              />
              {/* --------------- ends of Loading animation -------------------- */}
              <Flex flexDir="column" justify="center">
                 <Text fontSize="18px" textAlign={"center"} 
                 fontWeight={600}>Transaction Processing...</Text>

                 <Flex flexDir="row" justify="space-between" mt="10px">
                        <Text fontSize="18px" fontWeight={500}>Product</Text>
                        <Flex justify="center" alignItems="center">
                            <Image src={uniswapLOGO} boxSize="25px" />
                            <Text color="#645C5E" fontSize="16px">InstadApp</Text>
                        </Flex>
                 </Flex>

                 <Flex flexDir="row" justify="space-between" mt="10px">
                        <Text fontSize="18px" fontWeight={500}>Amount Staked</Text>
                        <Flex justify="center" alignItems="center">
                            {/* <Image src={uniswapLOGO} boxSize="25px" /> */}
                            <Text color="#645C5E" fontSize="16px"
                             fontWeight={600}
                              >
                                8,000 USDC
                              </Text>
                        </Flex>
                 </Flex>
              </Flex>


              <Flex flexDir="row" justify="space-between" mt="10px">
                        <Text fontSize="18px" fontWeight={500}>Wallet address</Text>
                        <Flex justify="center" alignItems="center">
                            <Text color="#645C5E" fontSize="16px"
                             fontWeight={600}
                            >
                              0x8b93...8b0F
                            </Text>
                        </Flex>
                 </Flex>
           
          </ModalBody>

          <ModalFooter justifyContent="center" align="center">
            <Button 
             bg="linear-gradient(0deg, rgba(208, 188, 255, 0.14), rgba(208, 188, 255, 0.14)), #1C1B1F"
             borderRadius="20px" 
             color="white"
             fontSize="14px"
             fontWeight={400}
             p="10px 100px"
             _hover={{
                color: "white"
             }}
             onClick={onOpen}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal> 


     {/* ------------------------------ Confirm Completed ---------------------------- */}

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
            {/*  ---------------------- Success animation ------------------------ */}
            <Lottie
              animationData={successAnimation}
              style={style}
              />
              {/* --------------- ends of Loading animation -------------------- */}
              <Flex flexDir="column" justify="center">
                 <Text fontSize="18px" textAlign={"center"} 
                 fontWeight={600}>Transaction Committed</Text>

               <Text fontSize="16px" textAlign={"center"} 
                 fontWeight={500} mt="5px"
                 >
                   You have successfully withdrawn your stake profit!
                 </Text>

                 <Flex flexDir="row" justify="space-between" mt="10px">
                        <Text fontSize="18px" fontWeight={500}>Product</Text>
                        <Flex justify="center" alignItems="center">
                            <Image src={uniswapLOGO} boxSize="25px" />
                            <Text color="#645C5E" fontSize="16px">InstadApp</Text>
                        </Flex>
                 </Flex>

                 <Flex flexDir="row" justify="space-between" mt="10px">
                        <Text fontSize="18px" fontWeight={500}>Amount Staked</Text>
                        <Flex justify="center" alignItems="center">
                            {/* <Image src={uniswapLOGO} boxSize="25px" /> */}
                            <Text color="#645C5E" fontSize="16px"
                             fontWeight={600}
                              >
                                8,000 USDC
                              </Text>
                        </Flex>
                 </Flex>
              </Flex>


              <Flex flexDir="row" justify="space-between" mt="10px">
                        <Text fontSize="18px" fontWeight={500}>Wallet address</Text>
                        <Flex justify="center" alignItems="center">
                            <Text color="#645C5E" fontSize="16px"
                             fontWeight={600}
                             >
                                0x8b93...8b0F
                                </Text>
                        </Flex>
                 </Flex>
           
          </ModalBody>

          <ModalFooter justifyContent="center" align="center">
            {/* <Link to="/risk-assessor-dashboard"> */}
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
             onClose={onClose}
             >
             Close
            </Button>
            {/* </Link> */}
          </ModalFooter>
        </ModalContent>
      </Modal> 
      </>
    
    </>
  )
}

export default ConfirmLoaderModal
