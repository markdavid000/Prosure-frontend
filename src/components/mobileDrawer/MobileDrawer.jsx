import React, {useRef} from "react";
import { useDisclosure, 
     Flex, 
     Button,  
     VStack, 
     Menu,
     MenuItem,
     MenuButton,
     MenuList,
     Center
    } from "@chakra-ui/react";
import DrawerBg from "./DrawerBg";
import { IoMdMenu } from 'react-icons/io';
import {ChevronDownIcon} from '@chakra-ui/icons'
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { navbar_data } from "../../utils/navbarData";
import { nanoid } from "nanoid";

export default function MobileDrawer() {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: dropIsOpen, onOpen: dropOnOpen, onClose: dropOnClose } = useDisclosure();
    const {isOpen: profileIsOpen, onOpen: profileOnOpen, onClose: profileOnClose} = useDisclosure()
    const btnRef = useRef();
    let navigate = useNavigate();

return (
    <Flex >
      <Button ref={btnRef} onClick={onOpen}>
        <IoMdMenu size="26px" />
      </Button>
      
      <DrawerBg
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <VStack alignItems="left">
          {navbar_data.map((item) => (
            <Link key={nanoid()} to={item.link}>
              <Button variant='text' fontWeight="400"> {item.name} </Button>
            </Link>
          ))}
              <Flex alignItems={'left'}>
              <Menu isOpen={dropIsOpen}>
               <MenuButton
                 px={2}
                 py={1}
                 _hover={{ color: "ctaBg", boxShadow: 'none', fontWeight: "600"}}
                 onMouseEnter={dropOnOpen}
                 onMouseLeave={dropOnClose}
                 w={{lg: "135px"}}
               >
                <Flex>
                  Governance
                  <Center>
                    <ChevronDownIcon />
                  </Center>
                </Flex>
               </MenuButton>
               <MenuList border="none" onMouseEnter={onOpen} onMouseLeave={onClose} mt={-1}>
                  <MenuItem _hover={{bg: 'ctaBg', color: "white" }}
                  onClick={() => navigate("/governance")}
                   >Governance</MenuItem>
                 <MenuItem _hover={{ bg: 'ctaBg', color:"white" }}
                 onClick={() => navigate("/governance-claims")}
                  >Proposals</MenuItem>
                 <MenuItem _hover={{ bg: 'ctaBg', color:"white" }}
                 onClick={() => navigate("/dao-members")}
                 >Members</MenuItem>
                 <MenuItem _hover={{ bg: 'ctaBg', color:"white" }}
                 onClick={() => navigate("/dao-member-portal")}
                 >Governance Profile</MenuItem>
              </MenuList>
              </Menu>
          </Flex>

          <Flex>
            <Menu isOpen={profileIsOpen}>
               <MenuButton
                 px={2}
                 py={1}
                 _hover={{ color: "ctaBg", boxShadow: 'none', fontWeight: "600"}}
                 onMouseEnter={profileOnOpen}
                 onMouseLeave={profileOnClose}
                 w={{lg: "135px"}}
               >
                <Flex>
                  Profile
                  <Center>
                    <ChevronDownIcon />
                  </Center>
                </Flex>
               </MenuButton>
               <MenuList border="none" onMouseEnter={profileOnOpen} onMouseLeave={profileOnClose} mt={-1}>
                  <MenuItem _hover={{bg: 'ctaBg', color: "white" }}
                  onClick={() => navigate("/risk-assessor-dashboard")}
                   >Dashboard</MenuItem>
                 <MenuItem _hover={{ bg: 'ctaBg', color:"white" }}
                 onClick={() => navigate("/insurer-dashboard")}
                  >Insurer Dashboard</MenuItem>
              </MenuList>
              </Menu>
            </Flex>
        </VStack>
      </DrawerBg>
    </Flex>
  );
};