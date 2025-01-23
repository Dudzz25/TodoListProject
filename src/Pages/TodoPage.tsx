import { useState } from "react";
import { Input, Button } from "@chakra-ui/react";

const TodoPage = () => {
  // State to manage the current input value
  const [input, setInput] = useState<string>("");

  // State to manage the list of todos, each with text and done status
  const [todos, setTodos] = useState<{ text: string; done: boolean }[]>([]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // Add the todo to the list
  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { text: input, done: false }]);
      setInput(""); // Clear the input after adding
    }
  };

  // Toggle the 'done' status of a todo
  const toggleDone = (index: number) => {
    const updatedTodos = [...todos];
    updatedTodos[index].done = !updatedTodos[index].done; // Toggle done status
    setTodos(updatedTodos);
  };

  return (
    <div className="h-screen w-screen bg-slate-950 font-mono flex items-center justify-center">
      <div className="h-[60rem] w-[50rem] bg-gray-300 p-[.1rem] rounded-xl">
        <div className="h-full w-full bg-black p-[1.5rem] rounded-xl">
          <div className="h-full w-full bg-white rounded-xl flex flex-col items-center justify-start">
            {/* Header */}
            <h1 className="mt-10 text-4xl font-medium">TodoList App</h1>
            {/* Body */}
            <div className="w-full flex flex-col items-start justify-start ml-40 mt-20">
              {/* Textbox with enter Button */}
              <div className="flex gap-2">
                <Input
                  placeholder="Enter Something..."
                  size="md"
                  borderColor="black"
                  width="32rem"
                  value={input}
                  onChange={handleInputChange}
                />
                <Button colorScheme="blue" onClick={addTodo}>
                  Send it
                </Button>
              </div>

              {/* Lists */}
              <h1 className="mt-5 text-2xl font-medium">Todos:</h1>
              <ul className="mt-4 space-y-4">
                {todos.map((todo, index) => (
                  <li
                    key={index}
                    className={`flex items-center gap-3 text-lg ${
                      todo.done ? "line-through text-gray-500" : ""
                    }`}
                  >
                    <div
                      className={`w-5 h-5 border-3 borderist ${
                        //I can't change the border color
                        todo.done ? "bg-gray-500" : "bg-white border-black"
                      } cursor-pointer`}
                      onClick={() => toggleDone(index)}
                    />

                    {/* Todo text */}
                    <span>{todo.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
