import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";

const ChildPage1 = () => {
  // State to manage the current input value
  const [input, setInput] = useState<string>("");
  const [todos, setTodos] = useState<
    { text: string; done: boolean; category: string; date: string }[]
  >([]);
  const { isOpen, onOpen, onClose } = useDisclosure(); // Chakra UI Modal hooks

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // Add the todo to the list
  const addTodo = (category: string) => {
    if (input.trim()) {
      const currentDate = new Date().toLocaleDateString(); // Get the current date
      setTodos([
        ...todos,
        { text: input, done: false, category, date: currentDate },
      ]);
      setInput(""); // Clear the input after adding
      onClose(); // Close the modal after adding the todo
    }
  };

  // This function will mark the tasks done
  const toggleDone = (index: number) => {
    const updatedTodos = [...todos];
    updatedTodos[index].done = !updatedTodos[index].done;

    // Move completed todo to the bottom of the list
    if (updatedTodos[index].done) {
      const completedTodo = updatedTodos.splice(index, 1)[0];
      updatedTodos.push(completedTodo);
    }

    setTodos(updatedTodos);
  };

  // Function to delete a todo item from the list
  const deleteTodo = (index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  // Handle key press for adding todo (Enter)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission or any unwanted behavior
      onOpen(); // Open the modal
    }
  };

  // When user opened the website load the lists they created
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos") || "[]");
    setTodos(storedTodos);
  }, []);

  // When list change save it to the browser
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  // Group todos by date
  const groupedTodos = todos.reduce((groups, todo) => {
    const date = todo.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(todo);
    return groups;
  }, {} as Record<string, { text: string; done: boolean; category: string; date: string }[]>);

  return (
    <div className="w-full flex flex-col items-start justify-start">
      {/* Textbox with enter Button */}
      <div className="flex gap-2">
        <Input
          placeholder="Enter Something..."
          size="md"
          borderColor="black"
          width="32rem"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <Button colorScheme="blue" onClick={onOpen}>
          Send it
        </Button>
      </div>

      {/* Lists */}
      <h1 className="mt-5 text-2xl font-medium">Todos:</h1>
      <div className="mt-2 space-y-4">
        {Object.keys(groupedTodos).map((date) => (
          <div key={date}>
            <h2 className="text-xl font-bold">{date}</h2>
            <ul className="space-y-4">
              {groupedTodos[date].map((todo, index) => (
                <li
                  key={index}
                  className="flex items-center gap-3 text-lg group relative"
                >
                  <span
                    className={`ml-2 text-sm text-white py-1 px-2 rounded ${
                      todo.category === "Urgent"
                        ? "bg-yellow-500"
                        : todo.category === "Important"
                        ? "bg-red-500"
                        : "bg-blue-500"
                    }`}
                  >
                    [{todo.category}]
                  </span>
                  <div
                    className={`w-5 h-5 border-3 ${
                      todo.done ? "bg-gray-500" : "bg-white border-black"
                    } cursor-pointer`}
                    onClick={() => toggleDone(index)}
                  />
                  {/* Todo text */}
                  <span
                    className={` ${
                      todo.done ? "line-through text-gray-500" : ""
                    }`}
                  >
                    {todo.text}
                  </span>
                  <Button
                    colorScheme="red"
                    variant="outline"
                    height={"2rem"}
                    width={"4rem"}
                    fontSize={".9rem"}
                    onClick={() => deleteTodo(index)}
                    className="cursor-pointer absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Modal to select todo category */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select Priority</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Button
              onClick={() => {
                addTodo("Urgent"); // Add todo immediately with 'Urgent' category
              }}
              colorScheme="yellow"
              width="100%"
              mb={2}
            >
              Urgent
            </Button>
            <Button
              onClick={() => {
                addTodo("Important"); // Add todo immediately with 'Important' category
              }}
              colorScheme="red"
              width="100%"
              mb={2}
            >
              Important
            </Button>
            <Button
              onClick={() => {
                addTodo("Normal"); // Add todo immediately with 'Normal' category
              }}
              colorScheme="blue"
              width="100%"
              mb={2}
            >
              Normal
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ChildPage1;
