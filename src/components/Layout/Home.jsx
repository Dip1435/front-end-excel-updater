import { useState } from "react";

const Home = () => {
  const [todo, setTodo] = useState([]);
  const [todoInput, setTodoInput] = useState("");
  const handleAddTodo = () => {
    setTodo([...todo, todoInput]);
    setTodoInput("");
  };
  return (
    <div className="">
      <h1 className="text-xl text-center font-bold">Welcome to TODO app</h1>
      <div className="mt-5 flex justify-center gap-1.5">
        <input
          className="ps-0.5 border rounded-sm"
          type="text9"
          onChange={(e) => setTodoInput(e.target.value)}
          name="todo"
          id="todo"
          value={todoInput}
          placeholder="Add todo"
        />
        <button
          className="bg-black text-white p-1 rounded-sm cursor-pointer"
          onClick={() => handleAddTodo()}
        >
          Add Todo
        </button>
      </div>
      <div className="mt-5 flex justify-center gap-1.5">
        {/* <h1 className="text-xl text-center font-medium">List of Todos</h1> */}
        <ul>
          {todo?.map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
