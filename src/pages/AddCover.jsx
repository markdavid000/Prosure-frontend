import React, { Suspense, lazy, useState } from 'react';
import { useContext } from 'react';
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
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import Footer2 from '../components/Footer2';
import { Formik } from 'formik';
import { Link, useNavigate, useParams } from 'react-router-dom';
import arrowLeft from '../assets/arrow-left.svg';
import walletIcon from '../assets/empty-wallet.svg';
import { StopScreenMessageContext } from '../constants/stopScreenMessage';
import TransactionLoaderModal from '../components/TransactionLoaderModal';
import StopErrorMessage from '../components/StopErrorMessage';
import { ethers } from 'ethers';
import { HexToDecimal } from '../hooks/helpers';
import {
  useContractRead,
  useAccount,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import {
  erc20Setup,
  prosureContract,
  prosureSetup,
} from '../constants/interactionSetup';
import { ConnectProsure } from '../utils/customConnect';

const NavBar = lazy(() => import('../components/Navbar'));

const AddCover = ({ ...rest }) => {
  const toast = useToast();

  const { id } = useParams();
  const navigate = useNavigate();

  const { root } = useStyles();

  const { address } = useAccount();

  const [amountCovered, setAmountCovered] = useState('');

  console.log(amountCovered, 'check amount');

  // @note - initialValues: is an object that describes the initial values of the respective form fields.
  const initialValues = {
    amountCovered: '',
  };

  // @note - validate: this accepts a function that handles the form validation. The function accepts an object in the form of data values as an argument and validates each property in the object based on the rules defined.
  const validate = values => {
    let errors = {};
    if (!values.amountCovered) {
      errors.amountCovered = 'Amount covered is required';
    }
    return errors;
  };

  /* @note - onSubmit: This handles what happens after the user submits.
   * The onSubmit prop takes a callback function that will only run when
   * there are no errors, meaning the user inputs are valid.
   */
  const submitForm = values => {
    console.log(values);
  };

  const {
    isOpen: transactionLoadingIsOpen,
    onOpen: transactionLoadingOnOpen,
    onClose: transactionLoadingOnClose,
  } = useDisclosure();

  //  console.log(coverForm, "cover form")

  // @note - this will stop user viewing mobile display and it will be removed later in the latest version
  const { isMobile } = useContext(StopScreenMessageContext);

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
      toast({
        title: 'Token Approved',
        description: "You've successfully approved token",
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right',
      });
      coverWrite();
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
      transactionLoadingOnClose();
    },
  });

  const {
    data: coverData,
    isLoading: coverLoading,
    write: coverWrite,
  } = useContractWrite({
    mode: 'recklesslyUnprepared',
    ...prosureSetup,
    functionName: 'createOnExistinginsure',
    args: [
      id,
      ethers.utils.parseEther(amountCovered ? amountCovered.toString() : '0'),
    ],
  });

  const {
    isLoading: coverWaitLoading,
    isSuccess: coverSuccess,
    isError: coverError,
  } = useWaitForTransaction({
    hash: coverData?.hash,
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
        transactionLoadingOnClose();
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
      transactionLoadingOnClose();
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
      coverWrite();
    } else {
      tokenWrite();
    }
  }

  const handleSubmit = e => {
    e.preventDefault();
    tokenAuthorization();
    transactionLoadingOnOpen();
  };

  return (
    <>
      {!isMobile ? (
        <Box w={'100%'} {...root}>
          <Suspense fallback={<Spinner size="sm" />}>
            <NavBar />
          </Suspense>

          <Flex p={'40px 80px'} flexDir="column" mt="30px">
            <Flex>
              <Flex justify="center" alignItems="center">
                <Link to="/protocols">
                  <Image src={arrowLeft} boxSize="15px" />
                </Link>
                <Spacer mr="5px" />
                <Text fontSize="18px" fontWeight="600">
                  Create insurance cover for InstadApp protocol
                </Text>
              </Flex>
            </Flex>
            <Flex gap={10}>
              <Text fontSize="14px" fontWeight={500} mt="8px">
                Please fill in the following information to create cover for the
                protocol
              </Text>
              {tokenLoading ||
              tokenWaitLoading ||
              coverLoading ||
              coverWaitLoading ? (
                <Text
                  as="u"
                  onClick={transactionLoadingOnOpen}
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

            <Flex mt="20px" flexDir="column" p="50px" onSubmit={handleSubmit}>
              <Flex flexDir="column" mt="30px">
                <Text fontSize="15px" fontWeight="500">
                  Amount Covered
                </Text>
                <Spacer />
                <InputGroup
                  _focus={{ boxShadow: 'none', borderBottomColor: 'black' }}
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
                    type="number"
                    value={amountCovered}
                    name="amountCovered"
                    onChange={e => setAmountCovered(e.target.value)}
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

            <Flex justifyContent={'center'} align="center">
              {address ? (
                <Button
                  bg="#3E7FDF"
                  borderRadius="20px"
                  p="10px 140px"
                  color="white"
                  fontSize="14px"
                  fontWeight="400"
                  type="button"
                  onClick={handleSubmit}
                  disabled={
                    tokenLoading ||
                    tokenWaitLoading ||
                    coverLoading ||
                    coverWaitLoading
                  }
                >
                  Confirm Insurance
                </Button>
              ) : (
                <ConnectProsure />
              )}
            </Flex>
          </Flex>

          <>
            <TransactionLoaderModal
              transactionLoadingIsOpen={transactionLoadingIsOpen}
              transactionLoadingOnClose={transactionLoadingOnClose}
              transactionLoadingOnOpen={transactionLoadingOnOpen}
              success={coverSuccess}
              errror={coverError}
              tokenLoading={tokenLoading}
              tokenWaitLoading={tokenWaitLoading}
              coverLoading={coverWaitLoading}
              amountCovered={amountCovered}
              coverData={coverData}
            />
          </>

          {/* Footer here */}
          <Footer2 />
        </Box>
      ) : (
        <StopErrorMessage />
      )}
    </>
  );
};

export default AddCover;

const useStyles = () => {
  return {
    root: {
      backgroundColor: '#FBFDFF',
    },
  };
};
