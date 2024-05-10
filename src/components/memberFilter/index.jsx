// @flow
import { memo } from "react";
import {
  Flex,
  HStack,
  Text,
  Select,
  InputGroup,
  Image,
} from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import arrowLeft from '../../assets/arrow-left.svg';

const ProposalFilter = () => {


  const { popFont } = useStyles();

  // const allMaterials = [];

  return (
    <HStack w={"100%"} p="60px">
      {/* -----------------------------------------------------DIVIDE----------------------------------------------- */}
        <InputGroup>
           <Link to="/governance">
              <Flex flexDir="row" align="center"> 
            <Image src={arrowLeft} boxSize="15px" mr="10px" />
              <Text fontSize="16px" fontWeight="500">Back</Text>
            </Flex> 
          </Link>
          
        </InputGroup>

            <Text {...popFont}>Sortby:</Text>
        
          {/* Select one */}
          <Select placeholder='None' _placeholder={{ color: "#49454F"}} width={"10%"}>
            <option value='option1'>Option 1</option>
            <option value='option2'>Option 2</option>
            <option value='option3'>Option 3</option>
          </Select>
    </HStack>
  );
};

export default memo(ProposalFilter);

const useStyles = () => {
  return {
    root: {
      h: "36px",
      pr: "20px",
      _hover: {
        background: "black",
        color: "white",
      },
    },
    popFont: {
      fontSize: "18px",
      color: "#000000",
      fontWeight: "500"
    },
  };
};
