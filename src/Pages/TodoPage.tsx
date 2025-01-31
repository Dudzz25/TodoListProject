import { Input, Button } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import { Image, Box } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import ChildPage1 from "./ChildPage1";
import ChildPage2 from "./ChildPage2";

const TodoPage = () => {
  const location = useLocation();
  return (
    <div className="h-screen w-screen bg-slate-950 font-mono flex items-center justify-center">
      <div className="h-[60rem] w-[50rem] bg-gray-300 p-[.1rem] rounded-xl">
        <div className="h-full w-full bg-black p-[1.5rem] rounded-xl">
          <div className="h-full w-full bg-white rounded-xl flex flex-col items-center justify-start">
            {/* Header */}
            <Box>
              <Image
                src="/images/logoToldoList.png"
                alt="Dan Abramov"
                className="mt-0 flex items-center justify-center w-full"
                height={"180px"}
              />
            </Box>

            {/* This if for navigation  */}
            <div className="w-full flex items-center justify-center gap-5 mb-10">
              <Link to="/child1">
                <Button
                  colorScheme={
                    location.pathname === "/child1" ? "blue" : "gray"
                  }
                  variant="link"
                  fontSize={"1.5rem"}
                >
                  TodoList
                </Button>
              </Link>
              <Link to="/child2">
                <Button
                  colorScheme={
                    location.pathname === "/child2" ? "blue" : "gray"
                  }
                  variant="link"
                  fontSize={"1.5rem"}
                >
                  History
                </Button>
              </Link>
            </div>

            <div>
              {/* The Routes will render the matching child page */}
              <Routes>
                <Route path="/child1" element={<ChildPage1 />} />
                <Route path="/child2" element={<ChildPage2 />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
