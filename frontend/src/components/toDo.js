import React from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { deleteToDo } from "../utils/HandleApp";

const Todos = ({ data, updateMode, text, setToDo }) => {
  return (
    <div className="todo">
      <div className="text">{data?.name}</div>
      <div className="icons">
        <BiEdit
          className="icon"
          onClick={() => {
            console.log(data);
            updateMode(data?.id, data?.name);
          }}
        />
        <AiFillDelete
          className="icon"
          onClick={() => {
            deleteToDo(data?.id, setToDo);
          }}
        />
      </div>
    </div>
  );
};

export default Todos;
