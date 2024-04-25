import React from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

const Todos = ({ data, updateMode, text }) => {
  return (
    <div className="todo">
      <div className="text">{data?.name}</div>
      <div className="icons">
        <BiEdit className="icon" onClick={() => {
             console.log(data);
             updateMode(data?.id, data?.name);
        }} />
        <AiFillDelete
          className="icon"
          onClick={() => {
           
          }}
        />
      </div>
    </div>
  );
};

export default Todos;
