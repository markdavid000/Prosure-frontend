import React, { useRef } from 'react';
import {
  useDisclosure,
  Flex,
  Button,
  VStack,
  Menu,
  MenuItem,
  MenuButton,
  MenuList,
  Center,
} from '@chakra-ui/react';
import DrawerBg from './DrawerBg';
import { IoMdMenu } from 'react-icons/io';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { navbar_data } from '../../utils/navbarData';
import { nanoid } from 'nanoid';

export default function MobileDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { onOpen: dropOnOpen, onClose: dropOnClose } = useDisclosure();
  const {
    isOpen: profileIsOpen,
    onOpen: profileOnOpen,
    onClose: profileOnClose,
  } = useDisclosure();
  const btnRef = useRef();
  let navigate = useNavigate();

  return (
    <Flex zIndex={'10'}>
      <Button ref={btnRef} onClick={onOpen} bg={'none'} _hover={{ bg: 'none' }}>
        <IoMdMenu size="26px" color={'#ced4da'} />
      </Button>

      <DrawerBg isOpen={isOpen} onClose={onClose} finalFocusRef={btnRef}>
        <VStack alignItems="left" zIndex={'10'}>
          {navbar_data.map(item => (
            <Link key={nanoid()} to={item.link}>
              <Button variant="text" fontWeight="400" color={'#ced4da'}>
                {' '}
                {item.name}{' '}
              </Button>
            </Link>
          ))}
          <Flex alignItems={'left'}>
            <Menu>
              <MenuButton
                px={2}
                py={1}
                color={'#ced4da'}
                _hover={{
                  color: '#ced4da',
                  boxShadow: 'none',
                  fontWeight: '600',
                }}
                onMouseEnter={dropOnOpen}
                onMouseLeave={dropOnClose}
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
                bg={'#040411'}
              >
                <MenuItem
                  bg={'#040411'}
                  color={'#fff'}
                  _hover={{ bg: '#82fffc', color: '#000' }}
                  onClick={() => navigate('/governance')}
                >
                  Governance
                </MenuItem>
                <MenuItem
                  bg={'#040411'}
                  color={'#fff'}
                  _hover={{ bg: '#82fffc', color: '#000' }}
                  onClick={() => navigate('/governance-claims')}
                >
                  Proposals
                </MenuItem>
                <MenuItem
                  bg={'#040411'}
                  color={'#fff'}
                  _hover={{ bg: '#82fffc', color: '#000' }}
                  onClick={() => navigate('/dao-members')}
                >
                  Members
                </MenuItem>
                <MenuItem
                  bg={'#040411'}
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
                color={'#ced4da'}
                _hover={{
                  color: '#ced4da',
                  boxShadow: 'none',
                  fontWeight: '600',
                }}
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
                bg={'#040411'}
              >
                <MenuItem
                  bg={'#040411'}
                  color={'#fff'}
                  _hover={{ bg: '#82fffc', color: '#000' }}
                  onClick={() => navigate('/risk-assessor-dashboard')}
                >
                  Dashboard
                </MenuItem>
                <MenuItem
                  bg={'#040411'}
                  color={'#fff'}
                  _hover={{ bg: '#82fffc', color: '#000' }}
                  onClick={() => navigate('/insurer-dashboard')}
                >
                  Insurer Dashboard
                </MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </VStack>
      </DrawerBg>
    </Flex>
  );
}
