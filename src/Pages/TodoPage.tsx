import { useState, useEffect } from "react";
import { Input, Button } from "@chakra-ui/react";

const TodoPage = () => {
  // State to manage the current input value
  const [input, setInput] = useState<string>("");

  // State to manage the list of todos, each with text and done status
  const [todos, setTodos] = useState<{ text: string; done: boolean }[]>([]);

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

  //This function will mark the tasks done
  //I will move the task at the bottom when the task is done
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addTodo(); // Add the todo if Enter is pressed
    }
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
                  onKeyDown={handleKeyDown}
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
                        todo.done ? "bg-gray-500" : "bg-white border-black"
                      } cursor-pointer`}
                      onClick={() => toggleDone(index)}
                    />
                    {/* change ni siya  */}
                    {/* Todo text */}
                    <span
                      className="cursor-pointer hover:text-red-500"
                      onClick={() => deleteTodo(index)}
                    >
                      {todo.text}
                    </span>
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
