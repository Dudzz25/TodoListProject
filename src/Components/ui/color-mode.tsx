import { createContext, useContext, ReactNode } from "react";
import { ColorModeScript, useColorMode } from "@chakra-ui/react";

// Define the type for the context value
interface ColorModeContextType {
  colorMode: string;
  setColorMode: (value: string) => void;
}

// Create the context with a default value of `null` and type it
const ColorModeContext = createContext<ColorModeContextType | null>(null);

export const ColorModeProvider = ({ children }: { children: ReactNode }) => {
  const { colorMode, setColorMode } = useColorMode();

  return (
    <ColorModeContext.Provider value={{ colorMode, setColorMode }}>
      <ColorModeScript />
      {children}
    </ColorModeContext.Provider>
  );
};

// Custom hook to use the ColorModeContext
export const useColorModeContext = () => {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error(
      "useColorModeContext must be used within a ColorModeProvider"
    );
  }
  return context;
};
