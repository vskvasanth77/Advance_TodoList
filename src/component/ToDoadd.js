import React, { useEffect, useState } from "react";
import "../component/ToDoadd.css";

const ToDoadd = () => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [allTodos, setAllTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);

  //function for handler;

  const addhandler = () => {
    let newTodoItem = {
      title: title,
      description: description,
    };

    let updatedTodo = [...allTodos];
    updatedTodo.push(newTodoItem);
    setAllTodos(updatedTodo);
    localStorage.setItem("todolist", JSON.stringify(updatedTodo));
    setTitle("");
    setDescription("");
  };

  //delete handler
  const deletehandler = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index);
    localStorage.setItem("todolist", JSON.stringify(reducedTodo));
    setAllTodos(reducedTodo);
  };

  //update handler

  const updatehandler = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth();
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();

    let completedOn = dd + "-" + mm + "-" + yyyy + "at" + h + ":" + m + ":" + s;

    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    deletehandler(index);
    localStorage.setItem("CompletedTodos", JSON.stringify(updatedCompletedArr));
  };

  //handler for completed delete handler

  const deleteCompletedhandler = (index) => {
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index);
    localStorage.setItem("todolist", JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  };

  //This is for localstorage
  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todolist"));
    let savedCompletedTodo = JSON.parse(localStorage.getItem("CompletedTodos"));
    if (savedTodo) {
      setAllTodos(savedTodo);
    }

    if (savedCompletedTodo) {
      setCompletedTodos(savedCompletedTodo);
    }
  }, []);
  return (
    <>
      <div className="app">
        <h1 className="header">Task Notes</h1>

        <div className="todo-wrapper">
          <div className="todo-input">
            <div className="todo-input-item">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                placeholder="What's the title?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="todo-input-item">
              <label htmlFor=""> Notes</label>
              <input
                type="text"
                placeholder="Whats the note ?"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <div className="todo-input-item">
              <button className="primaryBtn" onClick={addhandler}>
                Add
              </button>
            </div>
          </div>
          <div className="btn-area">
            <button
              className={`isCompleted ${isCompleted === false && "active"}`}
              onClick={() => setIsCompleted(false)}
            >
              Do List
            </button>
            <button
              className={`isCompleted ${isCompleted === true && "active"}`}
              onClick={() => setIsCompleted(true)}
            >
              Completed
            </button>
          </div>

          {/* this is btn flower */}

          <div className="todo-list">
            {isCompleted === false &&
              allTodos.map((item, index) => {
                return (
                  <div className="todo-list-item" key={index}>
                    <div className="todo-list-item-column">
                      <h1 className="h3">{item.title}</h1>
                      <p className="p">{item.description}</p>
                    </div>
                    <div className="btncontainer">
                      <i
                        className="fa-solid fa-trash icon "
                        onClick={() => deletehandler(index)}
                      ></i>
                      <i
                        className="fa-solid fa-check check-icon"
                        onClick={() => updatehandler(index)}
                      ></i>
                    </div>
                  </div>
                );
              })}

            {/* this is for completed todos */}
            {isCompleted === true &&
              completedTodos.map((item, index) => {
                return (
                  <div className="todo-list-item" key={index}>
                    <div className="todo-list-item-column">
                      <h1 className="h3">{item.title}</h1>
                      <p className="p">{item.description}</p>
                      <p className="p">
                        <small>{item.completedOn}</small>
                      </p>
                    </div>
                    <div className="btncontainer">
                      <i
                        className="fa-solid fa-trash icon "
                        onClick={() => deleteCompletedhandler(index)}
                      ></i>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ToDoadd;
