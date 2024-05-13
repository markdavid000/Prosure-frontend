import React, { Suspense, lazy, useContext } from 'react';
import {
  Flex,
  Box,
  Text,
  Spinner,
  HStack,
  VStack,
  Image,
  keyframes,
  Spacer,
} from '@chakra-ui/react';
import Container from '../components/Container';
import { useNavigate } from 'react-router-dom';
import blockchainLogo from '../assets/Rectangle 1.svg';
import LockDexImage from '../assets/LockDex.svg';
import SecureDexImage from '../assets/SecureDex.svg';
import MoneyDexImage from '../assets/MoneyDex.svg';
import ClaimDexImage from '../assets/ClaimDex.svg';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';
import { StopScreenMessageContext } from '../constants/stopScreenMessage';
import StopErrorMessage from '../components/StopErrorMessage';
import '../Global.css';

const NavBar = lazy(() => import('../components/Navbar'));
const ProsureButton = lazy(() => import('../components/ProsureButton'));
// const Footer = lazy(() => import("@/components/Footer"));

const animationKeyframes = keyframes`
 0% { transform: rotate(360deg); }
 100% { transform: rotate(0); }
`;

const animation = `${animationKeyframes} 3s ease-in-out infinite`;

const Home = () => {
  const {
    root,
    homeBox,
    outerBox,
    joinText,
    homeInnerBox1,
    homeInnerBox2,
    homeInnerBox3,
    homeWelcomeText,
    outerBox2,
  } = useStyles();

  let navigate = useNavigate();

  const { isMobile } = useContext(StopScreenMessageContext);

  return (
    <>
      {!isMobile ? (
        <Box w={'100%'}>
          <Suspense fallback={<Spinner size="lg" />}>
            <NavBar />
          </Suspense>
          <Box w={'100%'} {...root}>
            <Flex
              {...homeBox}
              bg={'#040411'}
              position={'relative'}
              // zIndex={'10'}
            >
              <Box
                position={'absolute'}
                className="pattern"
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
                  <HStack {...outerBox}>
                    {/* LEFT */}
                    <Flex
                      {...homeInnerBox1}
                      flexDir={'column'}
                      display={{ base: 'none', md: 'flex' }}
                      alignItems={{ base: 'center', md: 'flex-start' }}
                      mt="80px"
                    >
                      <Text {...homeWelcomeText} color="#e9ecef" zIndex={'10'}>
                        Your shield for secure digital protocols and
                        transactions.
                      </Text>

                      <Text {...joinText} color="#e9ecef" zIndex={'10'}>
                        With our innovative solutions, you can navigate the
                        complexities of the blockchain ecosystem with
                        confidence, knowing that your protocols are fortified
                        against threats. Join us in shaping a safer future for
                        decentralized technologies.
                      </Text>
                      <Suspense fallback={<Spinner size="sm" />}>
                        <ProsureButton
                          name={'Get Insured'}
                          rest={{
                            width: ['40%'],
                            height: ['50px'],
                            mt: { base: null, md: '10px' },
                            color: 'black',
                            bgGradient:
                              'linear(to-r, #403268, #765fff, #82fffc)',
                            fontWeight: '400',
                          }}
                          onCLick={() => {
                            navigate('/protocols');
                          }}
                        />
                      </Suspense>
                    </Flex>

                    {/* RIGHT */}
                    <HStack
                      {...homeInnerBox3}
                      display={{ base: 'none', md: 'flex' }}
                      as={motion.div}
                      animation={animation}
                    >
                      <Image
                        src={blockchainLogo}
                        right={'60px'}
                        bottom={'50px'}
                      />
                    </HStack>
                  </HStack>
                </Container>
              </Suspense>
            </Flex>

            <Box bg={'#040411'}>
              {/*  ------------------------------------ Section 2 ------------------------- */}
              <Flex p="50px">
                <Suspense fallback={<Spinner size="sm" />}>
                  <Container>
                    <HStack {...outerBox2}>
                      {/* LEFT */}
                      <VStack
                        {...homeInnerBox2}
                        display={{ base: 'none', md: 'flex' }}
                        pos={'relative'}
                      >
                        <Box
                          w={'420px'}
                          h={'250px'}
                          borderRadius={'5px'}
                          position={'relative'}
                          left={'0'}
                          className="home-lock"
                        >
                          <Image
                            src={'../images/Security-Home.png'}
                            position={'absolute'}
                            w={'210px'}
                            // h={"300px"}
                            right={'100px'}
                            bottom={'20px'}
                          />
                        </Box>
                      </VStack>
                      {/* <Spacer mr="5px" /> */}
                      {/* RIGHT */}
                      <Flex
                        {...homeInnerBox1}
                        flexDir={'column'}
                        display={{ base: 'none', md: 'flex' }}
                        alignItems={{ base: 'center', md: 'flex-start' }}
                        mt="80px"
                      >
                        <Text {...homeWelcomeText} color="#e9ecef">
                          Ensures Trust And Decentralization
                        </Text>

                        <Text {...joinText} color="#868e96" mt="20px">
                          Prosure prioritizes trust, security, and
                          decentralization to provide you with a reliable
                          insurance solution.
                        </Text>
                      </Flex>
                    </HStack>
                  </Container>
                </Suspense>
              </Flex>

              {/*  ------------------------------------ Section 3 ------------------------- */}
              <Flex p="50px">
                <Suspense fallback={<Spinner size="sm" />}>
                  <Container>
                    <HStack {...outerBox2}>
                      {/* LEFT */}
                      <Flex
                        {...homeInnerBox1}
                        flexDir={'column'}
                        display={{ base: 'none', md: 'flex' }}
                        alignItems={{ base: 'center', md: 'flex-start' }}
                        mt="80px"
                      >
                        <Text {...homeWelcomeText} color="#e9ecef">
                          Tailored Insurance
                        </Text>

                        <Text {...joinText} color="#868e96" mt="20px">
                          We understand that everyone's insurance needs are
                          different. That's why we offer a range of customizable
                          options to help you create the perfect insurance plan
                          for your specific requirements.
                        </Text>
                      </Flex>

                      {/* RIGHT */}
                      <VStack
                        {...homeInnerBox2}
                        display={{ base: 'none', md: 'flex' }}
                        pos={'relative'}
                      >
                        <Box
                          w={'420px'}
                          h={'250px'}
                          borderRadius={'5px'}
                          position={'relative'}
                          left={'0'}
                          className="tailored-insurance"
                        >
                          <Image
                            src={'../images/Securer.png'}
                            position={'absolute'}
                            w={'190px'}
                            // h={"300px"}
                            right={'110px'}
                            bottom={'0'}
                          />
                        </Box>
                      </VStack>
                    </HStack>
                  </Container>
                </Suspense>
              </Flex>

              {/*  ------------------------------------ Section 4 ------------------------- */}
              <Flex p="50px">
                <Suspense fallback={<Spinner size="sm" />}>
                  <Container>
                    <HStack {...outerBox2}>
                      {/* LEFT */}
                      <VStack
                        {...homeInnerBox2}
                        display={{ base: 'none', md: 'flex' }}
                        pos={'relative'}
                      >
                        <Box
                          w={'420px'}
                          h={'250px'}
                          borderRadius={'5px'}
                          position={'relative'}
                          left={'0'}
                          className="dollar"
                        >
                          <Image
                            src={'../images/Dollar.png'}
                            position={'absolute'}
                            w={'190px'}
                            // h={"300px"}
                            right={'120px'}
                            bottom={'28px'}
                          />
                        </Box>
                      </VStack>

                      {/* RIGHT */}
                      <Flex
                        {...homeInnerBox1}
                        flexDir={'column'}
                        display={{ base: 'none', md: 'flex' }}
                        alignItems={{ base: 'center', md: 'flex-start' }}
                        mt="80px"
                      >
                        <Text {...homeWelcomeText} color="#e9ecef">
                          Affordable Rates
                        </Text>

                        <Text {...joinText} color="#868e96" mt="20px">
                          Experience the peace of mind that comes with knowing
                          you're protected by quality insurance coverage at an
                          affordable price. Explore our website today and
                          discover the value of insurance with Prosure.
                        </Text>
                      </Flex>
                    </HStack>
                  </Container>
                </Suspense>
              </Flex>

              {/*  ------------------------------------ Section 5 ------------------------- */}
              <Flex>
                <Suspense fallback={<Spinner size="sm" />}>
                  <Container>
                    <HStack {...outerBox2}>
                      {/* LEFT */}
                      <Flex
                        {...homeInnerBox1}
                        flexDir={'column'}
                        display={{ base: 'none', md: 'flex' }}
                        alignItems={{ base: 'center', md: 'flex-start' }}
                        mt="80px"
                      >
                        <Text {...homeWelcomeText} color="#e9ecef">
                          Effortless Claims Handling
                        </Text>

                        <Text {...joinText} color="#868e96" mt="20px">
                          Experience the convenience of hassle-free claims
                          processing with Prosure. Trust us to handle your
                          claims quickly, efficiently, and with the care and
                          attention you deserve.
                        </Text>
                      </Flex>

                      {/* RIGHT */}
                      <VStack
                        {...homeInnerBox2}
                        display={{ base: 'none', md: 'flex' }}
                        pos={'relative'}
                      >
                        <Box
                          w={'420px'}
                          h={'250px'}
                          borderRadius={'5px'}
                          position={'relative'}
                          left={'0'}
                          className="claim"
                        >
                          <Image
                            src={'../images/Claim.png'}
                            position={'absolute'}
                            w={'450px'}
                            // h={"300px"}
                            right={'0'}
                            top={'2px'}
                          />
                        </Box>
                      </VStack>
                    </HStack>
                  </Container>
                </Suspense>
              </Flex>
            </Box>

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

export default Home;

const useStyles = () => {
  return {
    root: {
      backgroundColor: '#FBFDFF',
      // height: "10vh",
      // borderBottomLeftRadius: 20,
      // borderBottomRightRadius: 20,
    },
    home: {
      color: 'red',
      fontSize: 40,
      paddingInline: 30,
    },
    homeInnerBox1: {
      w: {
        base: '60vw',
        md: '46vw',
      },
      h: '',
    },
    homeInnerBox2: {
      w: {
        base: '60vw',
        md: '35vw',
      },
      h: '100%',
      overflow: 'hidden',
      // zIndex: 3000000,
    },
    homeInnerBox3: {
      w: {
        base: '60vw',
        md: '35vw',
      },
      h: '100%',
      overflow: 'hidden',
      // zIndex: 3000000,
    },
    homeWelcomeText: {
      fontSize: '40px',
      width: '100%',
      fontWeight: '700',
      lineHeight: '140%',
      color: 'black',
    },
    homeBox: {
      h: '550px',
      w: '100%',
      bgRepeat: 'no-repeat',
      bgSize: 'cover',
      pt: '100px',
      px: {
        base: '0%',
        md: '5%',
      },
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
      h: '300px',
      w: '100%',
      justify: 'space-evenly',
    },
    outerBox2: {
      // h: "500px",
      // w: "100%",
      mt: '40px',
      justify: 'space-evenly',
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
