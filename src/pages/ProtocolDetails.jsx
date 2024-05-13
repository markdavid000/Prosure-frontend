import React, { Suspense, lazy, useContext, useState } from 'react';
import {
  Flex,
  Text,
  Box,
  Spinner,
  Image,
  Spacer,
  Select,
  Divider,
  Avatar,
  InputGroup,
  Input,
  InputRightAddon,
  InputLeftAddon,
  Button,
  HStack,
  Checkbox,
  Tooltip,
  useDisclosure,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Footer2 from '../components/Footer2';
import arrowLeft from '../assets/arrow-left.svg';
import SecureLogo from '../assets/SecureDex.svg';
import webLogo from '../assets/link-2.svg';
import ethereumLogo from '../assets/ethereum 1.svg';
import qrCodeLogo from '../assets/qr-wallet 1.svg';
import walletLogo from '../assets/empty-wallet.svg';
import calendarLogo from '../assets/calendar.svg';

import { MdArrowDropDown } from 'react-icons/md';
import {
  useAccount,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import {
  erc20Setup,
  prosureContract,
  prosureSetup,
} from '../constants/interactionSetup';
import { ethers } from 'ethers';
import {
  DecimalAbbr,
  GetCoverCost,
  GetRiskLevel,
  HexToDecimal,
} from '../hooks/helpers';
import { ConnectProsure } from '../utils/customConnect';
import successAnimation from '../lottie/90646-payment-success.json';
import errorAnimation from '../lottie/97670-tomato-error.json';
import Lottie from 'lottie-react';
import loadingAnimation from '../lottie/98194-loading.json';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { StopScreenMessageContext } from '../constants/stopScreenMessage';
import StopErrorMessage from '../components/StopErrorMessage';

const NavBar = lazy(() => import('../components/Navbar'));
const ProsureButton = lazy(() => import('../components/ProsureButton'));

const style = {
  height: 300,
};

const ProtocolDetails = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { id } = useParams();

  const { address } = useAccount();

  const { fontBold, font, font2, root, font3, font4, font5, font6, font7 } =
    useStyles();

  let navigate = useNavigate();

  let toast = useToast();

  const [coverAddress, setCoverAddress] = useState('');
  const [coverAmount, setCoverAmount] = useState('');
  const [coverPeriod, setCoverPeriod] = useState('0');
  const [agree, setAgree] = useState('');

  const { data: protocolDetails } = useContractRead({
    ...prosureSetup,
    functionName: 'getProtocolData',
    args: [id],
  });

  const { data: getCalc } = useContractRead({
    ...prosureSetup,
    functionName: 'calculateCover',
    args: [
      protocolDetails ? protocolDetails[7].toString() : '',
      coverPeriod,
      ethers.utils.parseEther(coverAmount ? coverAmount.toString() : '0'),
    ],
  });

  const {
    data: approveCover,
    isLoading: approveCoverLoading,
    write: coverWrite,
  } = useContractWrite({
    mode: 'recklesslyUnprepared',
    ...erc20Setup,
    functionName: 'approve',
    args: [
      prosureContract,
      ethers.utils.parseEther(
        getCalc ? HexToDecimal(getCalc._hex).toString() : '0'
      ),
    ],
  });

  const { isLoading: tokenWaitLoading } = useWaitForTransaction({
    hash: approveCover?.hash,
    onSuccess() {
      buyCoverWrite();
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
    },
  });

  const {
    data: buyCoverData,
    isLoading: buyCoverLoading,
    write: buyCoverWrite,
  } = useContractWrite({
    mode: 'recklesslyUnprepared',
    ...prosureSetup,
    functionName: 'buyCover',
    args: [
      id,
      coverPeriod,
      ethers.utils.parseEther(coverAmount ? coverAmount.toString() : '0'),
    ],
  });

  const {
    isLoading: buyCoverWaiting,
    isSuccess: buyCoverSuccess,
    isError: buyCoverError,
  } = useWaitForTransaction({
    hash: buyCoverData?.hash,
    onSuccess() {
      toast({
        title: 'Bought Cover',
        description: "You've successfully bought cover",
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
      toast({
        title: 'Error encountered',
        description: data,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
    },
  });

  const { data: tokenReadData } = useContractRead({
    ...erc20Setup,
    functionName: 'allowance',
    args: [address, prosureContract],
  });

  function tokenAuthorization() {
    let cover = ethers.utils.parseEther(
      getCalc ? HexToDecimal(getCalc._hex).toString() : '0'
    );
    if (HexToDecimal(tokenReadData?._hex) >= HexToDecimal(cover?._hex)) {
      buyCoverWrite();
    } else {
      coverWrite();
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
        <Box w={'100%'} backgroundColor="bg">
          <Suspense fallback={<Spinner size="sm" />}>
            <NavBar />
          </Suspense>
          <Flex p={'50px'} flexDir={'column'}>
            <Flex flexDir="row" justify="space-between">
              <Flex
                justify="center"
                alignItems="center"
                onClick={() => navigate(-1)}
                cursor="pointer"
              >
                <Image src={arrowLeft} boxSize="15px" />
                <Spacer ml="10px" />
                <Text {...fontBold}>Portfolio-based Cover Purchase</Text>
              </Flex>

              <Flex justify="center" alignItems="center">
                <Text {...font}>Covercurrency:</Text>
                <Spacer ml="10px" />
                <Text
                  border="1px solid #B9A7AA"
                  borderRadius="10px"
                  h="2rem"
                  w="6rem"
                  textAlign="center"
                  py="0.2rem"
                  color="#4C4546"
                >
                  USDC
                </Text>
              </Flex>
            </Flex>

            {/* ---------------------------------------- Tabs -------------------------- */}
            <Flex flexDir="row" justify="space-between" mt="40px">
              <Text {...font2}>Products</Text>
              <Text {...font2}>Chains</Text>
              <Text {...font2}>User ID/Covered Address </Text>
              <Text {...font2}>Cover Amount</Text>
              <Text {...font2}>Cover Period</Text>
              <Text {...font2}></Text>
            </Flex>
            <Divider border="1px solid #645C5E" mt="15px" />

            {/* -------------------------------------- Tab Info -------------------------------- */}
            <Flex flexDir="row" justify="space-between" mt="15px" {...root}>
              {/* -------------------------- Detail 1 ----------------------- */}
              <Flex>
                <Avatar boxSize="30px" src={SecureLogo} mr="8px" />
                <Flex flexDir="column">
                  <Text {...font3}>
                    {protocolDetails ? protocolDetails[4] : ''}
                  </Text>
                  <Flex justify={'center'} alignItems="center">
                    <Image src={webLogo} boxSize={'20px'} mr="4px" />
                    <Text {...font4}>Smart contract vulnerability</Text>
                  </Flex>
                </Flex>
              </Flex>
              {/* -------------------------- Detail 2 ----------------------- */}
              <Flex justify="center" alignItems="center">
                <Avatar boxSize="30px" src={ethereumLogo} mr="8px" />
                <Text {...font5}>ethereum</Text>
              </Flex>

              {/* -------------------------- Detail 3 ----------------------- */}
              <Flex justify="center" alignItems="center">
                <InputGroup>
                  <Tooltip
                    hasArrow
                    label="Click to automatically paste cover address"
                    bg="purple.50"
                    color="black"
                    aria-label="A tooltip"
                    placement="top"
                  >
                    <InputLeftAddon
                      bg="white"
                      h="43px"
                      border="1px solid #B9A7AA"
                      _focus={{ boxShadow: 'none' }}
                      onClick={() => (address ? setCoverAddress(address) : ' ')}
                    >
                      <Flex
                        as="button"
                        justify="space-between"
                        alignItems="center"
                      >
                        <Image src={qrCodeLogo} boxSize="20px" />
                      </Flex>
                    </InputLeftAddon>
                  </Tooltip>
                  <Input
                    type="text"
                    placeholder="Enter the covered address"
                    h="43px"
                    w="200px"
                    border="1px solid #B9A7AA"
                    fontSize="12px"
                    fontWeight="medium"
                    _placeholder={{
                      color: '#9E8C90',
                      fontSize: '10px',
                      fontWeight: 'semibold',
                    }}
                    _focus={{ boxShadow: 'none' }}
                    value={coverAddress}
                    onChange={e => setCoverAddress(e.target.value)}
                  />
                </InputGroup>
              </Flex>

              {/* -------------------------- Detail 4 ----------------------- */}
              <Flex justify="center" alignItems="center">
                <InputGroup>
                  <Input
                    type="text"
                    placeholder="Enter the covered amount"
                    h="43px"
                    w="150px"
                    border="1px solid #B9A7AA"
                    _placeholder={{
                      color: '#9E8C90',
                      fontSize: '10px',
                      fontWeight: 'semibold',
                    }}
                    _focus={{ boxShadow: 'none' }}
                    value={coverAmount}
                    onChange={e => setCoverAmount(e.target.value)}
                  />
                  <InputRightAddon
                    bg="footerBgColor"
                    h="43px"
                    border="1px solid #B9A7AA"
                    _focus={{ boxShadow: 'none' }}
                  >
                    <Flex justify="space-between" alignItems="center">
                      <Text color="#4C4546" fontSize="10px" mr="5px">
                        USDC
                      </Text>
                      <Image src={walletLogo} boxSize="20px" />
                    </Flex>
                  </InputRightAddon>
                </InputGroup>
              </Flex>

              {/* -------------------------- Detail 5 ----------------------- */}
              <Flex justify="center" alignItems="center">
                <InputGroup>
                  <Select
                    variant="outline"
                    icon={<MdArrowDropDown />}
                    border="1px solid #B9A7AA"
                    borderRadius="6px 0px 0px 6px"
                    h="43px"
                    _active={{
                      border: '1px solid #B9A7AA',
                    }}
                    _focusVisible={{
                      border: '1px solid #537FE7',
                    }}
                    onChange={e => setCoverPeriod(e.target.value)}
                    value={coverPeriod}
                    fontSize="11px"
                    color="#9E8C90"
                    fontWeight="semibold"
                  >
                    <option style={{ display: 'none' }}>
                      Select Cover Period
                    </option>
                    <option
                      value="30"
                      style={{ color: 'black', fontSize: '15px' }}
                    >
                      30 Days
                    </option>
                    <option
                      value="90"
                      style={{ color: 'black', fontSize: '15px' }}
                    >
                      3 Months
                    </option>
                    <option
                      value="180"
                      style={{ color: 'black', fontSize: '15px' }}
                    >
                      6 Months
                    </option>
                    <option
                      value="360"
                      style={{ color: 'black', fontSize: '15px' }}
                    >
                      1 Year
                    </option>
                    <option
                      value="1440"
                      style={{ color: 'black', fontSize: '15px' }}
                    >
                      4 Years
                    </option>
                  </Select>
                  <InputRightAddon
                    bg="footerBgColor"
                    h="43px"
                    focus={{ boxShadow: 'none' }}
                    border="1px solid #B9A7AA"
                  >
                    <Flex justify="space-between" alignItems="center">
                      <Text color="#4C4546" fontSize="10px" mr="5px">
                        Days
                      </Text>
                      <Image src={calendarLogo} boxSize="20px" />
                    </Flex>
                  </InputRightAddon>
                </InputGroup>
              </Flex>
            </Flex>

            <HStack
              justify="space-between"
              flexDir="row"
              mt="30px"
              p="20px"
              gap={10}
            >
              <Flex
                flexDir={'column'}
                bg="footerBgColor"
                p="20px 40px"
                minWidth="30rem"
              >
                <Flex justify="space-between" flexDir="row">
                  <Flex flexDir="column" gap={2}>
                    <Text {...font7}>Cover amount left</Text>
                    <Text {...font7} mt="10px">
                      Percentage per cover
                    </Text>
                    <Text {...font7} mt="10px">
                      Risk level
                    </Text>
                    <Text {...font7} mt="10px">
                      Cover Payment
                    </Text>
                  </Flex>

                  <Flex flexDir="column" textAlign="right" gap={2}>
                    <Text {...font6}>
                      {protocolDetails
                        ? DecimalAbbr(protocolDetails[2]._hex)
                        : '0.00'}{' '}
                      USDC
                    </Text>
                    <Text {...font6} mt="10px">
                      {GetCoverCost(
                        protocolDetails ? protocolDetails[7] : '0%'
                      )}
                    </Text>
                    <Flex justify="right" alignItems="center" mt="10px">
                      <Text {...font3}>
                        {' '}
                        {GetRiskLevel(
                          protocolDetails ? protocolDetails[7] : 'Low'
                        )}
                      </Text>
                    </Flex>
                    <Text>
                      {DecimalAbbr(getCalc ? getCalc._hex : '0.00')} USDC
                    </Text>
                  </Flex>
                </Flex>

                {/*  connect your wallet */}
                {address ? (
                  <>
                    {tokenWaitLoading ||
                    buyCoverLoading ||
                    approveCoverLoading ||
                    buyCoverWaiting ? (
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
                  </>
                ) : (
                  <Box
                    w="100%"
                    p={4}
                    mt="17px"
                    borderRadius="4px"
                    bg="white"
                    boxShadow="0px 4px 8px 3px rgba(0, 0, 0, 0.15)"
                  >
                    <Flex flexDir="row" justify="space-between" w="100%">
                      <Text fontSize="14px" fontWeight="400" py="3">
                        Please connect your wallet.
                      </Text>
                      <ConnectProsure />
                    </Flex>
                  </Box>
                )}
              </Flex>

              <Flex flexDir="column">
                {/* ----------------------------- Check Box ---------------------------- */}
                <Flex mb="20px">
                  <Checkbox
                    border="#212121"
                    onChange={e => setAgree(e.target.checked)}
                    size="lg"
                  >
                    I agree to the terms and conditions set out and identified
                    by Prosure.
                  </Checkbox>
                </Flex>
                <Suspense fallback={<Spinner size="sm" />}>
                  {agree && address ? (
                    <ProsureButton
                      name={'Confirm insurance'}
                      rest={{
                        width: ['40%'],
                        height: ['50px'],
                        mt: { base: null, md: '10px' },
                        color: 'white',
                        bg: 'ctaBg',
                        fontWeight: '400',
                        px: '10rem',
                      }}
                      onCLick={handleSubmit}
                      isDisabled={
                        approveCoverLoading ||
                        tokenWaitLoading ||
                        buyCoverLoading ||
                        buyCoverWaiting
                      }
                    />
                  ) : (
                    <Button
                      color="white"
                      width="40%"
                      bg="rgba(62, 127, 223, 0.6)"
                      fontWeight="400"
                      height="50px"
                      mt={{ base: null, md: '10px' }}
                      px="10rem"
                      borderRadius="100px"
                      lineHeight="20px"
                      letterSpacing="0.2px"
                      disabled={true}
                    >
                      Confirm Insurance
                    </Button>
                  )}
                </Suspense>
              </Flex>
            </HStack>
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
                  {buyCoverSuccess ? (
                    <Lottie animationData={successAnimation} style={style} />
                  ) : buyCoverError ? (
                    <Lottie animationData={errorAnimation} style={style} />
                  ) : (
                    <Lottie animationData={loadingAnimation} style={style} />
                  )}
                  <Flex flexDir="column" justify="center">
                    {buyCoverSuccess ? (
                      <>
                        <Text
                          fontSize="18px"
                          textAlign="center"
                          fontWeight={600}
                        >
                          Transaction Completed
                        </Text>
                        <Text fontSize="13px" textAlign={'center'}>
                          Your have successfully bought cover for {}
                        </Text>
                      </>
                    ) : buyCoverError ? (
                      <>
                        <Text
                          fontSize="18px"
                          textAlign="center"
                          fontWeight={600}
                        >
                          Error
                        </Text>
                        <Text fontSize="13px" textAlign={'center'}>
                          There is an error in your transaction
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
                        <Text color="#645C%E" fontSize="16px" fontWeight={400}>
                          {protocolDetails ? protocolDetails[4] : ''}
                        </Text>
                      </Flex>
                    </Flex>

                    <Flex flexDir="row" justify="space-between" mt="1.5rem">
                      <Text fontSize="18px" fontWeight={500}>
                        Cover Bought
                      </Text>
                      <Flex justify="center" alignItems="center">
                        <Text color="#645C5E" fontSize="16px" fontWeight={600}>
                          {DecimalAbbr(getCalc ? getCalc._hex : '0.00')} USDC
                        </Text>
                      </Flex>
                    </Flex>

                    <Flex flexDir="row" justify="space-between" mt="1.5rem">
                      <Text fontSize="18px" fontWeight={500}>
                        Risk Level
                      </Text>
                      <Flex justify="center" alignItems="center">
                        <Text color="#645C5E" fontSize="16px" fontWeight={600}>
                          {GetRiskLevel(
                            protocolDetails ? protocolDetails[7] : 'Low'
                          )}
                        </Text>
                      </Flex>
                    </Flex>
                  </Flex>
                </ModalBody>
                <ModalFooter>
                  {approveCoverLoading || tokenWaitLoading ? (
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
                  ) : buyCoverWaiting || buyCoverSuccess ? (
                    <Button
                      as="a"
                      href={`https://sepolia-blockscout.lisk.com/tx/${buyCoverData?.hash}`}
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

          {/* Footer Two */}
          <Footer2 />
        </Box>
      ) : (
        <StopErrorMessage />
      )}
    </>
  );
};

export default ProtocolDetails;

const useStyles = () => {
  return {
    root: {
      bg: 'white',
      shadow: '0px 4px 61px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
      h: '88px',
      p: '18px 15px',
    },
    fontBold: {
      fontWeight: '600',
      fontSize: '18px',
      lineHeight: '165%',
    },
    font: {
      fontWeight: '500',
      fontSize: '14px',
      lineHeight: '165%',
    },
    font2: {
      fontWeight: '500',
      fontSize: '12px',
      lineHeight: '24px',
    },
    font3: {
      fontWeight: '600',
      fontSize: '12px',
      lineHeight: '24px',
    },
    font4: {
      fontWeight: '500',
      fontSize: '10px',
      lineHeight: '24px',
    },
    font5: {
      fontWeight: 'semibold',
      fontSize: '11px',
      lineHeight: '24px',
    },
    font6: {
      fontWeight: '400',
      fontSize: '16px',
      lineHeight: '125%',
    },
    font7: {
      fontWeight: '500',
      fontSize: '16px',
      lineHeight: '125%',
    },
  };
};
