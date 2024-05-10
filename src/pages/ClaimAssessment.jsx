import React, {Suspense, lazy, useContext} from 'react'
// import {
//   Stepper,
//   Step,
//   useStepper,
//   StepNumber,
//   StepTitle,
//   StepStatus,
//   StepDescription,
// } from "react-progress-stepper";
import { Flex, Box, Text, Spinner, Image } from "@chakra-ui/react";
import Footer2 from '../components/Footer2';
import { useNavigate } from 'react-router-dom';
import arrowLeft from '../assets/arrow-left.svg';
import { StopScreenMessageContext } from '../constants/stopScreenMessage';
import StopErrorMessage from '../components/StopErrorMessage';

const NavBar = lazy(() => import("../components/Navbar"));

  const steps = [
    { label: "Submitted" },
    { label: "Investigating"  },
    { label: "Preparing payout" },
    { label: "Group claim" },
    { label: "Appeal" },
    { label: "Appeal ended" },
    { label: "Board review" },
    { label: "Payout ready" },
    { label: "Paid" },
  ]

const ClaimAssessment = () => {

  const { root } = useStyles();
  let navigate = useNavigate();

  // const { step, incrementStep, decrementStep } = useStepper(2, 9);

  const { isMobile } = useContext(StopScreenMessageContext);

  return (
    <>
     {!isMobile ?
    <Box w={"100%"}>
    <Suspense
     fallback={<Spinner size="lg" />}
   >
     <NavBar />
   </Suspense>
    
    <Box w={"100%"} {...root} mb="50px">

          <Flex flexDir="row" align="center"
                  onClick={() => navigate("/governance")}
                  cursor="pointer"
                  p="50px"
                 > 
                  <Image src={arrowLeft} boxSize="15px" mr="8px" />
                   <Text fontSize="16px" fontWeight="600">Claim Details</Text>
                   </Flex> 
           

    <Flex flexDir="column" width="100%" p="60px" mt="-40px">
      {/* <Stepper step={step}>
        <Step>
          <StepTitle>
            <Text fontSize="14px">Submitted</Text>
          </StepTitle>
        </Step>
        <Step>
         <StepTitle>
            <Text fontSize="14px">Investigating</Text>
          </StepTitle>
        </Step>
        <Step>
          <StepTitle>
            <Text fontSize="14px">Preparing payout</Text>
          </StepTitle>
          <StepDescription>Description</StepDescription>
        </Step>
        <Step>
        <StepTitle>
            <Text fontSize="14px">Group claim</Text>
          </StepTitle>
          <StepDescription>Description</StepDescription>
        </Step>
        <Step>
         <StepTitle>
            <Text fontSize="14px">Appeal</Text>
          </StepTitle>
          <StepDescription>Description</StepDescription>
        </Step>
        <Step>
         <StepTitle>
            <Text fontSize="14px">Appeal ended</Text>
          </StepTitle>
          <StepDescription>Description</StepDescription>
        </Step>
        <Step>
         <StepTitle>
            <Text fontSize="14px">Board review</Text>
          </StepTitle>
          <StepDescription>Description</StepDescription>
        </Step>
        <Step>
         <StepTitle>
            <Text fontSize="14px">Payout ready</Text>
          </StepTitle>
          <StepDescription>Description</StepDescription>
        </Step>
        <Step>
        <StepTitle>
            <Text fontSize="14px">Paid</Text>
          </StepTitle>
          <StepStatus />
          <StepDescription>Description</StepDescription>
        </Step>
      </Stepper> */}
    </Flex>

    {/* <Flex mt="40px" p="70px">
      <Button onClick={decrementStep}>Prev</Button>
      <Button onClick={incrementStep}>Next</Button>
   </Flex> */}
   
   </Box>
    <Footer2 />
    </Box>
       : 
       <StopErrorMessage />
      }
    </>
  );
};

export default ClaimAssessment;

const useStyles = () => {
  return {
    root: {
      backgroundColor: "#FBFDFF",
      // height: "10vh",
      // borderBottomLeftRadius: 20,
      // borderBottomRightRadius: 20,
    },

  }

}
