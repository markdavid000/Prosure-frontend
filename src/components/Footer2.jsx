import React from 'react';
import {
  Box,
  Divider,
  Text,
  Stack,
  chakra,
  useColorModeValue,
  VisuallyHidden,
} from '@chakra-ui/react';
import Container from './Container';
import { FaGithub, FaDiscord, FaTwitter } from 'react-icons/fa';

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

const Footer2 = () => {
  let copyRightYear = new Date().getFullYear();

  return (
    <Box
      w={'100%'}
      bgGradient="linear(to-b, #040411, #011e4c, #403268)"
      p="50px"
    >
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
          <Text color={'#868e96'}>
            © {copyRightYear} Prosure. All rights reserved
          </Text>
          <Stack direction={'row'} spacing={6}>
            <SocialButton label={'Discord'} href={'#'}>
              <FaDiscord color="#868e96" />
            </SocialButton>
            <SocialButton label={'Twitter'} href={'#'}>
              <FaTwitter color="#868e96" />
            </SocialButton>
            <SocialButton label={'Github'} href={'#'}>
              <FaGithub color="#868e96" />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer2;
