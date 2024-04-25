import { useEffect, useState } from "react";
import Todos from "./components/toDo";
import { addToDo, getAllTodo, updateToDo, deleteToDo } from "./utils/HandleApp";

function App() {
  const [toDo, setToDo] = useState([]); // Initialize the state
  const [text, setText] = useState("  ");
  const [isUpdating, setIsUpdating] = useState(false);
  const [toDoId, setToDoId] = useState("");

  // Call the API when the component mounts
  useEffect(() => {
    getAllTodo(setToDo); // Pass the state updater function to the API call
  }, []); // Empty dependency array to run only once on component mount

  const updateMode = (id, name) => {
    setIsUpdating(true);
    setText(name);
    setToDoId(id);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>ToDo App</h1>
        <div className="top">
          <input
            type="text"
            placeholder="Add Todos"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div
            className="add"
            onClick={
              isUpdating
                ? () =>
                    updateToDo(toDoId, text, setToDo, setText, setIsUpdating)
                : () => addToDo(text, setText, setToDo)
            }
          >
            {isUpdating ? "Update" : "Add"}
          </div>
        </div>
        <div className="list">
          {toDo &&
            toDo.map((item) => (
              <Todos
                key={item.id}
                data={item}
                updateMode={updateMode}
                text={text}
                deleteToDo={deleteToDo}
                setToDo={setToDo}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
