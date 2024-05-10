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
    Avatar,
    Spinner,
} from '@chakra-ui/react'
import Lottie from "lottie-react";
import loadingAnimation from '../../lottie/98194-loading.json'
import successAnimation from '../../lottie/90646-payment-success.json'
import errorAnimation from '../../lottie/97670-tomato-error.json'
import secureLogo from "../../assets/SecureDex.svg"
import { NumbAbbr, ShortAddress } from '../../hooks/helpers';
import { useAccount } from 'wagmi';
import { ExternalLinkIcon } from '@chakra-ui/icons';

const style = {
    height: 300,
  };
  

const TransactionLoaderModal = ({
  transactionLoadingIsOpen,
  transactionLoadingOnClose,
  TransactionLoadingOnOpen,
  success,
  error,
  tokenLoading,
  tokenWaitLoading,
  coverLoading,
  amountCovered,
  coverData
}) => {


    const { address } = useAccount()


  return (
    <>
        <Modal isOpen={transactionLoadingIsOpen} onClose={transactionLoadingOnClose}
        isCentered
        blockScrollOnMount={true}
        scrollBehavior={"inside"}
        motionPreset="slideInBottom"
        >
        <ModalOverlay bg="#00000020" backdropFilter="auto" backdropBlur="2px" />
        <ModalContent w={{ base: "90vw", md: "60vw" }} borderRadius={0}>
          <ModalCloseButton />
          <ModalBody p="40px 80px">
            {
              success ?
              <Lottie
                animationData={successAnimation}
                style={style}
              /> :
              error ?
              <Lottie
                animationData={errorAnimation}
                style={style}
              /> :
              <Lottie
                animationData={loadingAnimation}
                style={style}
              />
            }
              <Flex flexDir="column" justify="center">
                {
                  success ?
                  <>
                    <Text fontSize="18px" textAlign="center" fontWeight={600}>Transaction Completed</Text>
                    <Text fontSize="13px" textAlign={'center'}>Your have successfully created an insurance cover</Text>
                  </> :
                  error ?
                  <>
                    <Text fontSize="18px" textAlign="center" fontWeight={600}>Error</Text>
                    <Text fontSize="13px" textAlign={'center'}>There is an error in your ransaction</Text>
                  </> :
                  <>
                  <Text fontSize="18px" textAlign={'center'} fontWeight={600}>Transaction Processing...</Text>
                  <Text fontSize="13px" textAlign={'center'}>Your request is being processed, please be patient</Text>
                </>
                }

                 <Flex flexDir="row" justify="space-between" mt="10px">
                        <Text fontSize="18px" fontWeight={500}>Amount Covered</Text>
                        <Flex justify="center" alignItems="center">
                          <Avatar src={secureLogo} size="xs" />
                          <Text color="#645C5E" fontSize="16px" fontWeight={600}>{NumbAbbr(amountCovered)} USDC</Text>
                        </Flex>
                 </Flex>
              </Flex>


              <Flex flexDir="row" justify="space-between" mt="10px">
                        <Text fontSize="18px" fontWeight={500}>Wallet address</Text>
                        <Flex justify="center" alignItems="center">
                            <Text color="#645C5E" fontSize="16px"
                             fontWeight={600}
                             >
                                {ShortAddress(address)}
                                </Text>
                        </Flex>
                 </Flex>
           
          </ModalBody>

          <ModalFooter justifyContent="center" align="center">
            {
              (tokenLoading || tokenWaitLoading) ?
              <Button
              w="100%"
              bg="#3a7cdf"
              borderRadius="15px"
              color="white"
              _hover={{
                "backgroundColor": "#91b6ed"
              }}
              >
                <Flex gap={2}>
                  Awaiting User Approval 
                  <Spinner size="sm"/>
                </Flex>
              </Button>:
              (coverLoading || success ) ?
              <Button as="a"
                href={`https://testnet.ftmscan.com/tx/${coverData?.hash}`}
                target="_blank"
                w="100%"
                bg="#3a7cdf"
                borderRadius="15px"
                color="white"
                _hover={{
                  "backgroundColor": "#91b6ed"
                }}
              >
                View Transaction <ExternalLinkIcon ml='2px' />
              </Button>:
              <Button
              w="100%"
              bg="#3a7cdf"
              borderRadius="15px"
              color="white"
              _hover={{
                "backgroundColor": "#91b6ed"
              }}
              >
              Processing <Spinner size="xs" ml="2px" />
              </Button>
            }
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default TransactionLoaderModal
