import { useEffect, useState } from "react";
import Todos from "./components/toDo";
import { getAllTodo } from "./utils/HandleApp";

function App() {
  const [toDo, setToDo] = useState([]); // Initialize the state

  // Call the API when the component mounts
  useEffect(() => {
    getAllTodo(setToDo); // Pass the state updater function to the API call
  }, []); // Empty dependency array to run only once on component mount

  return (
    <div className="App">
      <div className="container">
        <h1>ToDo App</h1>
        <div className="top">
          <input type="text" placeholder="Add Todos" />
          <div className="add">Add</div>
        </div>
        <div className="list">
          {toDo.map((item) => (
            <Todos key={item._id} text={item.name} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

