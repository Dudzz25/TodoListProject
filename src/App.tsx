import { useState } from "react";
import "./App.css";
import { Button, ButtonGroup } from "@chakra-ui/react";
import TodoPage from "./Pages/TodoPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <TodoPage></TodoPage>
    </>
  );
}

export default App;
