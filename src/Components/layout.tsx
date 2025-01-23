// src/components/layout.tsx
import { ColorModeProvider } from "./ui/color-mode";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

// Extend Chakra theme if you need customizations
const theme = extendTheme({
  // Add your custom theme settings here
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeProvider>{children}</ColorModeProvider>
    </ChakraProvider>
  );
}
