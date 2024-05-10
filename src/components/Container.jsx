import { Container as ContainerBox } from "@chakra-ui/react";
import React from "react";

export default function Container({ children, ...props }) {
  return (
    // pos="relative"
    <ContainerBox maxW={"container"} {...props}>
      {children}
    </ContainerBox>
  );
}
