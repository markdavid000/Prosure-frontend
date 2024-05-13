import {
  Flex,
  Button,
  HStack,
  Image,
  useBreakpointValue,
  Menu,
  MenuItem,
  MenuButton,
  MenuList,
  useDisclosure,
  Center,
  Box,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { nanoid } from 'nanoid';
import { navbar_data } from '../utils/navbarData';
import prosureLogo from '../assets/Logo.svg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import MobileDrawer from './mobileDrawer/MobileDrawer';
import { ConnectProsure } from '../utils/customConnect';

const Navbar = () => {
  let navigate = useNavigate();

  const isDesktop = useBreakpointValue({ base: false, lg: true });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: profileIsOpen,
    onOpen: profileOnOpen,
    onClose: profileOnClose,
  } = useDisclosure();

  return (
    <Flex
      w="100%"
      h={'4rem'}
      align="center"
      justify="space-between"
      bg="#040411"
      // pos="sticky"
      top={0}
      zIndex={50000}
      // p="20px 100px 0px 100px"
    >
      <Box>
        <Link to="/">
          <Image src={prosureLogo} alt="logo" />
        </Link>
      </Box>

      {isDesktop ? (
        <>
          <HStack as="nav" spacing="5">
            {navbar_data.map(item => (
              <Link key={nanoid()} to={item.link}>
                <Button
                  variant="nav"
                  fontWeight={400}
                  _focus={{ color: 'ctaBg', fontWeight: '600' }}
                  color={'#868e96'}
                >
                  {' '}
                  {item.name}{' '}
                </Button>
              </Link>
            ))}
            <Flex alignItems={'left'}>
              <Menu isOpen={isOpen} zIndex={'10'}>
                <MenuButton
                  px={2}
                  py={1}
                  _hover={{
                    color: 'ctaBg',
                    boxShadow: 'none',
                    fontWeight: '600',
                  }}
                  color={'#868e96'}
                  onMouseEnter={onOpen}
                  onMouseLeave={onClose}
                  w={{ lg: '135px' }}
                >
                  <Flex>
                    Governance
                    <Center>
                      <ChevronDownIcon />
                    </Center>
                  </Flex>
                </MenuButton>
                <MenuList
                  border="none"
                  onMouseEnter={onOpen}
                  onMouseLeave={onClose}
                  mt={-1}
                  bg={'#1f1734'}
                >
                  <MenuItem
                    bg={'#1f1734'}
                    color={'#fff'}
                    _hover={{ bg: '#82fffc', color: '#000' }}
                    onClick={() => navigate('/governance')}
                  >
                    Governance
                  </MenuItem>
                  <MenuItem
                    bg={'#1f1734'}
                    color={'#fff'}
                    _hover={{ bg: '#82fffc', color: '#000' }}
                    onClick={() => navigate('/governance-claims')}
                  >
                    Proposals
                  </MenuItem>
                  <MenuItem
                    bg={'#1f1734'}
                    color={'#fff'}
                    _hover={{ bg: '#82fffc', color: '#000' }}
                    onClick={() => navigate('/dao-members')}
                  >
                    Members
                  </MenuItem>
                  <MenuItem
                    bg={'#1f1734'}
                    color={'#fff'}
                    _hover={{ bg: '#82fffc', color: '#000' }}
                    onClick={() => navigate('/dao-member-portal')}
                  >
                    Governance Profile
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
            <Flex>
              <Menu isOpen={profileIsOpen}>
                <MenuButton
                  px={2}
                  py={1}
                  _hover={{
                    color: 'ctaBg',
                    boxShadow: 'none',
                    fontWeight: '600',
                  }}
                  color={'#868e96'}
                  onMouseEnter={profileOnOpen}
                  onMouseLeave={profileOnClose}
                  w={{ lg: '135px' }}
                >
                  <Flex>
                    Profile
                    <Center>
                      <ChevronDownIcon />
                    </Center>
                  </Flex>
                </MenuButton>
                <MenuList
                  border="none"
                  onMouseEnter={profileOnOpen}
                  onMouseLeave={profileOnClose}
                  mt={-1}
                  bg={'#1f1734'}
                >
                  <MenuItem
                    bg={'#1f1734'}
                    color={'#fff'}
                    _hover={{ bg: '#82fffc', color: '#000' }}
                    onClick={() => navigate('/risk-assessor-dashboard')}
                  >
                    Dashboard
                  </MenuItem>
                  <MenuItem
                    bg={'#1f1734'}
                    color={'#fff'}
                    _hover={{ bg: '#82fffc', color: '#000' }}
                    onClick={() => navigate('/insurer-dashboard')}
                  >
                    Insurer Dashboard
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </HStack>

          <HStack>
            <ConnectProsure />
          </HStack>
        </>
      ) : (
        <MobileDrawer />
      )}
    </Flex>
  );
};

export default Navbar;

export const useNavbarStyles = () => {
  return {
    logoFont: {
      fontSize: '22px',
      fontWeight: '600',
      lineHeight: '36px',
    },
    ctaFont: {
      fontSize: '14px',
      fontWeight: '400',
      lineHeight: '20px',
      letterSpacing: '0.1px',
    },
  };
};
