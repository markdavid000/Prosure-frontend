import React from 'react';
import {
  Flex,
  Box,
  Divider,
  Text,
  Stack,
  chakra,
  useColorModeValue,
  VisuallyHidden,
  Image,
} from '@chakra-ui/react';
import Container from './Container';
import { FaGithub, FaDiscord, FaTwitter } from 'react-icons/fa';
import prosureLogo from '../assets/Logo.svg';
import { Link } from 'react-router-dom';

const footerDesc = {
  fontSize: '14px',
  fontWeight: '400',
  lineHeight: '165%',
  color: 'black',
};

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', '#535252')}
      rounded={'full'}
      w={8}
      h={8}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const Footer3 = () => {
  let copyRightYear = new Date().getFullYear();

  return (
    <Box
      w={'100%'}
      padding={'50px'}
      bgImage="url('/images/Footer-Background.png')"
      p="50px"
    >
      <Box>
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}
        >
          <Flex w={'25%'} flexDir={'column'}>
            {/* Prosure Logo is here */}
            <Image src={prosureLogo} />

            <Flex my="25px">
              <Text {...footerDesc}>
                insurance coverage for these critical components of the
                decentralized ecosystem
              </Text>
            </Flex>
          </Flex>

          <Flex flexDir="column">
            <Text fontSize="18px" fontWeight="600" mb="20px">
              Pages
            </Text>
            <Stack direction={'row'} spacing={6}>
              <Link to="/">
                <Text fontSize="18px" fontWeight="500">
                  Home
                </Text>
              </Link>
              <Link to="/risk-assessor-dashboard">
                <Text fontSize="18px" fontWeight="500">
                  Dashboard
                </Text>
              </Link>
              <Link to="/protocols">
                <Text fontSize="18px" fontWeight="500">
                  Protocols
                </Text>
              </Link>
              <Link to="/claims">
                <Text fontSize="18px" fontWeight="500">
                  Claims
                </Text>
              </Link>
            </Stack>
          </Flex>
        </Container>
      </Box>

      <Divider border="1px solid #3E7FDF" />
      {/* Footer Links is here */}
      <Box
      // bg={useColorModeValue('#535252', 'gray.900')}
      // color={useColorModeValue('gray.700', 'gray.200')}
      >
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}
        >
          <Text>© {copyRightYear} Prosure. All rights reserved</Text>
          <Stack direction={'row'} spacing={6}>
            <SocialButton label={'Discord'} href={'#'}>
              <FaDiscord />
            </SocialButton>
            <SocialButton label={'Twitter'} href={'#'}>
              <FaTwitter />
            </SocialButton>
            <SocialButton label={'Github'} href={'#'}>
              <FaGithub />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer3;
