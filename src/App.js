import "./App.css";
import { useEffect, useState } from "react";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {  } from '@fortawesome/free-solid-svg-icons';
// import { AiOutlineDelete, FaYoutube } from "react-icons/fa";
import { FaBeer } from "react-icons/fa";
function App() {
  //for toggle btn
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  //for all Todo entrys
  const [allTodos, setTodos] = useState([]);
  //for todo title
  const [newTitle, setNewTiltle] = useState("");
  //for todo Description
  const [newDesc, setNewDec] = useState("");
  //for completed task
  const [completedTodo, setCompletedToDo] = useState([]);

  // for adding items in todo
  const handlerAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDesc,
    };

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr));
    // local storage is used for no data lost , converted to json using setItem
  };

  useEffect(() => {
    let savedToDO = JSON.parse(localStorage.getItem("todolist"));
    let completedToDO = JSON.parse(localStorage.getItem("Completedtodolist"));

    if (savedToDO) {
      setTodos(savedToDO);
    }

    if (completedToDO) {
      setCompletedToDo(completedToDO);
    }

    //useffect use to getitem and check wether string is not empty
  }, []);

  // for delete functionality
  const handleDelete = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index);

    localStorage.setItem("todolist", JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };

  //Adding complete tab
  const handleCheck = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();

    let completedOn = dd + "-" + mm + "-" + yyyy + " " + " at " + h + ":" + m + ":" + s;
    let filterdItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };
    let updatedCompletedArr = [...completedTodo];
    updatedCompletedArr.push(filterdItem);
    setCompletedToDo(updatedCompletedArr);
    handleDelete(index);
    localStorage.setItem("Completedtodolist", JSON.stringify(updatedCompletedArr));

  };

  //for delete completescreen todo
  const handleDeleteComplete = (index) =>{
    let reducedTodo = [...completedTodo];
    reducedTodo.splice(index);

    localStorage.setItem("Completedtodolist", JSON.stringify(reducedTodo));
    setCompletedToDo(reducedTodo);
    
  }

  return (
    <div className="App">
      <h1>My Todos</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label>Title</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTiltle(e.target.value)}
              placeholder="What's the task title?"
            />
            
          </div>
          <div className="todo-input-item">
            <label>Description</label>
            <input
              type="text"
              value={newDesc}
              onChange={(e) => setNewDec(e.target.value)}
              placeholder="What's the task Description?"
            />
          </div>
          <div className="todo-input-item">
            <button
              type="button"
              onClick={handlerAddTodo}
              className="primaryBtn"
            >
              Add
            </button>
          </div>
        </div>
        <div className="btn-area">
          <button
            className={`secondaryBtn ${isCompleteScreen === false && "active"}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Todo
          </button>
          <button
            className={`secondaryBtn ${isCompleteScreen === true && "active"}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed
          </button>
        </div>
        <div className="todo-list">
          {/* for todo screen only */}
          {isCompleteScreen === false &&
            allTodos.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                <div>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                </div>
                  <div className="icon11">
                    <FaBeer
                      title="Delete"
                      onClick={() => handleDelete(index)}
                      className="icon"
                    />
                    <FaBeer
                      title="Completed"
                      onClick={() => handleCheck(index)}
                      className="icon2"
                    />
                  </div>
                </div>
              );
            })}

          {/* for Completed screen only */}

          {isCompleteScreen === true &&
            completedTodo.map((item, index) => {
              return (
                <div className="todo-list-item" key={index}>
                  <div><h2>{item.title}</h2>
                  <p>{item.description}</p>
                  <p>
                    <small>Completed On: {item.completedOn}</small>
                  </p></div>
                  <div className="icon11">
                    <FaBeer
                      title="Delete"
                      onClick={() => handleDeleteComplete(index)}
                      className="icon"
                    />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
