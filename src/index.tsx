import React, { useState } from "react";
import "./index.scss";
import ReactDOM from "react-dom/client";
import { Box, Button, ChakraProvider, HStack, VStack } from "@chakra-ui/react";
import { DocWrap } from "./layouts/doc-wrap";
import { ConfigContext, ConfigModel } from "./context/config-context";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <ChakraProvider>
    <DocWrap />
  </ChakraProvider>
);
