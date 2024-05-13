import React, { Suspense, lazy, useState, useContext } from 'react';
import {
  Flex,
  Box,
  Text,
  Spinner,
  Image,
  HStack,
  VStack,
  SimpleGrid,
  Center,
  keyframes,
  Skeleton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Button,
  Spacer,
  Input,
  InputRightAddon,
  InputGroup,
} from '@chakra-ui/react';
import Footer from '../components/Footer';
import Container from '../components/Container';
import rockTypeImage from '../assets/Rock.svg';
import ProtocolGrid from '../components/ProtocolGrid';
import { nanoid } from 'nanoid';
// import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import '../constants/pagination.css';
// import {useParams} from "react-router-dom";
import { color, motion } from 'framer-motion';
import arrowLeft from '../assets/arrow-left.svg';
import walletIcon from '../assets/empty-wallet.svg';
import { StopScreenMessageContext } from '../constants/stopScreenMessage';
import StopErrorMessage from '../components/StopErrorMessage';
import TransactionLoaderModal from '../components/TransactionLoaderModal';
import { useContractRead } from 'wagmi';
import { prosureSetup } from '../constants/interactionSetup';
import { DecimalAbbr, GetRiskLevel, GetCoverCost } from '../hooks/helpers';

const NavBar = lazy(() => import('../components/Navbar'));
const ProsureButton = lazy(() => import('../components/ProsureButton'));
const ProtocolFilter = lazy(() => import('../components/ProtocolFilter'));

const animationKeyframes = keyframes`
  0% { transform: rotate(360deg); }
  100% { transform: rotate(0);}
`;

const animation = `${animationKeyframes} 4s ease-in-out infinite`;

const Protocols = () => {
  const { data: getProtocols } = useContractRead({
    ...prosureSetup,
    functionName: 'getAllProtocolData',
  });

  console.log(getProtocols, 'sdhj');

  const {
    root,
    protocolBox,
    protocolWelcomeText,
    joinText,
    protocolInnerBox2,
    protocolInnerBox1,
    outerBox,
    fontBold,
  } = useStyles();

  const { isOpen, onOpen, onClose } = useDisclosure();
  // ------------------ useDisclosure for TransactionLoaderModal component
  const {
    isOpen: transactionLoadingIsOpen,
    onOpen: transactionLoadingOnOpen,
    onClose: transactionLoadingOnClose,
  } = useDisclosure();

  const [skeletonLoading, setSeletonLoading] = useState(false);

  // const [protocolCard, setProtocolCard] = useState(protocolsData.slice(0, 30));

  //state holding page of the pagination
  const [pageNumber, setPageNumber] = useState(0);

  const protocolCardPerPage = 15;
  const pagesVisited = pageNumber * protocolCardPerPage;

  const displayProtocolCards = getProtocols
    ? getProtocols
        .slice(pagesVisited, pagesVisited + protocolCardPerPage)
        .map((item, index) => {
          return (
            <ProtocolGrid
              key={nanoid()}
              link={index}
              protocolName={item ? item[3] : ' '}
              protocolLink={item ? item[4] : ' '}
              protocolCap={item ? DecimalAbbr(item[0]._hex) : ''}
              coverCost={item ? GetCoverCost(item[6]) : ''}
              riskLevel={item ? GetRiskLevel(item[6]) : ''}
              onOpen={onOpen}
            />
          );
        })
    : getProtocols?.map((item, index) => {
        return (
          <ProtocolGrid
            key={nanoid()}
            link={index}
            protocolName={item ? item[3] : ' '}
            protocolLink={item ? item[4] : ' '}
            protocolCap={item ? DecimalAbbr(item[0]._hex) : ''}
            coverCost={item ? GetCoverCost(item[6]) : ''}
            riskLevel={item ? GetRiskLevel(item[6]) : ''}
            onOpen={onOpen}
          />
        );
      });

  const pageCount = Math.ceil(getProtocols?.length / protocolCardPerPage);

  //selected is the pageNumber selected
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const { isMobile } = useContext(StopScreenMessageContext);

  return (
    <>
      {!isMobile ? (
        <Box w="100%">
          <Suspense fallback={<Spinner size="sm" />}>
            <NavBar />
          </Suspense>

          <Flex
            w={'100%'}
            {...root}
            flexDir="column"
            as={motion.div}
            initial={{ y: '100%' }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            exit={{ opacity: 1 }}
          >
            <Flex {...protocolBox} position={'relative'}>
              <Box
                position={'absolute'}
                className="pattern"
                w={'100%'}
                h={'44vh'}
                left={'0'}
                top={'0'}
                bottom={'0'}
                right={'0'}
              ></Box>
              <Box
                position={'absolute'}
                w={'100%'}
                h={'44vh'}
                left={'0'}
                top={'0'}
                bottom={'0'}
                bgGradient="linear(to-t, #040411, transparent)"
              ></Box>
              <Box
                position={'absolute'}
                w={'100%'}
                h={'44vh'}
                left={'0'}
                top={'0'}
                bottom={'0'}
                bgGradient="linear(to-b, #040411, transparent)"
              ></Box>
              <Suspense fallback={<Spinner size="sm" />}>
                <Container>
                  <HStack {...outerBox}>
                    {/* LEFT */}
                    <Flex>
                      <Suspense fallback={<Spinner size="sm" />}>
                        <Link to="/create-custom-insurance">
                          <ProsureButton
                            name={'Insure unlisted protocol'}
                            rest={{
                              width: ['100%'],
                              height: ['50px'],
                              mt: { base: null, md: '10px' },
                              color: '#040411',
                              bgGradient:
                                'linear(to-r, #403268, #765fff, #82fffc)',
                              borderRadius: '100px',
                              fontWeight: '400',
                            }}
                          />
                        </Link>
                      </Suspense>
                    </Flex>

                    {/* Center */}
                    <VStack
                      {...protocolInnerBox2}
                      display={{ base: 'none', md: 'flex' }}
                      // pos={"relative"}
                      as={motion.div}
                      animation={animation}
                    >
                      <Image
                        src={rockTypeImage}
                        // right={"60px"}
                        // bottom={"50px"}
                      />
                    </VStack>

                    {/* Right */}
                    <Flex
                      {...protocolInnerBox1}
                      flexDir={'column'}
                      display={{ base: 'none', md: 'flex' }}
                      alignItems={{ base: 'center', md: 'flex-start' }}
                      mt="80px"
                    >
                      <Text {...protocolWelcomeText} color="#fff" zIndex={'10'}>
                        Protocol Insurance
                      </Text>

                      <Text
                        {...joinText}
                        color="#fff"
                        mt="20px"
                        maxW="400px"
                        zIndex={'10'}
                      >
                        Buy insurance cover from protocols that are protected by
                        us or create a custom protocol cover!
                      </Text>
                      <Text></Text>
                    </Flex>
                  </HStack>
                </Container>
              </Suspense>
            </Flex>

            {/* ---------------------------- Search and Filter area -------------------------- */}
            <Flex h={'40px'} w={'100%'}>
              <Suspense
                // fallbac k={<Skeleton isLoaded={true} w={"100%"} h={"48px"}></Skeleton>}
                fallback={<Spinner size="sm" />}
              >
                <ProtocolFilter />
              </Suspense>
            </Flex>

            <Flex mt="70px" p="50px" flexDir="column">
              {skeletonLoading ? (
                <Skeleton height="200px"></Skeleton>
              ) : (
                <SimpleGrid
                  columns={3}
                  spacing="40px"
                  spacingX={'60px'}
                  w={'100%'}
                >
                  <Suspense fallback={<Spinner boxSize="lg" />}>
                    {displayProtocolCards}
                  </Suspense>
                </SimpleGrid>
              )}
              <Center mt="38px">
                <ReactPaginate
                  previousLabel={'<'}
                  nextLabel={'>'}
                  pageCount={pageCount}
                  onPageChange={changePage}
                  containerClassName={'paginationBttns'}
                  previousClassName={'previousBttns'}
                  nextLinkClassName={'nextBttns'}
                  disabledClassName={'paginationDisabled'}
                  activeClassName={'paginationActive'}
                ></ReactPaginate>
              </Center>
            </Flex>

            {/* ---------------------------------- Create Insurance cover for InstaDapp Protocol -------------------------- */}
            <>
              <Modal
                isOpen={isOpen}
                onClose={onClose}
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
                  <ModalBody padding={'40px 80px'}>
                    <Flex>
                      <Flex
                        onClick={onClose}
                        justify="center"
                        alignItems="center"
                      >
                        <Image src={arrowLeft} boxSize="15px" />
                        <Spacer mr="5px" />
                        <Text {...fontBold} color={'White'}>
                          Create insurance cover for InstadApp protocol
                        </Text>
                      </Flex>
                    </Flex>
                    <Text fontSize="14px" fontWeight={500}>
                      Please fill in the following information to create cover
                      for the protocol
                    </Text>

                    <Flex mt="20px" flexDir="column" p="20px">
                      {/* ------------------------------- Input 1 ------------------------------- */}
                      <Flex flexDir="column">
                        <Text fontSize="15px" fontWeight="500">
                          Covered address
                        </Text>
                        <Spacer />
                        <InputGroup
                          _focus={{ boxShadow: 'none' }}
                          as="button"
                          w={'100%'}
                        >
                          <Input
                            placeholder="Enter the covered wallet address"
                            borderRadius="0"
                            border="0"
                            borderBottom="1px solid #49454F"
                            _placeholder={{
                              color: '#1C1B1F',
                              justifySelf: 'flex-end',
                              fontSize: '12px',
                            }}
                            _focus={{ boxShadow: 'none' }}
                          />
                        </InputGroup>
                      </Flex>

                      {/* ------------------------------- Input 2 ------------------------------- */}
                      <Flex flexDir="column" mt="30px">
                        <Text fontSize="15px" fontWeight="500">
                          Amount Covered
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

                      {/* ------------------------------- Input 3 ------------------------------- */}
                      <Flex flexDir="column" mt="30px">
                        <Text fontSize="15px" fontWeight="500">
                          Description
                        </Text>
                        <Spacer />
                        <InputGroup
                          _focus={{ boxShadow: 'none' }}
                          as="button"
                          w={'100%'}
                        >
                          <Input
                            placeholder="Enter the description of the protocol cover"
                            borderRadius="0"
                            border="0"
                            borderBottom="1px solid #49454F"
                            _placeholder={{
                              color: '#1C1B1F',
                              justifySelf: 'flex-end',
                              fontSize: '12px',
                            }}
                            _focus={{ boxShadow: 'none' }}
                          />
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
                      onClick={transactionLoadingOnOpen}
                    >
                      Confirm insurance
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </>

            <>
              <TransactionLoaderModal
                transactionLoadingIsOpen={transactionLoadingIsOpen}
                transactionLoadingOnClose={transactionLoadingOnClose}
                transactionLoadingOnOpen={transactionLoadingOnOpen}
              />
            </>

            {/* Footer is here */}

            <Footer />
          </Flex>
        </Box>
      ) : (
        <StopErrorMessage />
      )}
    </>
  );
};

export default Protocols;

const useStyles = () => {
  return {
    root: {
      backgroundColor: '#040411',
      color: '#fff',
      // height: "10vh",
      // borderBottomLeftRadius: 20,
      // borderBottomRightRadius: 20,
    },
    protocol: {
      color: 'red',
      fontSize: 40,
      paddingInline: 30,
    },
    protocolWelcomeText: {
      fontSize: '25px',
      width: '100%',
      fontWeight: '600',
      lineHeight: '165%',
      color: 'black',
    },
    protocolBox: {
      h: '300px',
      w: '100%',
      bgRepeat: 'no-repeat',
      bgSize: 'cover',
      pt: '50px',
      px: {
        base: '0%',
        md: '5%',
      },
      mb: '30px',
    },
    protocolInnerBox1: {
      w: {
        base: '60vw',
        md: '30vw',
      },
      h: '90%',
    },
    protocolInnerBox2: {
      w: {
        base: '50vw',
        md: '35vw',
      },
      h: '90%',
      overflow: 'hidden',
      // zIndex: 3000000,
    },
    homeBox2: {
      h: '750px',
      w: '100%',
      bgRepeat: 'no-repeat',
      bgSize: 'cover',
      pt: '',
      px: {
        base: '0%',
        md: '5%',
      },
    },
    outerBox: {
      bg: 'transparent',
      h: '200px',
      w: '100%',
      justify: 'space-evenly',
    },
    outerBox2: {
      // h: "500px",
      // w: "100%",
      mt: '100px',
      justify: 'space-evenly',
    },
    joinText: {
      fontSize: ['18px'],
      width: '100%',
      color: 'white',
      my: {
        base: '18px',
        md: '25px',
      },
      fontWeight: '500',
    },
    fontBold: {
      fontWeight: '600',
      fontSize: '18px',
      lineHeight: '165%',
    },
  };
};
