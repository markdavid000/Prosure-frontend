import React, { Suspense, lazy, useState, useContext } from 'react';
import {
  Flex,
  Box,
  Spinner,
  HStack,
  Spacer,
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
  Input,
  InputRightAddon,
  InputGroup,
  useToast,
  Avatar,
} from '@chakra-ui/react';
import Container from '../components/Container';
import Footer from '../components/Footer';
import arrowRight from '../assets/arrow-right.svg';
import arrowRightWhite from '../assets/arrow-right-white.svg';
import rounded from '../assets/rounded.svg';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import loaderAnimation from '../lottie/9833-full-page-loading-spinner.json';
import successAnimation from '../lottie/90646-payment-success.json';
import errorAnimation from '../lottie/97670-tomato-error.json';
import walletIcon from '../assets/empty-wallet.svg';
import { ConnectProsure } from '../utils/customConnect';
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import { erc20Setup, governanceContract } from '../constants/interactionSetup';
import { ethers } from 'ethers';
import { governanceSetup } from '../constants/interactionSetup';
import { HexToDecimal, NumbAbbr, ShortAddress } from '../hooks/helpers';
import SecureLogo from '../assets/SecureDex.svg';
import { ExternalLinkIcon } from '@chakra-ui/icons';

import { StopScreenMessageContext } from '../constants/stopScreenMessage';
import StopErrorMessage from '../components/StopErrorMessage';
import { color } from 'framer-motion';

const NavBar = lazy(() => import('../components/Navbar'));
const ProsureButton = lazy(() => import('../components/ProsureButton'));

const style = {
  height: 250,
};

const Governance = () => {
  const { address } = useAccount();
  const toast = useToast();
  const [amountStaked, setAmountStaked] = useState('');

  console.log(amountStaked, 'sdln');

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
      governanceContract,
      ethers.utils.parseEther(amountStaked ? amountStaked.toString() : '0'),
    ],
  });

  const { isLoading: tokenWaitLoading } = useWaitForTransaction({
    hash: tokenData?.hash,
    onSuccess() {
      governanceWrite();
      toast({
        title: 'Token Approved',
        description: "You've successfully approved token",
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      setTimeout(() => {
        onClose3();
      }, 6000);
    },
    onError(data) {
      toast({
        title: 'Error encountered',
        description: data,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      onClose3();
    },
  });

  const {
    data: governanceData,
    isLoading: governanceLoading,
    write: governanceWrite,
  } = useContractWrite({
    mode: 'recklesslyUnprepared',
    ...governanceSetup,
    functionName: 'joinDAO',
    args: [
      ethers.utils.parseEther(amountStaked ? amountStaked.toString() : '0'),
    ],
  });

  const {
    isLoading: governanceWaitLoading,
    isSuccess: governanceSuccess,
    isError: governanceError,
  } = useWaitForTransaction({
    hash: governanceData?.hash,
    onSuccess() {
      toast({
        title: 'Joined',
        description: "You've successfully joined Prosure Governance",
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      onClose3();
      onClose2();
    },
    onError(data) {
      toast({
        title: 'Error encountered',
        description: data,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      onClose3();
    },
  });

  const { data: tokenReadData } = useContractRead({
    ...erc20Setup,
    functionName: 'allowance',
    args: [address, governanceContract],
  });

  function tokenAuthorization() {
    let amountInput = ethers.utils.parseEther(
      amountStaked ? amountStaked.toString() : '0'
    );
    if (HexToDecimal(tokenReadData?._hex) >= HexToDecimal(amountInput?._hex)) {
      governanceWrite();
    } else {
      tokenWrite();
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    tokenAuthorization();
    onOpen3();
  };

  const { root, homeBox, textDesign, homeInnerBox1, homeInnerBox3 } =
    useStyles();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();
  const {
    isOpen: isOpen3,
    onOpen: onOpen3,
    onClose: onClose3,
  } = useDisclosure();

  const { isMobile } = useContext(StopScreenMessageContext);

  return (
    <>
      {!isMobile ? (
        <Box>
          <Suspense fallback={<Spinner size="lg" />}>
            <NavBar />
          </Suspense>
          <Box className="governance" w={'100%'}>
            <Flex
              flexDir="column"
              {...root}
              position={'relative'}
              bg={'#040411'}
            >
              <Box
                position={'absolute'}
                className="pattern_two"
                w={'100%'}
                h={'100vh'}
                left={'0'}
                top={'0'}
                bottom={'0'}
                right={'0'}
              ></Box>
              <Box
                position={'absolute'}
                w={'100%'}
                h={'100vh'}
                left={'0'}
                top={'0'}
                bottom={'0'}
                bgGradient="linear(to-t, #040411, transparent)"
              ></Box>
              <Box
                position={'absolute'}
                w={'100%'}
                h={'100vh'}
                left={'0'}
                top={'0'}
                bottom={'0'}
                bgGradient="linear(to-b, #040411, transparent)"
              ></Box>
              <Suspense fallback={<Spinner size="sm" />}>
                <Container>
                  <HStack
                    {...homeBox}
                    textAlign="center"
                    justifyContent="center"
                    alignItems="center"
                    flexDir="column"
                  >
                    <Text {...textDesign} bgClip="text" zIndex={'10'}>
                      Creating a new, fairer, and more secure future for
                      insurance.
                    </Text>
                    <Text
                      fontSize="24px"
                      color={'#868e96'}
                      fontWeight="500"
                      pb="34px"
                      zIndex={'10'}
                    >
                      As a DAO, we are owned and governed by our community. By
                      joining Prosure's DAO, you will have the opportunity to
                      directly shape the future of insurance and play an active
                      role in decision-making processes..
                    </Text>
                    <Suspense fallback={<Spinner size="sm" />}>
                      <ProsureButton
                        name={'Join Governance DAO'}
                        rest={{
                          width: ['30%'],
                          height: ['50px'],
                          mt: { base: null, md: '10px' },
                          color: 'white',
                          bgGradient: 'linear(to-r, #403268, #765fff, #82fffc)',
                          fontWeight: '400',
                        }}
                        onCLick={onOpen}
                      />
                    </Suspense>
                  </HStack>
                </Container>
              </Suspense>

              <Flex
                flexDir="row"
                gap={'20px'}
                px={'32px'}
                justify="space-between"
                mt="40px"
              >
                <Flex
                  border="1px solid #837377"
                  bg="#fcc2d7"
                  borderRadius={'10px'}
                  p="30px"
                  flexDir="column"
                >
                  <Text fontSize="20px" color={'#495057'} textAlign="start">
                    View and vote for claims and issues raised by insurers and
                    risk assessors.
                  </Text>
                  <Flex mt="30px">
                    <Link to="/governance-claims">
                      <Flex justify="center" alignItems="center">
                        <Text fontSize="16px" fontWeight="600">
                          View feeds
                        </Text>
                        <Spacer mr="5px" />
                        <Image src={arrowRight} boxSize="15px" />
                      </Flex>
                    </Link>
                  </Flex>
                </Flex>

                <Flex
                  border="1px solid #837377"
                  bg="#f3d9fa"
                  borderRadius={'10px'}
                  p="30px"
                  flexDir="column"
                >
                  <Text fontSize="20px" color={'#495057'} textAlign="start">
                    View all the members of our DAO and the role played in
                    shaping the future of Insurance.
                  </Text>
                  <Flex mt="30px">
                    <Link to="/dao-members">
                      <Flex justify="center" alignItems="center">
                        <Text fontSize="16px" fontWeight="600">
                          View members
                        </Text>
                        <Spacer mr="5px" />
                        <Image src={arrowRight} boxSize="15px" />
                      </Flex>
                    </Link>
                  </Flex>
                </Flex>

                <Flex
                  border="1px solid #837377"
                  bg="#d0ebff"
                  borderRadius={'10px'}
                  p="30px"
                  flexDir="column"
                >
                  <Text fontSize="20px" color={'#495057'} textAlign="start">
                    View and manage your activities and contributions to the
                    Governance DAO
                  </Text>
                  <Flex mt="30px">
                    <Link to="/dao-member-portal">
                      <Flex justify="center" alignItems="center">
                        <Text fontSize="16px" fontWeight="600">
                          View Portal
                        </Text>
                        <Spacer mr="5px" />
                        <Image src={arrowRight} boxSize="15px" />
                      </Flex>
                    </Link>
                  </Flex>
                </Flex>
              </Flex>

              <Flex {...homeBox} justify="center" align="center" mt="40px">
                <Flex
                  bg="linear-gradient(97.66deg, #364fc7 0%, #403268 100%)"
                  borderRadius="20px"
                  // h="400px"
                  //  bgImage="url('/images/noiselayer.png')"
                  p="40px"
                  justify="space-between"
                  flexDir="row"
                >
                  <Flex flexDir="column" {...homeInnerBox1} justify="center">
                    <Text color="#ced4da" fontSize="33px" fontWeight="600">
                      Utilizing power of decentralized technology to
                      revolutionize the insurance industry.
                    </Text>
                    <Suspense fallback={<Spinner size="sm" />}>
                      {/* <Link to="/join"> */}
                      <Button
                        bgGradient="linear(to-r, #403268, #765fff,  #82fffc)"
                        mt="25px"
                        borderRadius="10px"
                        p="0px 6px"
                        w="30%"
                        _hover={{
                          bg: 'linear-gradient(0deg, rgba(103, 80, 164, 0.14), rgba(103, 80, 164, 0.14)), #FFFBFE',
                          color: 'white',
                        }}
                        onClick={onOpen}
                      >
                        <Text fontSize="16px" color="white">
                          Join us
                        </Text>
                        <Image src={arrowRightWhite} boxSize="15px" />
                      </Button>
                      {/* </Link> */}
                    </Suspense>
                  </Flex>

                  <HStack
                    {...homeInnerBox3}
                    display={{ base: 'none', md: 'flex' }}
                  >
                    <Image src={rounded} right={'60px'} bottom={'50px'} />
                  </HStack>
                </Flex>
              </Flex>
            </Flex>

            {/* =--------------------------------- Joining Modal ---------------------- */}
            <>
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
                  <ModalCloseButton />
                  <ModalBody p="40px 80px">
                    {/*  ---------------------- Loading animation ------------------------ */}
                    <Lottie animationData={loaderAnimation} style={style} />
                    {/* --------------- ends of Loading animation -------------------- */}
                    <Flex flexDir="column" justify="center">
                      <Text
                        fontSize="20px"
                        textAlign={'center'}
                        fontWeight={600}
                      >
                        Welcome to Prosure’s Governance DAO!
                      </Text>

                      <Text
                        fontSize="16px"
                        textAlign={'center'}
                        fontWeight={500}
                        mt="8px"
                      >
                        To join the DAO, you must meet the following conditions:
                        You must have maximum of 10,000 usd and a minimum of
                        1000 usd
                      </Text>
                    </Flex>
                  </ModalBody>

                  <ModalFooter justifyContent="center" align="center">
                    {address ? (
                      <Button
                        bg="#3E7FDF"
                        borderRadius="20px"
                        color="white"
                        fontSize="14px"
                        fontWeight={400}
                        p="10px 100px"
                        _hover={{
                          color: 'white',
                        }}
                        onClick={() => {
                          onOpen2();
                          onClose();
                        }}
                      >
                        Continue
                      </Button>
                    ) : (
                      <ConnectProsure />
                    )}
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </>

            {/* ------------------------------ Proceed with this Details ------------------------- */}
            <Modal
              isOpen={isOpen2}
              onClose={onClose2}
              size="3xl"
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
                <ModalCloseButton />
                <ModalBody padding={'40px 80px'}>
                  <Flex gap={10}>
                    <Text fontSize="16px" fontWeight={600}>
                      Enter the following details to proceed
                    </Text>
                    {tokenLoading ||
                    tokenWaitLoading ||
                    governanceLoading ||
                    governanceWaitLoading ? (
                      <Text
                        as="u"
                        onClick={onOpen3}
                        fontStyle="italic"
                        fontWeight="bold"
                        mt="1px"
                        fontSize="14px"
                        cursor="pointer"
                      >
                        Check Transaction Process
                      </Text>
                    ) : (
                      ''
                    )}
                  </Flex>

                  <Flex mt="20px" flexDir="column" p="20px">
                    {/* ------------------------------- Input ------------------------------- */}
                    <Flex flexDir="column" mt="30px">
                      <Text fontSize="15px" fontWeight="500">
                        Amount Staked
                      </Text>
                      <Spacer />
                      <InputGroup
                        _focus={{ boxShadow: 'none' }}
                        as="button"
                        w={'100%'}
                      >
                        <Input
                          placeholder="Enter amount of insurance cover"
                          borderRadius="0"
                          border="0"
                          borderBottom="1px solid #49454F"
                          _placeholder={{
                            color: '#1C1B1F',
                            justifySelf: 'flex-end',
                            fontSize: '12px',
                          }}
                          _focus={{ boxShadow: 'none' }}
                          value={amountStaked}
                          onChange={e => setAmountStaked(e.target.value)}
                        />
                        <InputRightAddon
                          borderRadius={0}
                          border="0"
                          bg="footerBgColor"
                        >
                          <Text fontSize="12px" fontWeight={500}>
                            USDC
                          </Text>
                          <Image src={walletIcon} ml="4px" boxSize="20px" />
                        </InputRightAddon>
                      </InputGroup>
                    </Flex>
                  </Flex>
                </ModalBody>

                <ModalFooter justifyContent={'center'} align="center">
                  <Button
                    bg="#3E7FDF"
                    borderRadius="20px"
                    p="10px 140px"
                    color="white"
                    fontSize="14px"
                    fontWeight="400"
                    onClick={handleSubmit}
                  >
                    Proceed
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            {/* ------------------------------ Transaction Completed ---------------------------- */}

            <>
              <Modal
                isOpen={isOpen3}
                onClose={onClose3}
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
                  <ModalCloseButton />
                  <ModalBody p="40px 80px">
                    {governanceSuccess ? (
                      <Lottie animationData={successAnimation} style={style} />
                    ) : governanceError ? (
                      <Lottie animationData={errorAnimation} style={style} />
                    ) : (
                      <Lottie animationData={loaderAnimation} style={style} />
                    )}
                    {/* --------------- ends of Loading animation -------------------- */}
                    <Flex flexDir="column" justify="center">
                      {governanceSuccess ? (
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
                      ) : governanceError ? (
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
                          Amount Staked
                        </Text>
                        <Flex justify="center" alignItems="center" gap={2}>
                          <Avatar src={SecureLogo} size="xs" />
                          <Text
                            color="#645C5E"
                            fontSize="16px"
                            fontWeight={600}
                          >
                            {NumbAbbr(amountStaked)} USDC
                          </Text>
                        </Flex>
                      </Flex>
                      <Flex flexDir="row" justify="space-between" mt="10px">
                        <Text fontSize="18px" fontWeight={500}>
                          Wallet address
                        </Text>
                        <Flex justify="center" alignItems="center">
                          <Text
                            color="#645C5E"
                            fontSize="16px"
                            fontWeight={600}
                          >
                            {ShortAddress(address)}
                          </Text>
                        </Flex>
                      </Flex>
                    </Flex>
                  </ModalBody>

                  <ModalFooter justifyContent="center" align="center">
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
                    ) : governanceWaitLoading || governanceSuccess ? (
                      <Button
                        as="a"
                        href={`https://rootstock-testnet.blockscout.com/tx/${governanceData?.hash}`}
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
            </>
            {/* Footer area */}
            <Footer />
          </Box>
        </Box>
      ) : (
        <StopErrorMessage />
      )}
    </>
  );
};

export default Governance;

const useStyles = () => {
  return {
    root: {
      backgroundColor: '#FBFDFF',
      bgRepeat: 'no-repeat',
      bgSize: 'cover',
      // borderBottomLeftRadius: 20,
      // borderBottomRightRadius: 20,
    },
    home: {
      color: 'red',
      fontSize: 40,
      paddingInline: 30,
    },
    textDesign: {
      fontSize: '57px',
      fontWeight: '600',
      lineHeight: '165%',
      letterSpacing: '-0.02em',
      color: '#e9ecef',
      bg: 'linear-gradient(97.66deg, #e9ecef 0%, #82fffc 100%)',
      backgroundClip: 'text',
      textFillColor: 'transparent',
    },
    homeInnerBox1: {
      w: {
        base: '20vw',
        md: '40vw',
      },
      h: '',
    },
    homeInnerBox3: {
      w: {
        base: '40vw',
        md: '35vw',
      },
      h: '100%',
      overflow: 'hidden',
      // zIndex: 3000000,
    },
    homeBox: {
      h: '550px',
      w: '100%',
      pt: '20px',
      bgRepeat: 'no-repeat',
      bgSize: 'cover',
      // height: "10vh",
      px: {
        base: '0%',
        md: '5%',
      },
      mb: '30px',
    },
    outerBox: {
      bg: 'transparent',
      h: '300px',
      w: '100%',
    },
    joinText: {
      fontSize: ['16px'],
      width: '100%',
      color: 'white',
      my: {
        base: '18px',
        md: '25px',
      },
      fontWeight: '400',
    },
  };
};
