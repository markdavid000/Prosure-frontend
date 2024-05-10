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
              bgImage="url('/images/Hero-section-Background.png')"
            >
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
                      <Text {...homeWelcomeText} color="black">
                        Designed to protect protocols and smart contracts from
                        potential risks
                      </Text>

                      <Text {...joinText} color="black">
                        With the increasing popularity of decentralized
                        technologies, it has become increasingly important to
                        ensure their security and stability. Our platform offers
                        insurance coverage for these critical components of the
                        decentralized ecosystem.
                      </Text>
                      <Suspense fallback={<Spinner size="sm" />}>
                        <ProsureButton
                          name={'Get insured'}
                          rest={{
                            width: ['40%'],
                            height: ['50px'],
                            mt: { base: null, md: '10px' },
                            color: 'white',
                            bg: 'ctaBg',
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
                      <Image
                        src={LockDexImage}
                        // pos={"absolute"}
                        // w={"300px"}
                        // h={"300px"}
                        right={'60px'}
                        bottom={'50px'}
                      />
                    </VStack>
                    <Spacer mr="20px" />
                    {/* RIGHT */}
                    <Flex
                      {...homeInnerBox1}
                      flexDir={'column'}
                      display={{ base: 'none', md: 'flex' }}
                      alignItems={{ base: 'center', md: 'flex-start' }}
                      mt="80px"
                    >
                      <Text {...homeWelcomeText} color="black">
                        Decentralized and trustless
                      </Text>

                      <Text {...joinText} color="black" mt="20px">
                        Our platform operates on blockchain technology, ensuring
                        transparency and removing the need for intermediaries.
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
                      <Text {...homeWelcomeText} color="black">
                        Customizable coverage
                      </Text>

                      <Text {...joinText} color="black" mt="20px">
                        You can tailor your insurance coverage to your specific
                        needs, choosing the parameters that matter most to you.
                      </Text>
                    </Flex>

                    {/* RIGHT */}
                    <VStack
                      {...homeInnerBox2}
                      display={{ base: 'none', md: 'flex' }}
                      pos={'relative'}
                    >
                      <Image
                        src={SecureDexImage}
                        // pos={"absolute"}
                        // w={"300px"}
                        // h={"300px"}
                        right={'60px'}
                        bottom={'50px'}
                      />
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
                      <Image
                        src={MoneyDexImage}
                        // pos={"absolute"}
                        // w={"300px"}
                        // h={"300px"}
                        right={'60px'}
                        bottom={'50px'}
                      />
                    </VStack>

                    {/* RIGHT */}
                    <Flex
                      {...homeInnerBox1}
                      flexDir={'column'}
                      display={{ base: 'none', md: 'flex' }}
                      alignItems={{ base: 'center', md: 'flex-start' }}
                      mt="80px"
                    >
                      <Text {...homeWelcomeText} color="black">
                        Lower costs
                      </Text>

                      <Text {...joinText} color="black" mt="20px">
                        Our decentralized platform removes the need for
                        intermediaries, reducing costs and passing the savings
                        on to you.
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
                      <Text {...homeWelcomeText} color="black">
                        Quick and easy claims process
                      </Text>

                      <Text {...joinText} color="black" mt="20px">
                        In the event of a claim, our platform streamlines the
                        process, ensuring that you receive compensation quickly
                        and efficiently.
                      </Text>
                    </Flex>

                    {/* RIGHT */}
                    <VStack
                      {...homeInnerBox2}
                      display={{ base: 'none', md: 'flex' }}
                      pos={'relative'}
                    >
                      <Image
                        src={ClaimDexImage}
                        // pos={"absolute"}
                        // w={"300px"}
                        // h={"300px"}
                        right={'60px'}
                        bottom={'50px'}
                      />
                    </VStack>
                  </HStack>
                </Container>
              </Suspense>
            </Flex>

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
      fontSize: '34px',
      width: '100%',
      fontWeight: '600',
      lineHeight: '165%',
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
      mb: '30px',
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
