import React, {Suspense, lazy} from 'react'
import { Flex, Box, Spinner, Text, Image, Spacer,
    HStack,
    Center
} from '@chakra-ui/react';
import Footer2 from '../components/Footer2';
import Container from '../components/Container';
import arrowLeft from '../assets/arrow-left.svg'
import Lottie from "lottie-react";
import notfound404Animation from '../lottie/109070-error-404-landing-page.json';
import { useNavigate } from 'react-router-dom';

const NavBar = lazy(() => import("../components/Navbar"));

const style = {
    height: 300,
  };

const NotFoundPage = () => {

    const { root, NotFoundBox, 
        NotFoundInnerBox1, 
        NotFoundInnerBox3,
        NotFoundWelcomeText,
        outerBox,
        joinText,
    } = useStyles()

    let navigate = useNavigate();

  return (
    <Box w="100%">
    <Suspense
     // fallbac k={<Skeleton isLoaded={true} w={"100%"} h={"48px"}></Skeleton>}
     fallback={<Spinner size="sm" />}
   >
     <NavBar />
   </Suspense> 
   <Box w={"100%"} {...root}>
   <Flex {...NotFoundBox}>
         <Suspense fallback={<Spinner size="sm" />}>
          <Container>
            <HStack {...outerBox}>
                  {/* LEFT */}
                  <Flex
                  {...NotFoundInnerBox1}
                  flexDir={"column"}
                  display={{ base: "none", md: "flex" }}
                  alignItems={{ base: "center", md: "flex-start" }}
                  mt= "80px"
                >
                  <Text
                    {...NotFoundWelcomeText}
                    color="black"
                  >
                  Oops! 404 Error
                  </Text>

                  <Text
                    {...joinText}
                    color="black"
                  >
                    It seems the page you’re looking for does not exist or has been moved elsewhere.
                  </Text>
                  <Flex alignContent="center" justify="center">
                    <Flex>
                    <Suspense fallback={<Spinner size="sm" />}>
                       <Center p="10px 30px" bg="#E8DEF8" 
                       borderRadius="100px" 
                       w="200px" 
                       h="60px"
                       cursor={"pointer"}
                       onClick={() => navigate("/")}
                       >
                       <Image src={arrowLeft} boxSize="15px" />
                       <Text color="#1D192B" fontWeight="500">Go Back</Text>
                      </Center>
                      </Suspense>
                    </Flex>
                    <Spacer mr="20px" />
                    <Flex>
                    <Suspense fallback={<Spinner size="sm" />}>
                       <Center p="10px 30px" bg="#3E7FDF" 
                         borderRadius="100px" w="200px" h="60px" mr="20px"
                         cursor="pointer"
                         onClick={() => navigate("/")}
                         >
                       <Text color="white" fontWeight="500">Take me home</Text>
                      </Center>
                      </Suspense>
                    </Flex>
                  
                  
              </Flex>
                </Flex>

                   {/* RIGHT */}
                <HStack
                  {...NotFoundInnerBox3}
                  display={{ base: "none", md: "flex" }}
                >
                <Lottie
                 animationData={notfound404Animation}
                 style={style}
                 />
                </HStack>
            </HStack>
          </Container>
         </Suspense>
      </Flex>
      </Box>

      {/* -- Footer area ----- */}
      <Footer2 />
   </Box>
  )
}

export default NotFoundPage


const useStyles = () => {
    return {
      root: {
      },
      NotFoundInnerBox1: {
        w: {
          base: "60vw",
          md: "46vw",
        },
        h: "",
      },
      NotFoundInnerBox2: {
        w: {
          base: "60vw",
          md: "35vw",
        },
        h: "100%",
        overflow: "hidden",
        // zIndex: 3000000,
      },
      NotFoundInnerBox3: {
        w: {
          base: "60vw",
          md: "35vw",
        },
        h: "100%",
        overflow: "hidden",
        // zIndex: 3000000,
      },
      NotFoundWelcomeText: {
         fontSize: "22px",
         width: "100%",
         fontWeight: "600",
         lineHeight: "165%",
         color: "black",
      },
      NotFoundBox: {
        h: "550px",
        w: "100%",
        bgRepeat: "no-repeat",
        bgSize: "cover",
        pt: "100px",
        px: {
          base: "0%",
          md: "5%",
        },
        mb: "30px"
      },
      outerBox: {
        bg: "transparent",
        h: "300px",
        w: "100%",
        justify: "space-evenly",
      },
      joinText: {
        fontSize: ["34px"],
        width: "100%",
        color: "white",
        my: {
          base: "30px",
          md: "25px",
        },
        fontWeight: "400"
      },
    };
  };
  