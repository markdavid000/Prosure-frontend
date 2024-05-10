import React from '@chakra-ui/react'
import {Flex, Text} from '@chakra-ui/react'

const StopErrorMessage = () => {
  return (
    <Flex display="flex" align={"center"} w="100%" alignItems={"center"} p="80px">
    <Flex bg="red" borderRadius="15px" p="30px" color="white" flexDir="column">
     <Text fontSize="16px" fontWeight="600">Sorry! this app is not currently supported on Mobile Devices. Coming soon!!</Text>
     <Text mt="20px" fontSize="14px">To use this app, please use Tablet Phone, Laptop or Desktop for a better display.</Text>
    </Flex>
   </Flex>
  )
}
export default StopErrorMessage
