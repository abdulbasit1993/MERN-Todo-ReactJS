import React, { useState, useEffect } from "react";
import "./App.css";
import Item from "./components/Item";
import axios from "axios";

function App() {
  const [text, setText] = useState("");
  const [todo, setTodo] = useState([]);
  const [isUpdating, setIsUpdating] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    axios
      .get("http://192.168.0.111:5000/get-todo")
      .then((res) => {
        console.log(res?.data);
        setTodo(res?.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const addUpdate = () => {
    if (isUpdating === "") {
      axios
        .post("http://192.168.0.111:5000/save-todo", { text })
        .then((res) => {
          console.log(res?.data);
          setText("");
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post("http://192.168.0.111:5000/update-todo", {
          _id: isUpdating,
          text,
        })
        .then((res) => {
          console.log(res?.data);
          setText("");
          setIsUpdating("");
        })
        .catch((err) => console.log(err));
    }
  };

  const deleteTodo = (_id) => {
    axios
      .post("http://192.168.0.111:5000/delete-todo", {
        _id,
      })
      .then((res) => {
        console.log(res?.data);
      })
      .catch((err) => console.log(err));
  };

  const updateTodo = (_id, text) => {
    setIsUpdating(_id);
    setText(text);
  };

  return (
    <div className="App">
      <div className="container">
        <h1>ToDo App</h1>

        <div className="top">
          <input
            type="text"
            placeholder="Write Something..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="add" onClick={addUpdate}>
            {isUpdating ? "Update" : "Add"}
          </div>
        </div>

        <div className="list">
          {todo.map((item) => (
            <Item
              key={item?._id}
              text={item?.text}
              remove={() => deleteTodo(item?._id)}
              update={() => updateTodo(item?._id, item?.text)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
