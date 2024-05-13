import React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  HStack,
} from '@chakra-ui/react';
import { ConnectProsure } from '../../utils/customConnect';

export default function DrawerBg({
  p = 15,
  placement = 'right',
  width,
  isOpen,
  children,
  onClose,
  btnRef,
  // title = "Menu",
  footer,
}) {
  return (
    <Flex w={width}>
      <Drawer
        isOpen={isOpen}
        placement={placement}
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent alignItems="center" bg={'#403268'} pt={'5rem'}>
          <DrawerCloseButton
            alignSelf="end"
            mx={p}
            my={p}
            fontSize={'1.2rem'}
            color={'#ced4da'}
          />
          <DrawerHeader my={p}>
            {/* <Text as="p"> {title} </Text> */}
            <HStack>
              <ConnectProsure />
            </HStack>
          </DrawerHeader>
          <DrawerBody>{children}</DrawerBody>
          <DrawerFooter>{footer}</DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}
