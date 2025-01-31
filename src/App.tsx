import { useState } from "react";
import "./App.css";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import TodoPage from "./Pages/TodoPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <TodoPage></TodoPage>
      </Router>
    </>
  );
}

export default App;
