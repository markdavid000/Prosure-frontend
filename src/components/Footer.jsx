import React from 'react';
import {
  Flex,
  Text,
  Input,
  Button,
  Divider,
  Box,
  Image,
  Link,
  useColorModeValue,
  VisuallyHidden,
  Stack,
  chakra,
} from '@chakra-ui/react';
import Container from './Container';
import { footerLinks } from '../constants/dummyJSON';
import { nanoid } from 'nanoid';
import { FaGithub, FaDiscord, FaTwitter } from 'react-icons/fa';
import prosureLogo from '../assets/Logo.svg';

const CTA = 'Subscribe';

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

const Footer = () => {
  const { root, logoFont, footerDesc, linksStyle, ctaFont } = useStyles();

  let copyRightYear = new Date().getFullYear();

  return (
    <Flex
      {...root}
      flexDir={'column'}
      bgImage="url('/images/Footer-Background.png')"
      p="50px"
    >
      <Container>
        <Flex
          height={330}
          p={10}
          // px={{ base: 5, md: 40 }}
          justifyContent={'space-between'}
        >
          {/* LEFT COLUMN */}
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

          {/* MIDDLE COLUMN */}
          <Flex w={'55%'} px={'20%'} justify={'space-between'}>
            <Flex flexDir={'column'}>
              {footerLinks[1].links.map((e, i) => (
                <Link
                  key={nanoid()}
                  {...linksStyle}
                  fontSize={
                    i === 0
                      ? ['20px', '20px', '20px', '20px', '20px']
                      : ['14px', '14px', '14px', '14px', '16px']
                  }
                  fontWeight={i === 0 ? 600 : 400}
                  mt={i === 0 ? '10px' : '10px'}
                  color={i === 0 ? 'black' : 'black'}
                  href="#"
                >
                  {e}
                </Link>
              ))}
            </Flex>
          </Flex>

          {/* RIGHT COLUMN */}
          <Flex w={'20%'} align={'flex-end'} flexDir={'column'}>
            <Flex flexDir="column">
              <Text {...logoFont}>
                Subscribe to our <Text color="#6750A4">newsletter!</Text>
              </Text>

              <Input
                placeholder="E-mail address"
                _placeholder={{
                  color: 'black',
                }}
                size="sm"
                borderColor="ctaBg"
                borderRadius="4px 4px 0px 0px"
                mt="10px"
              />

              <Button
                borderRadius="100px"
                mt="10px"
                bg="ctaBg"
                {...ctaFont}
                _hover={{
                  bg: 'linear-gradient(0deg, rgba(103, 80, 164, 0.14), rgba(103, 80, 164, 0.14)), #FFFBFE',
                  color: 'black',
                }}
              >
                {CTA}
              </Button>
            </Flex>
          </Flex>
        </Flex>

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
      </Container>
    </Flex>
  );
};

export default Footer;

const useStyles = () => {
  return {
    root: {
      // w: "100%",
      background: 'footerBgColor',
      height: '450px',
      bgRepeat: 'no-repeat',
      bgSize: 'cover',
      mt: '50px',
      pt: 10,
    },
    logoFont: {
      fontSize: '22px',
      fontWeight: '600',
      lineHeight: '36px',
    },
    footerDesc: {
      fontSize: '16px',
      fontWeight: '400',
      lineHeight: '165%',
      color: 'black',
    },
    linksStyle: {
      color: 'black',
    },
    ctaFont: {
      fontSize: '14px',
      fontWeight: '400',
      lineHeight: '20px',
      letterSpacing: '0.1px',
      color: 'white',
    },
    footerBox: {
      h: '419px',
      w: '100%',
      bgRepeat: 'no-repeat',
      bgSize: 'cover',
      px: {
        base: '0%',
        md: '5%',
      },
    },
  };
};
