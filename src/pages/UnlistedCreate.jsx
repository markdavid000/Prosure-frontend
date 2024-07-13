import React, { Suspense, lazy } from 'react';
import { useState, useContext } from 'react';
import {
  Flex,
  Box,
  Spinner,
  Text,
  Image,
  Spacer,
  Button,
  Input,
  InputRightAddon,
  InputGroup,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  useToast,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Avatar,
  ModalFooter,
} from '@chakra-ui/react';
import Footer2 from '../components/Footer2';
import { Link } from 'react-router-dom';
import arrowLeft from '../assets/arrow-left.svg';
import walletIcon from '../assets/empty-wallet.svg';
import {
  useContractWrite,
  useWaitForTransaction,
  useAccount,
  useContractRead,
} from 'wagmi';
import { erc20Setup, prosureSetup } from '../constants/interactionSetup';
import { ethers } from 'ethers';
import { prosureContract } from '../constants/interactionSetup';
import { ConnectProsure } from '../utils/customConnect';
import { useNavigate } from 'react-router-dom';
import { HexToDecimal, NumbAbbr, RiskLevel } from '../hooks/helpers';
import Lottie from 'lottie-react';
import loadingAnimation from '../lottie/98194-loading.json';
import SecureLogo from '../assets/SecureDex.svg';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import successAnimation from '../lottie/90646-payment-success.json';
import errorAnimation from '../lottie/97670-tomato-error.json';
import { StopScreenMessageContext } from '../constants/stopScreenMessage';
import StopErrorMessage from '../components/StopErrorMessage';

const NavBar = lazy(() => import('../components/Navbar'));

const style = {
  height: 300,
};

const UnlistedCreate = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const { onOpen, isOpen, onClose } = useDisclosure();

  const { root } = useStyles();

  const [protocolName, setProtocolName] = useState('');
  const [domainLink, setDomainLink] = useState('');
  const [amountCovered, setAmountCovered] = useState('');
  const [description, setDescription] = useState('');
  const [sliderValue, setSliderValue] = useState(0);
  const [sliderInput, setSliderInput] = useState(0);

  const { address } = useAccount();
  // approve token
  const {
    data: tokenData,
    isLoading: tokenLoading,
    write: tokenWrite,
  } = useContractWrite({
    mode: 'recklesslyUnprepared',
    ...erc20Setup,
    functionName: 'approve',
    args: [
      prosureContract,
      ethers.utils.parseEther(amountCovered ? amountCovered.toString() : '0'),
    ],
  });

  const { isLoading: tokenWaitLoading } = useWaitForTransaction({
    hash: tokenData?.hash,
    onSuccess() {
      createNewInsure();
      toast({
        title: 'Token Approved',
        description: "You've successfully approved token",
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
    onError(data) {
      console.log('on error error', data);
      toast({
        title: 'Error encountered',
        description: data,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      onClose();
    },
  });

  const {
    data: newInsureData,
    isLoading: newInsureLoading,
    write: createNewInsure,
  } = useContractWrite({
    mode: 'recklesslyUnprepared',
    ...prosureSetup,
    functionName: 'createNewInsure',
    args: [
      protocolName,
      domainLink,
      description,
      ethers.utils.parseEther(amountCovered ? amountCovered.toString() : '0'),
      sliderInput,
    ],
  });

  const {
    isLoading: InsureWaitLoading,
    isSuccess: insureSuccess,
    isError: insureError,
  } = useWaitForTransaction({
    hash: newInsureData?.hash,
    onSuccess() {
      toast({
        title: 'Cover Created',
        description: "You've successfully created cover",
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      setTimeout(() => {
        onClose();
        navigate(-1);
      }, 6000);
    },
    onError(data) {
      console.log('on error error', data);
      toast({
        title: 'Error encountered',
        description: data,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      onClose();
    },
  });

  const { data: tokenReadData } = useContractRead({
    ...erc20Setup,
    functionName: 'allowance',
    args: [address, prosureContract],
  });

  function tokenAuthorization() {
    let amountInput = ethers.utils.parseEther(
      amountCovered ? amountCovered.toString() : '0'
    );
    if (HexToDecimal(tokenReadData?._hex) >= HexToDecimal(amountInput?._hex)) {
      createNewInsure();
    } else {
      tokenWrite();
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    tokenAuthorization();
    onOpen();
  };

  const { isMobile } = useContext(StopScreenMessageContext);

  return (
    <>
      {!isMobile ? (
        <Box w={'100%'} {...root}>
          <Suspense fallback={<Spinner size="sm" />}>
            <NavBar />
          </Suspense>

          <Flex padding={'40px 140px'} flexDir="column" mt="30px">
            <Flex>
              <Flex justify="center" alignItems="center">
                <Link to="/protocols">
                  <Image src={arrowLeft} boxSize="15px" />
                </Link>
                <Spacer mr="5px" />
                <Text fontSize="18px" fontWeight="600" color={'#dde7f9'}>
                  Create insurance cover for unlisted protocol
                </Text>
              </Flex>
            </Flex>
            <Flex gap={10}>
              <Text fontSize="14px" fontWeight={500} mt="8px" color={'#dde7f9'}>
                Please fill in the following information to list a protocol for
                insurance
              </Text>
              {tokenLoading ||
              tokenWaitLoading ||
              newInsureLoading ||
              InsureWaitLoading ? (
                <Text
                  as="u"
                  onClick={onOpen}
                  fontStyle="italic"
                  fontWeight="bold"
                  mt="8px"
                  fontSize="14px"
                  cursor="pointer"
                >
                  Check Transaction Process
                </Text>
              ) : (
                ''
              )}
            </Flex>

            <Flex mt="20px" flexDir="column" p="40px">
              <Flex flexDir="row" justify="space-between">
                {/* ------------------------------- Input 1 ------------------------------- */}
                <Flex flexDir="column" w="25rem">
                  <Text fontSize="15px" fontWeight="500" color={'#868e96'}>
                    Protocol name
                  </Text>
                  <Spacer />
                  <InputGroup
                    _focus={{ boxShadow: 'none' }}
                    as="button"
                    w={'100%'}
                  >
                    <Input
                      placeholder="Enter protocol name"
                      borderRadius="0"
                      color={'#dde7f9'}
                      border="0"
                      borderBottom="1px solid #403268"
                      _placeholder={{
                        color: '#9e9899',
                        justifySelf: 'flex-end',
                        fontSize: '10px',
                      }}
                      _focus={{ boxShadow: 'none', borderBottomColor: 'black' }}
                      type="text"
                      value={protocolName}
                      onChange={e => setProtocolName(e.target.value)}
                    />
                  </InputGroup>
                </Flex>

                {/* ------------------------------- Input 2 ------------------------------- */}
                <Flex flexDir="column" w="25rem">
                  <Text fontSize="15px" fontWeight="500" color={'#868e96'}>
                    Domain link
                  </Text>
                  <Spacer />
                  <InputGroup
                    _focus={{ boxShadow: 'none' }}
                    as="button"
                    w={'100%'}
                  >
                    <Input
                      placeholder="Enter the link to the protocol"
                      borderRadius="0"
                      color={'#dde7f9'}
                      border="0"
                      borderBottom="1px solid #403268"
                      _placeholder={{
                        color: '#9e9899',
                        justifySelf: 'flex-end',
                        fontSize: '10px',
                      }}
                      _focus={{ boxShadow: 'none' }}
                      type="text"
                      value={domainLink}
                      name="domainLink"
                      onChange={e => setDomainLink(e.target.value)}
                    />
                  </InputGroup>
                </Flex>
              </Flex>

              <Flex flexDir="row" justify="space-between" mt="30px">
                {/* ------------------------------- Input 3 ------------------------------- */}
                <Flex flexDir="column" w="31.5rem">
                  <Text fontSize="15px" fontWeight="500" color={'#868e96'}>
                    Amount Covered
                  </Text>
                  <Spacer />
                  <InputGroup
                    _focus={{ boxShadow: 'none' }}
                    as="button"
                    w={'80%'}
                  >
                    <Input
                      placeholder="Enter amount of insurance cover"
                      borderRadius="0"
                      color={'#dde7f9'}
                      border="0"
                      borderBottom="1px solid #403268"
                      _placeholder={{
                        color: '#9e9899',
                        justifySelf: 'flex-end',
                        fontSize: '10px',
                      }}
                      _focus={{ boxShadow: 'none' }}
                      type="number"
                      value={amountCovered}
                      onChange={e => setAmountCovered(e.target.value)}
                      name="amountCovered"
                    />
                    <InputRightAddon borderRadius={0} border="0" bg="#b67ed9">
                      <Text fontSize="12px" fontWeight={500} color={'#dde7f9'}>
                        USDC
                      </Text>
                      <Image src={walletIcon} ml="4px" boxSize="20px" />
                    </InputRightAddon>
                  </InputGroup>
                </Flex>

                {/* ------------------------------- Input 4 ------------------------------- */}
                <Flex flexDir="column" w="25rem">
                  <Text fontSize="15px" fontWeight="500" color={'#868e96'}>
                    Description
                  </Text>
                  <Spacer />
                  <InputGroup
                    _focus={{ boxShadow: 'none' }}
                    as="button"
                    w={'100%'}
                  >
                    <Input
                      placeholder="Enter the description of the protocol"
                      borderRadius="0"
                      color={'#dde7f9'}
                      border="0"
                      borderBottom="1px solid #403268"
                      _placeholder={{
                        color: '#9e9899',
                        justifySelf: 'flex-end',
                        fontSize: '10px',
                      }}
                      _focus={{ boxShadow: 'none' }}
                      text="text"
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      name="description"
                    />
                  </InputGroup>
                </Flex>
              </Flex>

              {/* ------------------------------- Input 5 ------------------------------- */}
              <Flex flexDir="column" mt="30px">
                <Text fontSize="15px" fontWeight="500" color={'#dde7f9'}>
                  Select the risk level of the protocol
                </Text>
                <Spacer />
                <Flex flexDir="column" mt="35px">
                  <Slider
                    aria-label="slider-ex-6"
                    defaultValue={0}
                    min={0}
                    max={100}
                    step={25}
                    onChange={val => setSliderValue(val)}
                    onChangeEnd={val => setSliderInput(RiskLevel(val))}
                  >
                    <SliderMark
                      value={sliderValue}
                      textAlign="center"
                      color="#dde7f9"
                      mt="-10"
                      ml={sliderValue === 0 ? 0 : -10}
                      w="12"
                    >
                      {sliderValue}%
                    </SliderMark>
                    <SliderTrack bg={'#403268'}>
                      <SliderFilledTrack bg={'#b67ed9'} />
                    </SliderTrack>
                    <SliderThumb
                      bg="#82fffa"
                      borderRadius="30px"
                      border="2px solid #b67ed9"
                      _focus={{ boxShadow: 'none' }}
                      w="45px"
                      h="22px"
                      ml={sliderValue === 0 ? 5 : -5}
                    />
                  </Slider>
                  <Flex flexDir="row" justify="space-between" mt="4">
                    <Text fontSize="10px" fontWeight={500} color="#dde7f9">
                      Low Risk
                    </Text>
                    <Text fontSize="10px" fontWeight={500} color="#dde7f9">
                      High Risk
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>

            <Flex justifyContent={'center'} align="center">
              {address ? (
                <Button
                  bgGradient="linear(to-r, #403268, #765fff, #82fffc)"
                  borderRadius="20px"
                  p="10px 140px"
                  color="black"
                  fontSize="14px"
                  fontWeight="400"
                  type="button"
                  onClick={handleSubmit}
                  disabled={
                    tokenLoading ||
                    tokenWaitLoading ||
                    newInsureLoading ||
                    InsureWaitLoading
                  }
                >
                  Confirm Insurance
                </Button>
              ) : (
                <ConnectProsure />
              )}
              {/*********************************Transaction Modal ***************************************/}
              <Modal
                isOpen={isOpen}
                onClose={onClose}
                isCentered
                blockScrollOnMount={true}
                scrollBehavior={'inside'}
                motionPreset="slideInBottom"
              >
                <ModalOverlay
                  bg="#00000020"
                  backdropFilter="auto"
                  backdropBlur="2px"
                />
                <ModalContent w={{ base: '90vw', md: '60vw' }} borderRadius={0}>
                  <ModalBody p="30px 60px">
                    {insureSuccess ? (
                      <Lottie animationData={successAnimation} style={style} />
                    ) : insureError ? (
                      <Lottie animationData={errorAnimation} style={style} />
                    ) : (
                      <Lottie animationData={loadingAnimation} style={style} />
                    )}
                    <Flex flexDir="column" justify="center">
                      {insureSuccess ? (
                        <>
                          <Text
                            fontSize="18px"
                            textAlign="center"
                            fontWeight={600}
                          >
                            Transaction Completed
                          </Text>
                          <Text fontSize="13px" textAlign={'center'}>
                            Your have successfully created an insurance cover
                          </Text>
                        </>
                      ) : insureError ? (
                        <>
                          <Text
                            fontSize="18px"
                            textAlign="center"
                            fontWeight={600}
                          >
                            Error
                          </Text>
                          <Text fontSize="13px" textAlign={'center'}>
                            There is an error in your ransaction
                          </Text>
                        </>
                      ) : (
                        <>
                          <Text
                            fontSize="18px"
                            textAlign={'center'}
                            fontWeight={600}
                          >
                            Transaction Processing...
                          </Text>
                          <Text fontSize="13px" textAlign={'center'}>
                            Your request is being processed, please be patient
                          </Text>
                        </>
                      )}
                      <Flex flexDir="row" justify="space-between" mt="1.5rem">
                        <Text fontSize="18px" fontWeight={500}>
                          Protocol name
                        </Text>
                        <Flex justify="center" alignItems="center" gap={2}>
                          <Avatar src={SecureLogo} size="xs" />
                          <Text
                            color="#645C%E"
                            fontSize="16px"
                            fontWeight={400}
                          >
                            {protocolName}
                          </Text>
                        </Flex>
                      </Flex>

                      <Flex flexDir="row" justify="space-between" mt="1.5rem">
                        <Text fontSize="18px" fontWeight={500}>
                          Amount Covered
                        </Text>
                        <Flex justify="center" alignItems="center">
                          <Text
                            color="#645C5E"
                            fontSize="16px"
                            fontWeight={600}
                          >
                            {NumbAbbr(amountCovered)} USDC
                          </Text>
                        </Flex>
                      </Flex>
                    </Flex>
                  </ModalBody>

                  <ModalFooter>
                    {tokenLoading || tokenWaitLoading ? (
                      <Button
                        w="100%"
                        bg="#3a7cdf"
                        borderRadius="15px"
                        color="white"
                        _hover={{
                          backgroundColor: '#91b6ed',
                        }}
                      >
                        <Flex gap={2}>
                          Awaiting User Approval
                          <Spinner size="sm" />
                        </Flex>
                      </Button>
                    ) : InsureWaitLoading || insureSuccess ? (
                      <Button
                        as="a"
                        href={`https://rootstock-testnet.blockscout.com/tx/${newInsureData?.hash}`}
                        target="_blank"
                        w="100%"
                        bg="#3a7cdf"
                        borderRadius="15px"
                        color="white"
                        _hover={{
                          backgroundColor: '#91b6ed',
                        }}
                      >
                        View Transaction <ExternalLinkIcon ml="2px" />
                      </Button>
                    ) : (
                      <Button
                        w="100%"
                        bg="#3a7cdf"
                        borderRadius="15px"
                        color="white"
                        _hover={{
                          backgroundColor: '#91b6ed',
                        }}
                      >
                        Processing <Spinner size="xs" ml="2px" />
                      </Button>
                    )}
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Flex>
          </Flex>
          {/* Footer here */}
          <Footer2 />
        </Box>
      ) : (
        <StopErrorMessage />
      )}
    </>
  );
};

export default UnlistedCreate;

const useStyles = () => {
  return {
    root: {
      backgroundColor: '#040411',
    },
  };
};
